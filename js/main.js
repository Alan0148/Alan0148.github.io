document.addEventListener("DOMContentLoaded", function () {

/* SOBRE */
const seal = document.getElementById("seal");
const flap = document.getElementById("flap");
const envelopeScreen = document.getElementById("envelope-screen");
const mainContent = document.getElementById("main-content");

seal.addEventListener("click", function () {
    flap.style.transform = "rotateX(-180deg)";
    setTimeout(() => {
        envelopeScreen.style.transform = "translateY(-100%)";
        mainContent.style.opacity = "1";
    }, 1000);
});

/* CONTADOR */
const weddingDate = new Date("October 24, 2026 16:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    document.getElementById("days").innerText =
        Math.floor(distance / (1000 * 60 * 60 * 24));

    document.getElementById("hours").innerText =
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    document.getElementById("minutes").innerText =
        Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("seconds").innerText =
        Math.floor((distance % (1000 * 60)) / 1000);

}, 1000);

/* SCROLL */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".fade-in-section").forEach(section => {
    observer.observe(section);
});

/* RSVP GOOGLE FORMS */

const rsvpForm = document.getElementById("rsvpForm");
const rsvpMessage = document.getElementById("rsvpMessage");

rsvpForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const attendance = document.querySelector('input[name="attendance"]:checked').value;
    const companions = document.querySelector('select[name="companions"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSca2WGb1NQW884K6smGI3Di3hoNkxJDXMgWFvqR8nPOHunChg/formResponse";

    const formData = new FormData();
    formData.append("entry.341970007", name);
    formData.append("entry.1242162657", attendance);
    formData.append("entry.1478010207", companions);
    formData.append("entry.1216771719", message);

    fetch(formURL, {
        method: "POST",
        mode: "no-cors",
        body: formData
    }).then(() => {

        rsvpForm.style.display = "none";
        rsvpMessage.classList.remove("hidden");

        if (attendance === "ASISTIRE") {
            rsvpMessage.innerHTML =
                "<p class='script text-3xl mb-4'>Gracias por acompañarnos</p>" +
                "<p class='serif text-lg text-[#1f3d3a99]'>Tu presencia hará este día aún más especial para nosotros.</p>";
        } else {
            rsvpMessage.innerHTML =
                "<p class='script text-3xl mb-4'>Gracias por confirmarnos</p>" +
                "<p class='serif text-lg text-[#1f3d3a99]'>Te llevaremos en nuestro corazón ese día.</p>";
        }

    });
});



/* ===== CARRUSEL ===== */

const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-img");
const nextBtn = document.querySelector(".carousel-btn.next");
const prevBtn = document.querySelector(".carousel-btn.prev");

let index = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
});




});