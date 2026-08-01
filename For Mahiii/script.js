/* ==========================================================
   FOR BACCHAA — SCRAPBOOK V3
   script.js — PART 1
   Intro • Book • Navigation
========================================================== */

/* ==========================
   ELEMENTS
========================== */

const intro = document.getElementById("intro");

const startBtn = document.getElementById("start");

const book = document.getElementById("book");

const pages = document.querySelectorAll(".page");



/* ==========================
   PAGE INDEX
========================== */

let currentPage = 0;


/* ==========================
   SHOW PAGE
========================== */

function showPage(index){

if(index<0 || index>=pages.length) return;

pages.forEach(page=>{

page.classList.remove("active");

});

pages[index].classList.add("active");

currentPage=index;
if(index===pages.length-1){

launchConfetti();

}

}


/* ==========================
   PAGE FLIP
========================== */

function pageFlip(){

book.style.transform=

"rotateY(-12deg) scale(.99)";

setTimeout(()=>{

book.style.transform=

"rotateY(0deg) scale(1)";

},250);

}


/* ==========================
   OPEN SCRAPBOOK
========================== */

startBtn.addEventListener("click", () => {

    startBtn.disabled = true;

    intro.style.opacity = "0";

    setTimeout(() => {

        intro.style.display = "none";

        book.classList.remove("hidden");

        showPage(0);

        startBackground();

        if (music) {

            music.play().catch(() => {});

            if (musicBtn) {
                musicBtn.innerHTML = "❚❚";
            }

        }

    }, 700);

});


/* ==========================
   NEXT BUTTONS
========================== */

document.querySelectorAll(".next")

.forEach(button=>{

button.addEventListener("click",()=>{

if(currentPage>=pages.length-1) return;

pageFlip();

setTimeout(()=>{

showPage(currentPage+1);
if(index===pages.length-1){

}

},220);

});

});


/* ==========================
   PREVIOUS BUTTONS
========================== */

document.querySelectorAll(".prev")

.forEach(button=>{

button.addEventListener("click",()=>{

if(currentPage<=0) return;

pageFlip();

setTimeout(()=>{

showPage(currentPage-1);

},220);

});

});


/* ==========================
   RESTART
========================== */

const restart=document.getElementById("restart");

if(restart){

restart.addEventListener("click",()=>{

pageFlip();

setTimeout(()=>{

showPage(0);

},250);

});

}
/* ==========================================================
   FOR BACCHAA — SCRAPBOOK V3
   script.js — PART 2
   Hearts • Sparkles • Petals • Background Effects
========================================================== */

/* ==========================
   FLOATING HEARTS
========================== */

function createHeart(){

const heart=document.createElement("div");

heart.className="floating-heart";

heart.innerHTML="♡";

heart.style.left=Math.random()*100+"vw";

heart.style.fontSize=(18+Math.random()*22)+"px";

heart.style.animationDuration=(6+Math.random()*4)+"s";

heart.style.opacity=Math.random()*.5+.4;

document.getElementById("hearts").appendChild(heart);

setTimeout(()=>{

heart.remove();

},10000);

}

function startHearts(){

setInterval(createHeart,700);

}


/* ==========================
   SPARKLES
========================== */

function createSparkle(){

const sparkle=document.createElement("div");

sparkle.className="sparkle";

sparkle.style.left=Math.random()*100+"vw";

sparkle.style.top=Math.random()*100+"vh";

sparkle.style.width=(4+Math.random()*6)+"px";

sparkle.style.height=sparkle.style.width;

document.getElementById("sparkles").appendChild(sparkle);

setTimeout(()=>{

sparkle.remove();

},1600);

}

function startSparkles(){

setInterval(createSparkle,300);

}


/* ==========================
   PETALS
========================== */

function createPetal(){

const petal=document.createElement("div");

petal.className="petal";

petal.style.left=Math.random()*100+"vw";

petal.style.animationDuration=(7+Math.random()*5)+"s";

petal.style.transform=

`rotate(${Math.random()*360}deg)`;

document.getElementById("petals").appendChild(petal);

setTimeout(()=>{

petal.remove();

},12000);

}

function startPetals(){

setInterval(createPetal,900);

}


/* ==========================
   CURSOR SPARKLES
========================== */

document.addEventListener("click",(e)=>{

for(let i=0;i<8;i++){

const heart=document.createElement("div");

heart.className="click-heart";

heart.innerHTML="♡";

heart.style.left=e.clientX+"px";

heart.style.top=e.clientY+"px";

heart.style.setProperty("--x",

(Math.random()*140-70)+"px");

heart.style.setProperty("--y",

(-120-Math.random()*80)+"px");

document.body.appendChild(heart);

setTimeout(()=>{

heart.remove();

},1800);

}

});


/* ==========================
   START BACKGROUND
========================== */

function startBackground(){

startHearts();

startSparkles();

startPetals();

}
/* ==========================================================
   FOR BACCHAA — SCRAPBOOK V3
   script.js — PART 3
   Lightbox • Hidden Hearts • Music Player
========================================================== */

/* ==========================
   PHOTO LIGHTBOX
========================== */

const lightbox =
document.getElementById("lightbox");

const lightboxImage =
document.getElementById("lightboxImage");

const lightboxCaption =
document.getElementById("lightboxCaption");

const closeLightbox =
document.getElementById("closeLightbox");

document.querySelectorAll(".polaroid img")
.forEach(img=>{

const flash=document.getElementById("cameraFlash");

flash.classList.add("flash");

setTimeout(()=>{

flash.classList.remove("flash");

},350);

img.addEventListener("click",()=>{

lightbox.classList.add("show");

lightboxImage.src=img.src;

lightboxCaption.textContent=
img.parentElement.nextElementSibling.textContent;

document.body.style.overflow="hidden";

});

});

closeLightbox.addEventListener("click",closePhoto);

lightbox.addEventListener("click",(e)=>{

if(e.target===lightbox){

closePhoto();

}

});

function closePhoto(){

lightbox.classList.remove("show");

document.body.style.overflow="";

}


/* ==========================
   SECRET HEART NOTES
========================== */

const popup =
document.getElementById("popup");

const popupText =
document.getElementById("note-text");

const closePopup =
document.getElementById("closePopup");

document.querySelectorAll(".heart-btn")
.forEach(btn=>{

btn.addEventListener("click",()=>{

popup.classList.add("show");

popupText.textContent=
btn.dataset.note;

});

});

closePopup.addEventListener("click",()=>{

popup.classList.remove("show");

});

popup.addEventListener("click",(e)=>{

if(e.target===popup){

popup.classList.remove("show");

}

});


/* ==========================
   MUSIC PLAYER
========================== */

const music =
document.getElementById("bgMusic");

const musicBtn =
document.getElementById("musicBtn");

let musicPlaying=false;

music.volume=.35;

musicBtn.addEventListener("click",()=>{

if(music.paused){

music.play();

musicBtn.innerHTML="❚❚";

musicPlaying=true;

}

else{

music.pause();

musicBtn.innerHTML="▶";

musicPlaying=false;

}

});


/* ==========================
   AUTO PLAY AFTER START
========================== */

startBtn.addEventListener("click",()=>{

setTimeout(()=>{

music.play().then(()=>{

musicBtn.innerHTML="❚❚";

musicPlaying=true;

}).catch(()=>{

musicBtn.innerHTML="▶";

});

},1500);

});


/* ==========================
   ESC KEY
========================== */

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

closePhoto();

popup.classList.remove("show");

}

});
function launchConfetti(){

const container=document.getElementById("confetti-container");

const colors=[
"#ff7eb3",
"#ffc3d8",
"#ffd166",
"#ffffff",
"#ff9fc4"
];

for(let i=0;i<180;i++){

const piece=document.createElement("div");

piece.className="confetti";

piece.style.left=Math.random()*100+"vw";

piece.style.background=
colors[Math.floor(Math.random()*colors.length)];

piece.style.animationDuration=
(3+Math.random()*3)+"s";

piece.style.transform=
`rotate(${Math.random()*360}deg)`;

container.appendChild(piece);

setTimeout(()=>{

piece.remove();

},6000);

}

}
