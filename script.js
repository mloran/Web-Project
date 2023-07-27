const slides = document.querySelector("#slides");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const pics = [
  "https://img.fcbayern.com/image/upload/v1633517110/cms/public/images/allianz-arena/europameisterschaft/UEFA-EURO2024-KV_UEFA.png",
  "https://img.uefa.com/imgml/uefacom/euro2024/rebrand/og-image.png",
  "https://www.fussballnationalmannschaft.net/wp-content/uploads/2021/10/uefa-euro-2024-logo-scaled.jpg",
  "https://editorial.uefa.com/resources/0282-184c9ffe0c0f-9c65bdcec1ab-1000/slide_9_-_16x9.png",
];

let currentSlideIndex = 0;

//Sliding for the left button
prevBtn.addEventListener("click", function () {
  slides.classList.add("fade-out");

  setTimeout(function () {
    currentSlideIndex = (currentSlideIndex - 1 + pics.length) % pics.length;
    slides.src = pics[currentSlideIndex];
    slides.classList.remove("fade-out");
  }, 500);
});

//Sliding for the right button
nextBtn.addEventListener("click", function () {
  slides.classList.add("fade-out");

  setTimeout(function () {
    currentSlideIndex = (currentSlideIndex + 1) % pics.length;
    slides.src = pics[currentSlideIndex];
    slides.classList.remove("fade-out");
  }, 500);
});
