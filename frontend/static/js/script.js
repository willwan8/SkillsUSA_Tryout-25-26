/* UI/UX */

// sending an alert after the user submits the interest form
const submitButtonClicked = () => {
    // grabbing values
    const name = document.getElementById('name').value.trim(); // trim removes empty spaces, so empty responses are counted as empty or null
    const email = document.getElementById('email').value.trim();
    const grade = document.querySelector(".submission-form__dropdown") ? document.querySelector(".submission-form__dropdown").value : '';
    const interest = document.getElementById('why').value.trim();

    // if any value is empty then don't do non
    if (!name || !email || !grade || !interest) {
      return;
    }
    
    alert(`Thanks for filling out the form! You entered:\nName: ${name}\nEmail: ${email}\nGrade: ${grade}\nWhy you're interested: ${interest}`);
}

// hamburger for smaller mobile screens
const hamMenu = document.querySelector('.navbar--toggled');
const offScreenMenu = document.querySelector('.navbar__offscreen-menu')

hamMenu.addEventListener('click', () => {
  hamMenu.classList.toggle('active');
  offScreenMenu.classList.toggle('active');
})

const closeHamburger = () => {
  if (hamMenu && offScreenMenu) {
    hamMenu.classList.remove('active');
    offScreenMenu.classList.remove('active');
  }
}

// achievements carousel stuff
let slideIndex = 1;

// next/previous controls
function plusSlides(n) {
  slideIndex += n;
  showSlides(slideIndex);
}

// thumbnail image controls
function currentSlide(n) {
  slideIndex = n;
  showSlides(slideIndex);
}

const showSlides = (n) => {
  let i;
  let slides = document.getElementsByClassName("gallery__slide");
  let dots = document.getElementsByClassName("gallery__dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// function for when we want an anchor to go to a specific spot on page
const routeToElement = () => {
  if (window.location.hash) {
    const element = document.querySelector(window.location.hash); // grab the hash in the link for the element
    if (element) {
      element.scrollIntoView({behavior: "smooth", block: "center"}); // smoothly scroll to the desired element and to the center of screen
    }
  } else { // in the case that this is just a regular route, we'll automatically go to the hero section
    document.querySelector(".hero").scrollIntoView({behavior: "smooth", block: "center"});
  }
}

/* ROUTING ( most of raw routing code is from last year, with minor additions :D ) */
//function to handle default link behavior and changes in location
const route = (event) => {
  event = event || window.event;  //captures the click event for the link
  event.preventDefault(); //prevents the anchor tag from performing its default behavior (navigating to href)
  window.history.pushState({}, "", event.target.closest("a").href); //updates url on browser using browser history API
  handleLocation();
}

//contains possible paths as keys and html files that need to be displayed according to the paths
const routes = {
  404: "/static/pages/404.html",
  "/": "/static/pages/home.html",
  "/about": "/static/pages/about.html",
  "/events": "/static/pages/events.html",
  "/achievements": "/static/pages/achievements.html",
  "/contact-us": "/static/pages/contact.html",
  "/join": "/static/pages/join.html",
};

//function to handle changing the location => called everytime a navigation is made
const handleLocation = async () => {
  const path = window.location.pathname; //grabs pathname from current location
  const route = routes[path] || routes[404]; //uses pathname to get desired route or defaults to 404 if not found
  const html = await fetch(route).then((data => data.text())); //fetchs html from route and transforms it into text
  document.getElementById("current-page").innerHTML = html; //sets inner html in page container

  // for footer links primarily, in particular to link to a specific element on a page
  routeToElement();
  
  // for hamburger menu
  closeHamburger();

  // for achievements page
  if (window.location.pathname == "/achievements") {
  showSlides(slideIndex);
  }
}

window.onpopstate = handleLocation; //handles when users click forward and back buttons on browser
window.route = route; //global access to route function

handleLocation(); //handles correct page on page load for first time