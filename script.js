// Slider
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

// Tooltip-Miniwindowww
const flagElements = document.querySelectorAll(".flag-card");

flagElements.forEach((flag) => {
  flag.addEventListener("mouseover", showInfoWindow);
  flag.addEventListener("mouseout", hideInfoWindow);
});

function showInfoWindow(event) {
  const countryName = getCountryName(event.currentTarget);
  if (!countryName) return;

  const countryInfo = getCountryInfo(countryName);

  const infoWindow = document.getElementById("infoWindow");
  infoWindow.textContent = countryInfo;

  const mouseX = event.clientX;
  const mouseY = event.clientY;
  const offsetX = -50;
  const offsetY = -90;

  infoWindow.style.left = `${mouseX + offsetX}px`;
  infoWindow.style.top = `${mouseY + offsetY}px`;

  // Remove the "hidden" class to show the tooltip
  infoWindow.classList.remove("hidden");
}

function hideInfoWindow() {
  const infoWindow = document.getElementById("infoWindow");
  infoWindow.classList.add("hidden");
}

function getCountryName(element) {
  if (element.nodeName === "P") {
    return element.innerHTML;
  } else {
    const paragraphElement = element.querySelector("p");
    return paragraphElement ? paragraphElement.innerHTML : null;
  }
}

function getCountryInfo(country) {
  switch (country) {
    case "Germany":
      return "Germany is a country in Central Europe known for its rich history...";
    case "France":
      return "France has a rich soccer tradition, is a two-time world champion and has won two European titles. The French national team has produced many outstanding players and is known for its offensive style of play.";
    case "Spain":
      return "Spain has a rich soccer tradition, is a two-time world champion and has won two European titles. The French national team has produced many outstanding players and is known for its offensive style of play.";
    case "Portugal":
      return "Portugal is known for its passionate soccer fans and has produced top-quality players like Cristiano Ronaldo.";
    case "Netherlands":
      return "The Netherlands has a storied soccer history and is known for its Total Football style of play.";
    case "Belgium":
      return "Belgium has a talented national team and is known for its strong youth development programs.";
    case "Italy":
      return "Italy is a soccer powerhouse, having won multiple World Cup and European Championship titles.";
    case "Norway":
      return "Norway has a promising young generation of soccer players and is known for its enthusiasm for the sport.";
    default:
      return "No information available.";
  }
}

// API-URL für die Videos-API
const url = "https://free-football-soccer-videos.p.rapidapi.com/";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f1b41bfdf6msh10f866d5e5d133ep1773e1jsneeb6d06befbb",
    "X-RapidAPI-Host": "free-football-soccer-videos.p.rapidapi.com",
  },
};
// Funktion zum Erstellen eines Video-HTML-Elements
function createVideoElement(videoEmbed) {
  const videoContainer = document.createElement("div");
  videoContainer.innerHTML = videoEmbed;
  return videoContainer.firstChild;
}

// Funktion zum Erstellen eines Titels
function createTitle(title) {
  const titleContainer = document.createElement("div");
  titleContainer.classList.add(
    "bg-emerald-700",
    "p-10",
    "text-white",
    "justify-items-center"
  );
  const videoTitle = document.createElement("p");
  videoTitle.classList.add("text-white", "text-2xl", "text-center");
  videoTitle.textContent = `Football Match : ${title}`;

  titleContainer.appendChild(videoTitle);
  return titleContainer;
}

// AYSNC FUNCTION
async function displayLatestVideos() {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const latestVideos = data.slice(0, 6);

    const videoContainer = document.getElementById("videoContainer");
    videoContainer.innerHTML = "";

    latestVideos.forEach((article) => {
      if (article.videos && article.videos.length > 0) {
        const videoElement = createVideoElement(article.videos[0].embed);
        const videoTitle = createTitle(article.title); // Hier erstellen wir den Titel
        const videoWrapper = document.createElement("div");

        videoWrapper.appendChild(videoElement);
        videoWrapper.appendChild(videoTitle);

        videoContainer.appendChild(videoWrapper);
      }
    });
  } catch (error) {
    console.error("Fehler beim Abrufen der Videos:", error);
  }
}

// Aufruf der Funktion zum Anzeigen der neuesten Videos
displayLatestVideos();

// NEED TO KNOW SECTION
// NEED TO KNOW SECTION
// NEED TO KNOW SECTION

const grid = document.querySelector(".grid");
const visibleDivs = document.querySelectorAll(".divCard:not(.hidden)");
console.log("Visible Divs:", visibleDivs);

const totalDivs = visibleDivs.length;
let currentDivIndex = 0;

function createEmptyDivWithSameClass() {
  const newDiv = document.createElement("div");
  newDiv.classList.add("divCard", "bg-emerald-700", "p-10");
  return newDiv;
}

function showNextDiv() {
  console.log("Next Clicked");
  console.log("Current Div Index:", currentDivIndex);
  console.log("Total Divs:", totalDivs);

  // Hide the current visible div
  visibleDivs[currentDivIndex].classList.add("hidden");

  // Increment the currentDivIndex and make it wrap around the totalDivs count
  currentDivIndex = (currentDivIndex + 1) % totalDivs;

  // Show the next div
  visibleDivs[currentDivIndex].classList.remove("hidden");

  // Create a new empty div with the same class
  const newDiv = createEmptyDivWithSameClass();

  // Insert the new div at the correct position in the grid
  const insertIndex = (currentDivIndex + 1) % totalDivs;
  const insertBeforeDiv = visibleDivs[insertIndex];
  grid.insertBefore(newDiv, insertBeforeDiv);

  console.log("New Current Div Index:", currentDivIndex);
}

function showPrevDiv() {
  console.log("Previous Clicked");
  console.log("Current Div Index:", currentDivIndex);
  console.log("Total Divs:", totalDivs);

  // Hide the current visible div
  visibleDivs[currentDivIndex].classList.add("hidden");

  // Decrement the currentDivIndex and make it wrap around the totalDivs count
  currentDivIndex = (currentDivIndex - 1 + totalDivs) % totalDivs;

  // Show the previous div
  visibleDivs[currentDivIndex].classList.remove("hidden");

  // Create a new empty div with the same class
  const newDiv = createEmptyDivWithSameClass();

  // Insert the new div at the correct position in the grid
  const insertIndex = currentDivIndex;
  const insertBeforeDiv = visibleDivs[insertIndex];
  grid.insertBefore(newDiv, insertBeforeDiv);

  console.log("New Current Div Index:", currentDivIndex);
}

document.getElementById("prev-btn2").addEventListener("click", showPrevDiv);
document.getElementById("next-btn2").addEventListener("click", showNextDiv);

///ZOOM

// JavaScript, um auf das Klicken des Bildes zu reagieren und die Animation hinzuzufügen
const highlightCards = document.querySelectorAll(".highlight-card");

highlightCards.forEach((card) => {
  card.addEventListener("click", () => {
    // Füge die 'active' Klasse hinzu, um die Animation zu aktivieren
    card.classList.add("active");

    // Hier kannst du den Info-Text entsprechend anzeigen, indem du die 'hidden' Klasse entfernst
    const infoText = card.querySelector(".info-text");
    infoText.classList.remove("hidden");
  });

  // Wenn du den Info-Text wieder ausblenden möchtest, wenn das Bild erneut geklickt wird, kannst du den folgenden Code verwenden:
  // card.addEventListener('click', () => {
  //   card.classList.toggle('active');
  //   const infoText = card.querySelector('.info-text');
  //   infoText.classList.toggle('hidden');
  // });
});
