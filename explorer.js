const user = 'edeleastar';
const token = 'a550e1a5953f810f5494dc9b79d3e8d20781b048';
const creds = `${user}:${token}`;
const auth = btoa(creds);

const options = {
  mode: 'cors',
  headers: {
    'Authorization': 'Basic ' + auth,
  }
}

async function renderRepo(repo) {
  const table = document.getElementById("repo-table");
  const row = table.insertRow(-1);
  const nameCell = row.insertCell(0);
  nameCell.innerHTML = `<a href=${repo.html_url}> ${repo.name} </a>`;
  const descriptionCell = row.insertCell(1);
  descriptionCell.innerText = repo.description;
  const sizeCell = row.insertCell(2);
  sizeCell.innerText = repo.size;
  const response = await fetch(repo.languages_url, options);
  if (response.status != 404) {
    const languages = await response.json();
    const languagesCell = row.insertCell(3);
    languagesCell.innerText = Object.getOwnPropertyNames(languages);
  }
}

function renderAllRepos(repos) {
  for (let i = 0; i < repos.length; i++) {
    renderRepo(repos[i]);
  }
}

async function fetchRepos() {
  clearRepoTable();
  let result = document.getElementById("result-msg");
  const githubId = document.getElementById("github-id").value;
  const response = await fetch("https://api.github.com/users/" + githubId + "/repos?page=1&per_page=100", options);
  if (response.status == 200) {
    const repos = await response.json();
    renderAllRepos(repos);
    result.textContent = `${repos.length} Repos`;
  } else {
    result.textContent = "Error";
  }
}

function clearRepoTable() {
  let table = document.getElementById("repo-table");
  var rowCount = table.rows.length;
  for (var i = 1; i < rowCount; i++) {
    table.deleteRow(-1);
  }
}

