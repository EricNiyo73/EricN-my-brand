function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "navs") {
    x.className += " responsive";
  } else {
    x.className = "navs";
  }
}
