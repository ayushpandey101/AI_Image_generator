// server.js

// 1. Import required modules
const express = require("express");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const cors = require("cors");

// 2. Load environment variables
dotenv.config();

// 3. Initialize Express app and set port
const app = express();
const PORT = process.env.PORT || 3000;

// 4. Use middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse JSON request bodies

// 5. Define the API endpoint
app.post("/generate-images", async (req, res) => {
  const { selectedModel, promptText, width, height } = req.body;
  const API_KEY = process.env.HF_API_KEY;

  if (!API_KEY) {
    console.error("CRITICAL: HF_API_KEY is not defined in .env file.");
    return res
      .status(500)
      .json({ error: "API key is not configured on the server." });
  }

  const MODEL_URL = `https://api-inference.huggingface.co/models/${selectedModel}`;

  console.log(`Request received for model: ${selectedModel}`); // Log incoming request

  try {
    const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: promptText,
        parameters: { width, height },
        options: { wait_for_model: true, use_cache: false },
      }),
    });

    if (!response.ok) {
      // This part is crucial for debugging API errors
      const errorText = await response.text();
      console.error(
        `Hugging Face API Error: Status ${response.status}`,
        errorText
      );
      return res
        .status(response.status)
        .json({ error: `The AI model returned an error: ${errorText}` });
    }

    const imageBuffer = await response.buffer();
    res.setHeader("Content-Type", "image/png");
    res.send(imageBuffer);
  } catch (error) {
    console.error("FATAL SERVER ERROR:", error);
    res
      .status(500)
      .json({ error: "An unexpected error occurred on the server." });
  }
});

// 6. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
