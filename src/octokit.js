const getRepositoryTree = async (octokit, owner, repo, branch, recursive) => {
    if (recursive === undefined) {
        recursive = true;
    }

    const res = await octokit.git.getTree({
        owner: owner,
        repo: repo,
        tree_sha: branch,
        recursive: true
    });

    const files = res.data.tree;
    const fileNames = files.map(f => f.path);

    return fileNames;
}

const getRepository = async (octokit, owner, repo) => {
    const res = await octokit.repos.get({
        owner: owner,
        repo: repo
    });

    return res.data;
};

const getDefaultBranch = async (octokit, owner, repo) => {
    const repository = await getRepository(octokit, owner, repo);

    return repository.default_branch;
};

module.exports = {
    getRepositoryTree,
    getDefaultBranch
}