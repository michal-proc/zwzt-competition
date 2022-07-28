import AOS from '../../node_modules/aos/dist/aos';
import './utils.js';

AOS.init({
    once: true
});

// NAVBAR
const togglers = document.querySelectorAll('.toggle-sidebar');

const sidebar = document.querySelector('.sidebar');

togglers.forEach(toggler => {
    toggler.addEventListener('click', () => {
        togglers.forEach(toggler => {
            toggler.classList.toggle('toggled');
        })
        sidebar.classList.toggle('swiped');
    })
})
// NAVBAR

// HERO 
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.interactive-hero');
    const colors = ["#03a66a", "#f2b022", "#f22233", "#ececec"]
    const animations = ["moving-star-slow", "moving-star-fast", "moving-star-medium"]
    const starAmount = 30

    if (hero) {
        for (let c = 0; c < starAmount; c++) {
            let randomStar = document.createElement('div')
            let size = Math.floor(Math.random() * 10 + 1)
            randomStar.style.width = size + "px"
            randomStar.style.height = size + "px"
            randomStar.style.borderRadius = size / 2 + "px"
            randomStar.style.position = "absolute"
            randomStar.style.top = Math.floor(Math.random() * 95) + "vh"
            randomStar.style.left = Math.floor(Math.random() * 95) + "vw"
            randomStar.style.backgroundColor = colors[Math.floor(Math.random() * 4)]
            randomStar.setAttribute('class', animations[Math.floor(Math.random() * 3)])
            hero.appendChild(randomStar)
        }
    }
})
// HERO

// SEARCHSYSTEM
const scope = document.querySelector('.search-scope');
const searchForm = document.querySelector('.search-form');
const navBar = document.querySelector('.nav')
let extendedNavbar = false

scope.addEventListener('click', () => {
    if (window.innerWidth < 600 || extendedNavbar) {
        navBar.classList.toggle('extended')
        extendedNavbar = !extendedNavbar
    }
    searchForm.classList.toggle('visible');
})
// SEARCHSYSTEM

// CONTACTFORM
const contactForm = document.querySelector(".contact-form-send")
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const author = document.querySelector('input[name="author"]')
        const message = document.querySelector('textarea[name="message"]')

        if (author.value == "") {
            displayMissingFieldBadge(author, "Przedstaw się nam!");
        }

        if (message.value == "") {
            displayMissingFieldBadge(message, "Nie zapomnij o wiadomości!");
        }

        if (message.value != "" && author.value != "") {
            const formData = new FormData(e.target)
            fetch("/contact", {
                method: "POST",
                body: formData
            }).then(res => {
                displayThankYouBox(author.value);
                e.target.reset();
            })
        }
    })
}

function displayMissingFieldBadge(fieldNode, message) {
    const wrapper = fieldNode.closest('.field-wrapper');
    const alert = document.createElement('div');
    alert.classList.add('field-info');
    alert.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    wrapper.appendChild(alert);

    setTimeout(() => {
        wrapper.removeChild(alert);
    }, 4000)
}

function displayThankYouBox(author) {
    const thankYouBox = document.createElement('div');
    const body = document.getElementsByTagName('body')[0];
    thankYouBox.classList.add('thank-you-box');
    thankYouBox.innerHTML = `
        <h4>🎉 Dziękujemy za kontakt ${author}!</h4>
        <p>Postaramy się odpowiedzieć najszybciej jak to mozliwe!</p>
    `;
    body.appendChild(thankYouBox);
    setTimeout(() => {
        body.removeChild(thankYouBox);
    }, 5000)
}
// CONTACTFORM

// SKACZĄCY MÓZG DLA TOMKA
const brain = document.querySelector('.red-brain');
let animating = false;

if (brain) {
    brain.addEventListener('click', () => {

        if (!animating) {
            brain.classList.add('brain-bounce');
            animating = true;

            setTimeout(() => {
                brain.classList.remove('brain-bounce');
                animating = false;
            }, 500)
        } else {
            brain.classList.remove('brain-bounce');
            animating = false;
        }

    })
}
// KONIEC MÓZGU TOMKA XD

// COOKIESY

const cookiesNode = document.querySelector('.cookies');
const cookiesToggler = document.querySelector('.close-cookies')

if (cookiesToggler) {
    cookiesToggler.addEventListener('click', () => {
        cookiesNode.style.display = 'none';
        setCookie('cookies-accepted', 1, 3);
    })
}

const areCookiesAccepted = getCookie('cookies-accepted');

if (!areCookiesAccepted) {
    cookiesNode.style.display = "block";
}

// COOKIESY
