// ========================================
// Tribute Page JavaScript
// Developed by Nkosinathi Msimango
// ========================================

// ==============================
// Theme Toggle
// ==============================

const themeToggle = document.getElementById("theme-toggle");

function loadTheme() {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");
        themeToggle.textContent = "☀️";

    }

}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️";

    } else {

        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";

    }

});

// ==============================
// Scroll Reveal Animation
// ==============================

const sections = document.querySelectorAll("section");

function revealSections() {

    const trigger = window.innerHeight * 0.85;

    sections.forEach(section => {

        const top = section.getBoundingClientRect().top;

        if (top < trigger) {

            section.classList.add("show");

        }

    });

}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

// ==============================
// Active Navigation Link
// ==============================

const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

// ==============================
// Scroll To Top Button
// ==============================

const topButton = document.createElement("button");

topButton.innerHTML = "⬆";

topButton.id = "topBtn";

document.body.appendChild(topButton);

topButton.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});

// ==============================
// Hero Fade Effect
// ==============================

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    const value = window.scrollY;

    hero.style.opacity = 1 - value / 900;

});

// ==============================
// Initialization
// ==============================

loadTheme();