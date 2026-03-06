document.addEventListener("DOMContentLoaded", function () {
  /* Particles Background */

  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: { value: 80 },
        color: { value: "#22c55e" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: { enable: true, speed: 2 },
      },
    });
  }

  /* GitHub Repository Loader */

  console.log("Script loaded");

  fetch("https://api.github.com/users/Shiva202-27/repos")
    .then((res) => res.json())
    .then((data) => {
      ```
  const repoList = document.getElementById("repo-list");

  data
    .sort((a,b)=>b.stargazers_count-a.stargazers_count)
    .slice(0,6)
    .forEach(repo => {

      const div = document.createElement("div");

      div.innerHTML =
        "<h3>" + repo.name + "</h3>" +
        "<p>" + (repo.description || "DevOps Project Repository") + "</p>" +
        "<p>⭐ " + repo.stargazers_count +
        " | 🍴 " + repo.forks_count +
        " | 🧠 " + (repo.language || "Code") + "</p>" +
        "<a href='" + repo.html_url + "' target='_blank'>View Repo</a>";

      repoList.appendChild(div);

    });

})
.catch(error => console.log(error));
```;
    });
});
