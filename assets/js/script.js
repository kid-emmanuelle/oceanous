// Reveal elements on scroll
window.addEventListener("scroll", reveal);

function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var revealTop = reveals[i].getBoundingClientRect().top;
        var revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

// Parallax effect for hero section title
let titleOne = document.getElementById("title-one");
let titleTwo = document.getElementById("title-two");

window.addEventListener("scroll", function () {
    let value = window.scrollY;
    titleOne.style.right = value * 0.5 + "px";
    titleTwo.style.left = value * 0.5 + "px";
});

// Responsive nav for mobile screens
function toggleMenu() {
    var x = document.getElementById("nav-links-sub");
    if (x.style.left !== "0px") {
        x.style.left = "0px";
        document.body.style.overflowY = "hidden";
    } else {
        x.style.left = "-200px";
        document.body.style.overflowY = "visible";
    }
}