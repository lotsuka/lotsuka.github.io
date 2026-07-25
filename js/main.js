// Detect motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scroll =
  window.requestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

const elementsToShow = document.querySelectorAll(".show-on-scroll");

function loop() {
  let visibleElements = 0;

  elementsToShow.forEach(function (element, index) {
    if (isElementInViewport(element)) {
      // Respect reduced motion preference
      if (prefersReducedMotion) {
        element.classList.add("is-visible");
      } else {
        setTimeout(function () {
          element.classList.add("is-visible");
        }, Math.min(index, 1) * 100 + 100);
      }
    }
  });
  scroll(loop);
}

// Only run animation loop if motion is not reduced
if (!prefersReducedMotion) {
  loop();
} else {
  // Immediately show all content if motion is reduced
  elementsToShow.forEach(function (element) {
    element.classList.add("is-visible");
  });
}

function isElementInViewport(el) {
  // special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0 && rect.bottom >= 0) ||
    (rect.bottom >=
      (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight)) ||
    (rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight))
  );
}

// Making entire projects div clickable and keyboard accessible

let ios = document.querySelector(".ios");
let designsystem = document.querySelector(".designsystem");
let centauro = document.querySelector(".centauro");
let retrolley = document.querySelector(".retrolley");

// Helper function to handle project navigation
function handleProjectClick(e, url, isExternal) {
  if (e.target.tagName !== "A") {
    if (isExternal) {
      window.open(url, "_blank");
    } else {
      window.location = url;
    }
  }
}

// Helper function to handle keyboard navigation
function handleProjectKeydown(e, url, isExternal) {
  if (e.key === "Enter" || e.key === " ") {
    if (e.target.classList.contains("project")) {
      e.preventDefault();
      if (isExternal) {
        window.open(url, "_blank");
      } else {
        window.location = url;
      }
    }
  }
}

if (ios) {
  ios.addEventListener("click", (e) => {
    handleProjectClick(e, "./work/quintoandar-ios/index.html", false);
  });
  ios.addEventListener("keydown", (e) => {
    handleProjectKeydown(e, "./work/quintoandar-ios/index.html", false);
  });
}

if (designsystem) {
  designsystem.addEventListener("click", (e) => {
    handleProjectClick(e, "https://rural-car-067.notion.site/Building-inclusive-Design-Systems-cde58bbadf1c40e3aae09d1c0420bda7", true);
  });
  designsystem.addEventListener("keydown", (e) => {
    handleProjectKeydown(e, "https://rural-car-067.notion.site/Building-inclusive-Design-Systems-cde58bbadf1c40e3aae09d1c0420bda7", true);
  });
}

if (centauro) {
  centauro.addEventListener("click", (e) => {
    handleProjectClick(e, "https://rural-car-067.notion.site/Centauro-mobile-site-d432dc878ed3437993fadbeadd4cc040", true);
  });
  centauro.addEventListener("keydown", (e) => {
    handleProjectKeydown(e, "https://rural-car-067.notion.site/Centauro-mobile-site-d432dc878ed3437993fadbeadd4cc040", true);
  });
}

if (retrolley) {
  retrolley.addEventListener("click", (e) => {
    handleProjectClick(e, "https://issuu.com/lucasmarquesotsuka/docs/airbus_retrolley_lucas_otsuka_engli", true);
  });
  retrolley.addEventListener("keydown", (e) => {
    handleProjectKeydown(e, "https://issuu.com/lucasmarquesotsuka/docs/airbus_retrolley_lucas_otsuka_engli", true);
  });
}

// const callback = function(entries) {
//   entries.forEach(entry => {
//     entry.target.classList.toggle("is-visible");
//   });
// };

// const observer = new IntersectionObserver(callback);

// const targets = document.querySelectorAll(".show-on-scroll");
// targets.forEach(function(target) {
//   observer.observe(target);
// });

// project.forEach(element => {
//   element.addEventListener("mouveover", () => {
//        console.log("maoi ")
//   })})

/* let project = document.querySelectorAll(".ios")

project.forEach(element => {
   element.addEventListener("mouveover", () => {
        window.location = "/ios"




        let seta = document.createElement("div")
        seta.style.background = "rgba(255,0,0,0.3)"
        seta.style.width = "200px"
        seta.style.height = "200px"
        seta.style.position = "absolute"

        seta.innerHTML = '<div class="hover">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M25.7071 0.95955C25.3166 0.569025 24.6834 0.569025 24.2929 0.95955C23.9024 1.35007 23.9024 1.98324 24.2929 2.37376L45.9191 24H1.66675C1.11446 24 0.666748 24.4477 0.666748 25C0.666748 25.5523 1.11446 26 1.66675 26H45.9191L24.2929 47.6262C23.9024 48.0167 23.9024 48.6499 24.2929 49.0404C24.6834 49.431 25.3166 49.431 25.7071 49.0404L49.0325 25.715C49.0596 25.6886 49.0851 25.6605 49.1091 25.6312C49.1577 25.5715 49.1984 25.5076 49.2312 25.4408C49.2966 25.3078 49.3334 25.1582 49.3334 25C49.3334 24.8321 49.292 24.6739 49.2189 24.5349C49.1849 24.4702 49.1432 24.4083 49.094 24.3507C49.0747 24.3281 49.0544 24.3064 49.0331 24.2856L25.7071 0.95955Z" fill="#5C798F"/>
          </svg>                
      </div>'


        element.append(seta)
        console.log("asda") 
    }) 

}) */


// Screen reader announcements
function announceToScreenReader(message) {
  const announcer = document.getElementById('sr-announcements');
  if (announcer) {
    announcer.textContent = message;
    // Clear after announcement
    setTimeout(() => {
      announcer.textContent = '';
    }, 1000);
  }
}

// Announce when projects become visible
const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('announced')) {
      const projectTitle = entry.target.querySelector('h2');
      if (projectTitle) {
        announceToScreenReader(`${projectTitle.textContent} project is now visible`);
        entry.target.classList.add('announced');
      }
    }
  });
}, { threshold: 0.5 });

// Observe all project cards
document.querySelectorAll('.project').forEach(project => {
  projectObserver.observe(project);
});
