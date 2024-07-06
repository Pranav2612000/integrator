from litellm import completion
import os
from dotenv import load_dotenv
from test_data import software_documentation, directory_structure, file_content

load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")
anthropic_api_key = os.getenv("ANTHROPIC_API_KEY")


instruction_to_extract_file = """
you are an AI developer assistant, you have been given the resposibility to extract the exact file name which needs to be edited in order to integrate a software into client's code respoitory by an AI developer.

here is more information about the software in question:
{software_documentation}

and here is the directory structure of the client's repository:
{directory_structure}

return a single name of the file in an array which needs to be edited in order to make the integration possible

good answer will be like:
["src/index.html"], ["src/js/main.js"], ["src/js/vendor/reb2b.js"]
bad answers will be like:
"sure, here is your files: src/index.html, src/js/main.js, src/js/vendor/reb2b.js" 
"""

instructions_to_integrate_software = """
you are an AI developer who ships correct code every time. you are being asked to integrate a library or SDK into a code file.

you will be given a brief software documentation below and then you will be given the code file. you need to return ONLY the new code file with changes. nothing else should be there in output as your output will be directly used to push a commit to the original code file.

The software documentation is as follows:
{software_documentation}

Here is the file content:
{file_content}

Please return ONLY the new code file with changes. nothing else should be there in output as your output will be directly used to push a commit to the original code file.
"""

def openai(user_prompt):
    response = completion(api_key=openai_api_key, model="gpt-4", temperature=0,messages=[{"role": "user", "content": user_prompt}])
    return response['choices'][0]['message']['content']

def anthropic(user_prompt):    
    response = completion(api_key=anthropic_api_key, model="claude-3-5-sonnet-20240620", temperature=0, messages=[{"role": "user", "content": user_prompt}])
    return response['choices'][0]['message']['content']

def get_file_names(directory_structure):
    file_names = openai(instruction_to_extract_file.format(software_documentation=software_documentation, directory_structure=directory_structure))
    return file_names

def get_code_changes(file_content, instructions_to_integrate_software, model="anthropic"):
    if model == "openai":
        modified_content = openai(instructions_to_integrate_software.format(software_documentation=software_documentation, file_content=file_content))
    elif model == "anthropic":
        modified_content = anthropic(instructions_to_integrate_software.format(software_documentation=software_documentation, file_content=file_content))
    return modified_content

def test():
    file_names = get_file_names(directory_structure)
    print(file_names)

    code_changes = get_code_changes(file_content, instructions_to_integrate_software, model="anthropic")
    print(code_changes, "\n\n\n\n\n")
    code_changes = code_changes.split('```')[1] if '```' in code_changes else code_changes
    print(code_changes)
    
test()