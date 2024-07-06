// Git Data API use case example
// See: https://developer.github.com/v3/git/ to learn more

const { getRepositoryTree, getDefaultBranch, getFileContents, createNewBranch, upsertFile, createPR } = require('./src/octokit');

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  // Opens a PR every time someone installs your app for the first time
  app.on("installation.created", async (context) => {
    // shows all repos you've installed the app on
    context.log.info(context.payload.repositories);

    const owner = context.payload.installation.account.login;

    for (const repository of context.payload.repositories) {
      try {
        const repo = repository.name;

        const defaultBranch = await getDefaultBranch(context.octokit, owner, repo);
        const filesData = await getRepositoryTree(context.octokit, owner, repo, defaultBranch);
        const fileNames = filesData.map(f => f.path);

        const filePathToBeUpdated = 'index.html'; // to be replaced by llm func
        const fileToBeUpdated = filesData.find(f => f.path === filePathToBeUpdated);
        const fileContents = await getFileContents(context.octokit, owner, repo, fileToBeUpdated.path, defaultBranch);

        const updatedFileContents = "<UPDATED_CONTENT>"; // to be replaced by llm func

        const newBranch = 'feat/integrate-sdk';
        await createNewBranch(context.octokit, owner, repo, newBranch, defaultBranch);
        await upsertFile(context.octokit, owner, repo, newBranch, fileToBeUpdated.path, updatedFileContents, fileToBeUpdated.sha);
        await createPR(context.octokit, owner, repo, newBranch, defaultBranch);
      } catch (err) {
        console.log('FAILED TO CREATE PR for REPOSITORY', repository);
        console.log(err);
      }
    }
  });
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
