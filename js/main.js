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
      setTimeout(function () {
        element.classList.add("is-visible");
      }, Math.min(index, 1) * 100 + 100);
    }
  });
  scroll(loop);
}

loop();

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

// Making entire projects div clickable

let ios = document.querySelector(".ios");
let centauro = document.querySelector(".centauro");
let retrolley = document.querySelector(".retrolley");

if (ios) {
  ios.addEventListener("click", (e) => {
    if (e.target.tagName !== "A") {
      window.location = "./work/quintoandar-ios/index.html";
    }
  });
}

if (centauro) {
  centauro.addEventListener("click", (e) => {
    if (e.target.tagName !== "A") {
      window.open(
        "https://rural-car-067.notion.site/Centauro-mobile-site-d432dc878ed3437993fadbeadd4cc040",
        "_blank"
      );
    }
  });
}

if (retrolley) {
  retrolley.addEventListener("click", (e) => {
    if (e.target.tagName !== "A") {
      window.open(
        "https://issuu.com/lucasmarquesotsuka/docs/airbus_retrolley_lucas_otsuka_engli",
        "_blank"
      );
    }
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
