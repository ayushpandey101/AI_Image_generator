# 🤖 AI Image Generator

A simple and elegant web application that leverages the power of AI to generate stunning images from text prompts. This project allows you to bring your creative ideas to life, selecting from various models, aspect ratios, and image counts to customize your creations.

## ✨ Features

  * **Text-to-Image Generation**: Convert your textual descriptions into high-quality images.
  * **Model Selection**: Choose from different AI models to vary the artistic style of the generated images.
  * **Customizable Output**: Select the number of images to generate (1-4) and the desired aspect ratio (e.g., 1:1, 16:9).
  * **Surprise Me**: A random prompt generator to spark your creativity when you're out of ideas.
  * **Dark/Light Theme**: A sleek theme toggle for a comfortable viewing experience in any lighting condition.
  * **Secure API Handling**: All API requests are securely managed through a Node.js backend, keeping your API key safe.
  * **Download Images**: Easily save your favorite creations with a one-click download button.

-----

## 🛠️ Tech Stack

This project is built with a modern tech stack, ensuring a secure and efficient user experience.

  * **Frontend**: HTML, CSS, JavaScript
  * **Backend**: Node.js, Express.js
  * **API**: Hugging Face Inference API
  * **Dependencies**: `dotenv`, `cors`, `node-fetch`

-----

## ⚙️ Setup and Installation

To get this project running on your local machine, follow these simple steps.

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/ayushpandey101/AI_Image_generator.git
    cd AI_Image_generator
    ```

2.  **Install backend dependencies**:

    ```bash
    npm install
    ```

3.  **Create an environment file**:
    Create a file named `.env` in the root of the project folder.

4.  **Add your API key**:
    Open the `.env` file and add your Hugging Face API key like this:

    ```
    HF_API_KEY=your_hugging_face_api_key_here
    ```

-----

## 🚀 How to Use

1.  **Start the backend server**:
    Open your terminal in the project directory and run:

    ```bash
    node server.js
    ```

    You should see the message: `Server is running on http://localhost:3000`

2.  **Open the frontend**:
    Open the `index.html` file in your web browser (using a Live Server extension in your code editor is recommended).

3.  **Generate Images**:

      * Type a descriptive prompt into the input field or click the "Surprise Me" button.
      * Select your desired AI model, image count, and aspect ratio.
      * Click the "Generate" button and watch your ideas come to life\!

-----

## 🖼️ Screenshots

<img width="1482" height="786" alt="image" src="https://github.com/user-attachments/assets/b78aa208-4ea7-465f-908e-afec97530e5a" />

-----
