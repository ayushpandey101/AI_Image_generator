const themeToggle = document.querySelector(".theme-toggle");
const promptForm = document.querySelector(".prompt-form");
const promptInput = document.querySelector(".prompt-input");
const promptBtn = document.querySelector(".prompt-btn");
const modelSelect = document.getElementById("model-select");
const countSelect = document.getElementById("count-select");
const ratioSelect = document.getElementById("ratio-select");
const gridGallery = document.querySelector(".gallery-grid");

//Example prompts for generating images
const examplePrompts = [
  "A futuristic cityscape at sunset",
  "A serene beach with crystal clear water",
  "A colossal, moss-covered tortoise carrying a vibrant, bustling medieval city on its back",
  "A city carved into a giant, bioluminescent mushroom.",
  "A steampunk owl with clockwork wings, perched on a gas-lit lamp post.",
  "An astronaut discovering a lush, alien jungle inside a hollowed-out asteroid.",
  "A library where the books are floating, and the shelves are made of waterfalls.",
  "A desert landscape where the sand is made of sparkling, multi-colored crystals.",
  "A child flying a kite that's actually a friendly, miniature dragon.",
  "An underwater city inhabited by graceful, jellyfish-like beings.",
  "A knight in shining armor, having a tea party with a group of woodland creatures.",
  "A train that travels through the clouds, with stations on fluffy, white cumulus formations.",
  "A musician playing a violin that sprouts glowing, musical notes as they play.",
];

//Set theme based on the saved preference or system default
(() => {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const isDarkTheme =
    savedTheme === "dark" || (!savedTheme && systemPrefersDark);
  document.body.classList.toggle("dark-theme", isDarkTheme);
  themeToggle.querySelector("i").className = isDarkTheme
    ? "fa-solid fa-sun"
    : "fa-solid fa-moon";
})();

//switching between themes(drak/light)
const toggleTheme = () => {
  const isDarkTheme = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
  themeToggle.querySelector("i").className = isDarkTheme
    ? "fa-solid fa-sun"
    : "fa-solid fa-moon";
};

//Base size for image dimension calculations
const getImageDimensions = (aspectRatio, baseSize = 512) => {
  const [width, height] = aspectRatio.split("/").map(Number);
  const scaleFactor = baseSize / Math.sqrt(width * height);

  let calculatedWidth = Math.round(width * scaleFactor);
  let calculatedHeight = Math.round(height * scaleFactor);

  //Ensure dimensions are multiples of 16 (AI model requirements)
  calculatedWidth = Math.floor(calculatedWidth / 16) * 16;
  calculatedHeight = Math.floor(calculatedHeight / 16) * 16;

  return { width: calculatedWidth, height: calculatedHeight };
};

const updateImageCards = (imgIndex, imgURL) => {
  const imgCard = document.getElementById(`img-card-${imgIndex}`);
  if (!imgCard) return;

  imgCard.classList.remove("loading");
  imgCard.innerHTML = `<img src="${imgURL}" class="result-img" />
              <div class="img-overlay">
                <a href="${imgURL}" class="img-download-btn" download="${Date.now()}.png">
                  <i class="fa-solid fa-download"></i>
                </a>
              </div>`;
};

// Send requests to YOUR BACKEND to generate images
const generateImages = async (
  selectedModel,
  imageCount,
  aspectRatio,
  promptText
) => {
  // Get the calculated width and height to send to the backend
  const { width, height } = getImageDimensions(aspectRatio);
  const BACKEND_URL = "http://localhost:3000/generate-images"; // Your server's URL

  // Create an array of promises to generate multiple images
  const imagePromises = Array.from({ length: imageCount }, async (_, i) => {
    // Send POST request to your backend server API
    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Send all necessary data in the body
          selectedModel: selectedModel,
          promptText: promptText,
          width: width,
          height: height,
        }),
      });

      if (!response.ok) {
        // You can get more specific error info from the backend if you sent it as JSON
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate image.");
      }

      // Convert response to an image URL and update the respective image card
      const resultBlob = await response.blob();
      updateImageCards(i, URL.createObjectURL(resultBlob));
    } catch (error) {
      console.error("Error generating image:", error);
      // Optional: Update the UI to show an error on the specific card
      console.error("Error generating image:", error);
    }
  });

  await Promise.allSettled(imagePromises);
};

//Create placeholder image cards with loading spinners
const createImageCards = (
  selectedModel,
  imageCount,
  aspectRatio,
  promptText
) => {
  gridGallery.innerHTML = "";

  for (let i = 0; i < imageCount; i++) {
    gridGallery.innerHTML += `<div class="img-card loading" id="img-card-${i}" style="aspect-ratio:${aspectRatio}">
              <div class="status-container">
                <div class="spinner"></div>
                <i class="fa-solid fa-triangle-exclamation"></i>
                <p class="status-text">Generating...</p>
              </div>
            </div>`;
  }

  generateImages(selectedModel, imageCount, aspectRatio, promptText);
};

//Handle form submission
const handleFormSubmit = (e) => {
  e.preventDefault();

  //Get form values
  const selectedModel = modelSelect.value;
  const imageCount = parseInt(countSelect.value) || 1;
  const aspectRatio = ratioSelect.value || "1/1";
  const promptText = promptInput.value.trim();

  createImageCards(selectedModel, imageCount, aspectRatio, promptText);
};
//Generate random prompt on button click and fill the input field
promptBtn.addEventListener("click", () => {
  const prompt =
    examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
  promptInput.value = prompt;
  promptInput.focus();
});

promptForm.addEventListener("submit", handleFormSubmit);
themeToggle.addEventListener("click", toggleTheme);
