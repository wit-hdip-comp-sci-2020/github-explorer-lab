const user = 'YOUR-GITHUB-ID';
const token = 'YOUR-PERSONAL-ACCESS-TOKEN';
const creds = `${user}:${token}`;
const auth = btoa(creds);

const options = {
  mode: 'cors',
  headers: {
    'Authorization': 'Basic ' + auth,
  }
}

async function fetchLanguages(languagesUrl) {
  let languageText = "";
  const response = await fetch(languagesUrl, options);
  if (response.status == 200) {
    const languages = await response.json();
    languageText = Object.getOwnPropertyNames(languages)
  }
  return languageText;
}

async function fetchRepoList(githubId, nmrRepos) {
  let repos = [];
  const response = await fetch(`https://api.github.com/users/${githubId}/repos?page=1&per_page=${nmrRepos}`, options);
  if (response.status == 200) {
    repos = await response.json();
  }
  return repos;
}

function renderCell(row, col, value) {
  const cell = row.insertCell(col);
  cell.innerHTML = value;
}

async function renderRepo(repo, tableID) {
  const table = document.getElementById(tableID);
  const row = table.insertRow(-1);
  renderCell(row, 0, `<a href=${repo.html_url}> ${repo.name} </a>`);
  renderCell(row,1, repo.description)
  renderCell(row,2, repo.size)
  const languages = await fetchLanguages(repo.languages_url);
  renderCell(row,3, languages)
}

function renderAllRepos(repos, tableID) {
  for (let i = 0; i < repos.length; i++) {
    renderRepo(repos[i], tableID);
  }
}

function clearRepoTable(tableID) {
  let table = document.getElementById(tableID);
  var rowCount = table.rows.length;
  for (var i = 1; i < rowCount; i++) {
    table.deleteRow(-1);
  }
}

async function fetchRepos() {
  clearRepoTable("repo-table");
  let result = document.getElementById("result-msg");
  const githubId = document.getElementById("github-id").value;
  const repos = await fetchRepoList(githubId, 20)
  if (repos.length > 0) {
    renderAllRepos(repos, "repo-table");
    result.textContent = `${repos.length} Repos`;
  } else {
    result.textContent = "Error";
  }
}

