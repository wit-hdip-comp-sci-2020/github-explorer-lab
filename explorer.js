function renderRepo(repo) {
  const table = document.getElementById("repo-table");
  const row = table.insertRow(-1);
  const nameCell = row.insertCell(0);
  nameCell.innerText = repo.name;
}

function renderAllRepos(repos) {
  for (let i = 0; i < repos.length; i++) {
    renderRepo(repos[i]);
  }
}

async function fetchRepos() {
  const githubId = document.getElementById("github-id").value;
  const response = await fetch("https://api.github.com/users/" + githubId + "/repos");
  if (response.status != 404) {
    const repos = await response.json();
    renderAllRepos(repos);
    console.log(repos);
  }
}
