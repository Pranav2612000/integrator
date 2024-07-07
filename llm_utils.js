const { completion } = require('litellm');
const os = require('os');
const dotenv = require('dotenv');
const fs = require('fs');

const testData = JSON.parse(fs.readFileSync('./test_data.json', 'utf8'));

dotenv.config();

const { software_documentation, directory_structure, file_content } = testData;

const openai_api_key = process.env.OPENAI_API_KEY;
const anthropic_api_key = process.env.ANTHROPIC_API_KEY;

const instruction_to_extract_file = `
you are an AI developer assistant, you have been given the resposibility to extract the exact file name which needs to be edited in order to integrate a software into client's code respoitory by an AI developer.

here is more information about the software in question:
${software_documentation}

and here is the directory structure of the client's repository:
${directory_structure}

return a single name of the file in an array which needs to be edited in order to make the integration possible

good answer will be like:
["src/index.html"], ["src/js/main.js"], ["src/js/vendor/reb2b.js"]
bad answers will be like:
"sure, here is your files: src/index.html, src/js/main.js, src/js/vendor/reb2b.js" 
`;

const instructions_to_integrate_software = `
you are an AI developer who ships correct code every time. you are being asked to integrate a library or SDK into a code file.

you will be given a brief software documentation below and then you will be given the code file. you need to return ONLY the new code file with changes. nothing else should be there in output as your output will be directly used to push a commit to the original code file.

The software documentation is as follows:
${software_documentation}

Here is the file content:
${file_content}

Please return ONLY the new code file with changes. nothing else should be there in output as your output will be directly used to push a commit to the original code file.
`;

async function openai(user_prompt) {
    const response = await completion({
        model: "gpt-4",
        temperature: 0,
        messages: [{ role: "user", content: user_prompt }]
    });
    
    return response.choices[0].message.content;
}

// This function is not working because the completion endpoint is not supporting any of the Anthropic models
async function anthropic(user_prompt) {
    const response = await completion({
        model: "claude-3-haiku-20240307",
        temperature: 0,
        messages: [{ role: "user", content: user_prompt }]
    });
    return response.choices[0].message.content;
}

async function get_file_names(directory_structure) {
    const file_names = await openai(instruction_to_extract_file.replace("{software_documentation}", software_documentation).replace("{directory_structure}", directory_structure));
    
    return JSON.parse(file_names);
}

async function get_code_changes(file_content, model = "openai") {
    let modified_content;
    
    console.log('file_content:', file_content);
    console.log('instructions_to_integrate_software:', instructions_to_integrate_software);
    console.log('model:', model);

    if (model === "openai") {
        modified_content = await openai(instructions_to_integrate_software.replace("{software_documentation}", software_documentation).replace("{file_content}", file_content));
    } else if (model === "anthropic") {
        modified_content = await anthropic(instructions_to_integrate_software.replace("{software_documentation}", software_documentation).replace("{file_content}", file_content));
    }
    return modified_content;
}

async function test() {
    const file_names = await get_file_names(directory_structure);
    console.log(file_names);

    let code_changes = await get_code_changes(file_content, instructions_to_integrate_software, "openai");
    console.log(code_changes, "\n\n\n\n\n");
    code_changes = code_changes.includes('```') ? code_changes.split('```')[1] : code_changes;
    console.log(code_changes);
}

// test();

module.exports = {
    openai,
    anthropic,
    instruction_to_extract_file,
    instructions_to_integrate_software,
    get_code_changes,
    get_file_names
};