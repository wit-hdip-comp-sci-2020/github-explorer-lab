async function fetchRepos() {
  const githubId = document.getElementById("github-id").value;
  const response = await fetch("https://api.github.com/users/" + githubId + "/repos");
  if (response.status != 404) {
    const repos = await response.json();
    console.log(repos);
  }
}
