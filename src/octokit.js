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

module.exports = {
    getRepositoryTree
}