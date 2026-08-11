"use strict";


/* =========================
   PAGE LOADER
========================= */

document.body.classList.add("loading");

const loader = document.getElementById("loader");
const loaderText = document.getElementById("loader-text");

const loaderMessages = [
  "Loading infrastructure...",
  "Connecting to Kubernetes...",
  "Initializing CI/CD...",
  "Starting NimbusOps...",
  "Environment ready."
];

let loaderIndex = 0;

function showLoaderMessage() {

  if (!loaderText) return;

  loaderText.textContent =
    loaderMessages[loaderIndex];

  loaderIndex++;

  if (loaderIndex < loaderMessages.length) {

    setTimeout(
      showLoaderMessage,
      420
    );

  }

}

showLoaderMessage();


window.addEventListener("load", () => {

  setTimeout(() => {

    loader.classList.add("hide");

    document.body.classList.remove("loading");

  }, 2300);

});


/* =========================
   PARTICLES
========================= */

if (typeof particlesJS !== "undefined") {

  particlesJS("particles-js", {

    particles: {

      number: {
        value: 55,
        density: {
          enable: true,
          value_area: 900
        }
      },

      color: {
        value: [
          "#22c55e",
          "#38bdf8",
          "#a78bfa"
        ]
      },

      shape: {
        type: "circle"
      },

      opacity: {
        value: 0.35,
        random: true
      },

      size: {
        value: 2,
        random: true
      },

      line_linked: {
        enable: true,
        distance: 140,
        color: "#22c55e",
        opacity: 0.08,
        width: 1
      },

      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out"
      }

    },

    interactivity: {

      detect_on: "canvas",

      events: {

        onhover: {
          enable: true,
          mode: "grab"
        },

        onclick: {
          enable: true,
          mode: "push"
        },

        resize: true

      },

      modes: {

        grab: {
          distance: 150,
          line_linked: {
            opacity: 0.2
          }
        },

        push: {
          particles_nb: 3
        }

      }

    },

    retina_detect: true

  });

}


/* =========================
   NAVBAR
========================= */

const navbar =
  document.querySelector(".navbar");

const nav =
  document.getElementById("nav-menu");

const menuToggle =
  document.getElementById("menu-toggle");


menuToggle?.addEventListener(
  "click",
  () => {

    nav.classList.toggle("open");

    const icon =
      menuToggle.querySelector("i");

    if (nav.classList.contains("open")) {

      icon.className =
        "fas fa-xmark";

    } else {

      icon.className =
        "fas fa-bars";

    }

  }
);


document
  .querySelectorAll("nav a")
  .forEach((link) => {

    link.addEventListener(
      "click",
      () => {

        nav.classList.remove("open");

        const icon =
          menuToggle.querySelector("i");

        icon.className =
          "fas fa-bars";

      }
    );

  });


/* =========================
   NAVBAR SCROLL
========================= */

window.addEventListener(
  "scroll",
  () => {

    if (window.scrollY > 40) {

      navbar.classList.add("scrolled");

    } else {

      navbar.classList.remove("scrolled");

    }

  }
);


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections =
  document.querySelectorAll(
    "section[id]"
  );

const navLinks =
  document.querySelectorAll(
    "nav a"
  );


const observer =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          navLinks.forEach((link) => {

            link.classList.remove("active");

            if (
              link.getAttribute("href") ===
              `#${entry.target.id}`
            ) {

              link.classList.add("active");

            }

          });

        }

      });

    },
    {
      threshold: 0.35
    }
  );


sections.forEach(
  (section) => observer.observe(section)
);


/* =========================
   TERMINAL TYPING
========================= */

const commands = [

  "docker build -t nimbusops-backend .",

  "kubectl get pods -A",

  "terraform plan",

  "docker push nimbusops-backend:latest",

  "kubectl apply -f deployment.yaml",

  "kubectl get deployments -A",

  "prometheus --query metrics",

  "grafana --monitor cluster"

];


const typingElement =
  document.getElementById("typing");

let commandIndex = 0;

let characterIndex = 0;

let deleting = false;


function terminalTyping() {

  if (!typingElement) return;

  const command =
    commands[commandIndex];


  if (!deleting) {

    typingElement.textContent =
      command.substring(
        0,
        characterIndex + 1
      );

    characterIndex++;

    if (
      characterIndex ===
      command.length
    ) {

      deleting = true;

      setTimeout(
        terminalTyping,
        1800
      );

      return;

    }

  } else {

    typingElement.textContent =
      command.substring(
        0,
        characterIndex - 1
      );

    characterIndex--;

    if (characterIndex === 0) {

      deleting = false;

      commandIndex =
        (commandIndex + 1) %
        commands.length;

    }

  }

  setTimeout(
    terminalTyping,
    deleting ? 35 : 55
  );

}


setTimeout(
  terminalTyping,
  2600
);


/* =========================
   SCROLL REVEAL
========================= */

if (typeof ScrollReveal !== "undefined") {

  const reveal =
    ScrollReveal({

      distance: "45px",

      duration: 900,

      easing:
        "cubic-bezier(0.5, 0, 0, 1)",

      reset: false,

      mobile: true

    });


  reveal.reveal(
    ".reveal",
    {
      origin: "bottom",
      interval: 100
    }
  );


  reveal.reveal(
    ".reveal-left",
    {
      origin: "left",
      interval: 100
    }
  );


  reveal.reveal(
    ".reveal-right",
    {
      origin: "right",
      interval: 100
    }
  );

}


/* =========================
   GITHUB REPOSITORIES
========================= */

const repoList =
  document.getElementById(
    "repo-list"
  );


async function loadRepositories() {

  if (!repoList) return;


  try {

    const response =
      await fetch(
        "https://api.github.com/users/Shiva202-27/repos"
      );


    if (!response.ok) {

      throw new Error(
        "GitHub API request failed"
      );

    }


    const repositories =
      await response.json();


    const sorted =
      repositories
        .sort(
          (a, b) =>
            b.stargazers_count -
            a.stargazers_count
        )
        .slice(0, 6);


    repoList.innerHTML = "";


    if (!sorted.length) {

      repoList.innerHTML = `
        <div class="repo-loading">
          No repositories found.
        </div>
      `;

      return;

    }


    sorted.forEach(
      (repo, index) => {

        const card =
          document.createElement(
            "article"
          );


        card.className =
          "repo-card reveal";


        card.style.animationDelay =
          `${index * 100}ms`;


        card.innerHTML = `

          <div class="repo-icon">

            <i class="fab fa-github"></i>

          </div>


          <h3>
            ${escapeHtml(repo.name)}
          </h3>


          <p>

            ${escapeHtml(
              repo.description ||
              "DevOps project repository"
            )}

          </p>


          <div class="repo-meta">

            <span>
              ⭐ ${repo.stargazers_count}
            </span>

            <span>
              🍴 ${repo.forks_count}
            </span>

            <span>
              ${escapeHtml(
                repo.language ||
                "Code"
              )}
            </span>

          </div>


          <a
            href="${repo.html_url}"
            target="_blank"
            rel="noopener"
            class="repo-link"
          >

            View Repository

            <i class="fas fa-arrow-right"></i>

          </a>

        `;


        repoList.appendChild(card);

      }
    );


  } catch (error) {

    console.error(
      "GitHub repositories error:",
      error
    );


    repoList.innerHTML = `

      <div class="repo-loading">

        <i class="fas fa-triangle-exclamation"></i>

        Unable to load GitHub repositories.

        <br />

        <a
          href="https://github.com/Shiva202-27"
          target="_blank"
          rel="noopener"
          class="repo-link"
        >
          Open GitHub Profile
        </a>

      </div>

    `;

  }

}


function escapeHtml(value) {

  const div =
    document.createElement(
      "div"
    );

  div.textContent =
    value;

  return div.innerHTML;

}


loadRepositories();


/* =========================
   BACK TO TOP
========================= */

const backToTop =
  document.getElementById(
    "back-to-top"
  );


window.addEventListener(
  "scroll",
  () => {

    if (window.scrollY > 500) {

      backToTop.classList.add(
        "show"
      );

    } else {

      backToTop.classList.remove(
        "show"
      );

    }

  }
);


backToTop?.addEventListener(
  "click",
  () => {

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  }
);


/* =========================
   3D TILT EFFECT
========================= */

document
  .querySelectorAll(
    ".skill-card, .project-card"
  )
  .forEach((card) => {

    card.addEventListener(
      "mousemove",
      (event) => {

        if (window.innerWidth < 768) {
          return;
        }


        const rect =
          card.getBoundingClientRect();


        const x =
          event.clientX -
          rect.left;


        const y =
          event.clientY -
          rect.top;


        const centerX =
          rect.width / 2;


        const centerY =
          rect.height / 2;


        const rotateX =
          ((y - centerY) /
            centerY) *
          -3;


        const rotateY =
          ((x - centerX) /
            centerX) *
          3;


        card.style.transform =
          `perspective(800px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-5px)`;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform =
          "";

      }
    );

  });


/* =========================
   KEYBOARD ACCESSIBILITY
========================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {

      nav?.classList.remove(
        "open"
      );

      const icon =
        menuToggle?.querySelector(
          "i"
        );

      if (icon) {

        icon.className =
          "fas fa-bars";

      }

    }

  }
);
