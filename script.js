/* =========================================
   OPEN INVITATION
========================================= */

const opening = document.getElementById("opening");
const mainContent = document.getElementById("mainContent");
const openBtn = document.getElementById("openBtn");
const music = document.getElementById("bgMusic");
const particleContainer = document.getElementById("particles");

openBtn.addEventListener("click", () => {

    // Play Music
    music.volume = 0.7;
    music.play().catch(() => {});

    // Show Main Content
    opening.classList.add("hide");

    setTimeout(() => {
        mainContent.classList.add("show");
    }, 350);

    // Falling Effect
    createParticles();

});


/* =========================================
   FALLING PARTICLES
========================================= */

const icons = [
    "🤍",
    "✨",
    "⭐",
    "♡"
];

function createParticles(){

    for(let i=0;i<60;i++){

        const item = document.createElement("span");

        item.className = "fall-item";

        item.innerHTML =
            icons[Math.floor(Math.random()*icons.length)];

        item.style.left = Math.random()*100+"vw";

        item.style.animationDuration =
            (Math.random()*3+3)+"s";

        item.style.fontSize =
            (Math.random()*18+16)+"px";

        item.style.opacity =
            Math.random();

        particleContainer.appendChild(item);

        setTimeout(()=>{
            item.remove();
        },6000);

    }

}


/* =========================================
   COUNTDOWN
========================================= */

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const targetDate = new Date(
    "February 27, 2027 17:00:00"
).getTime();

function updateCountdown(){

    const now = new Date().getTime();

    const distance = targetDate - now;

    if(distance < 0){

        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";

        return;

    }

    const d = Math.floor(
        distance / (1000*60*60*24)
    );

    const h = Math.floor(
        (distance % (1000*60*60*24))
        /(1000*60*60)
    );

    const m = Math.floor(
        (distance % (1000*60*60))
        /(1000*60)
    );

    const s = Math.floor(
        (distance % (1000*60))
        /1000
    );

    days.textContent =
        String(d).padStart(2,"0");

    hours.textContent =
        String(h).padStart(2,"0");

    minutes.textContent =
        String(m).padStart(2,"0");

    seconds.textContent =
        String(s).padStart(2,"0");

}

updateCountdown();

setInterval(updateCountdown,1000);

/* =========================================
   PHOTO SLIDER
========================================= */

const slides = document.querySelector(".slides");
const slideItems = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentSlide = 0;
let autoSlide;

function showSlide(index){

    if(index >= slideItems.length){
        currentSlide = 0;
    }else if(index < 0){
        currentSlide = slideItems.length - 1;
    }else{
        currentSlide = index;
    }

    slides.style.transform =
        `translateX(-${currentSlide * 100}%)`;

    dots.forEach(dot=>{
        dot.classList.remove("active");
    });

    if(dots[currentSlide]){
        dots[currentSlide].classList.add("active");
    }

}


/* =========================================
   BUTTONS
========================================= */

if(nextBtn){

    nextBtn.addEventListener("click",()=>{

        showSlide(currentSlide + 1);

        resetAutoSlide();

    });

}

if(prevBtn){

    prevBtn.addEventListener("click",()=>{

        showSlide(currentSlide - 1);

        resetAutoSlide();

    });

}


/* =========================================
   DOT CLICK
========================================= */

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        showSlide(index);

        resetAutoSlide();

    });

});


/* =========================================
   AUTO SLIDE
========================================= */

function startAutoSlide(){

    autoSlide = setInterval(()=>{

        showSlide(currentSlide + 1);

    },4000);

}

function resetAutoSlide(){

    clearInterval(autoSlide);

    startAutoSlide();

}

startAutoSlide();


/* =========================================
   SWIPE MOBILE
========================================= */

let startX = 0;
let endX = 0;

const slider = document.querySelector(".slider");

if(slider){

    slider.addEventListener("touchstart",(e)=>{

        startX = e.touches[0].clientX;

    });

    slider.addEventListener("touchmove",(e)=>{

        endX = e.touches[0].clientX;

    });

    slider.addEventListener("touchend",()=>{

        if(startX - endX > 50){

            showSlide(currentSlide + 1);

            resetAutoSlide();

        }

        if(endX - startX > 50){

            showSlide(currentSlide - 1);

            resetAutoSlide();

        }

        startX = 0;
        endX = 0;

    });

}


/* =========================================
   INITIALIZE
========================================= */

showSlide(0);

/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
    ".section-title, .location-card, .dress-card, .slider-container, .gallery-note, .letter-card, .closing-section"
);

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            revealObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.15
});

revealElements.forEach(el=>{

    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "all .8s ease";

    revealObserver.observe(el);

});


/* =========================================
   PREVENT IMAGE DRAG
========================================= */

document.querySelectorAll("img").forEach(img=>{

    img.setAttribute("draggable","false");

});


/* =========================================
   SMOOTH BUTTON PRESS
========================================= */

document.querySelectorAll("button, .maps-btn").forEach(btn=>{

    btn.addEventListener("click",function(){

        this.style.transform = "scale(.96)";

        setTimeout(()=>{

            this.style.transform = "";

        },150);

    });

});


/* =========================================
   SAFE AUDIO AUTOPLAY
========================================= */

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        music.pause();

    }else{

        music.play().catch(()=>{});

    }

});


/* =========================================
   FINISH
========================================= */

console.log(`
=========================================
   Sweet Seventeen Invitation
   Theme : Maroon Elegant
   Made with 🤍 for Fio
=========================================
`);
