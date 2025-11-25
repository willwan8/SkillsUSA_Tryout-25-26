/* ROUTING ( routing code is from last year :D ) */
//function to handle default link behavior and changes in location
const route = (event) => {
  event = event || window.event;  //captures the click event for the link
  event.preventDefault(); //prevents the anchor tag from performing its default behavior (navigating to href)
  window.history.pushState({}, "", event.target.href); //updates url on browser using browser history API
  handleLocation();
}

//contains possible paths as keys and html files that need to be displayed according to the paths
const routes = {
  404: "/pages/404.html",
  "/": "/pages/home.html",
  "/about": "/pages/about.html",
  "/contact-us": "/pages/contact.html",
};

//function to handle changing the location => called everytime a navigation is made
const handleLocation = async () => {
  const path = window.location.pathname; //grabs pathname from current location
  const route = routes[path] || routes[404]; //uses pathname to get desired route or defaults to 404 if not found
  const html = await fetch(route).then((data => data.text())); //fetchs html from route and transforms it into text
  document.getElementById("current-page").innerHTML = html; //sets inner html in page container
}

window.onpopstate = handleLocation; //handles when users click forward and back buttons on browser
window.route = route; //global access to route function

handleLocation(); //handles correct page on page load for first time