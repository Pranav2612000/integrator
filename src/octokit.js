const fromBase64 = (txt) => {
  const buffer = new Buffer(txt, 'base64');
  return buffer.toString('ascii');
}

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
  const filesData= files.map(f => ({ path: f.path, sha: f.sha }));

  return filesData;
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

const getFileContents = async (octokit, owner, repo, path, ref) => {
  const res = await octokit.repos.getContent({
    owner: owner,
    repo: repo,
    path: path,
    ref: ref
  });

  return fromBase64(res.data.content);
}

module.exports = {
  getRepositoryTree,
  getDefaultBranch,
  getFileContents
}