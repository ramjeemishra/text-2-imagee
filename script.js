const token = "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";
const inputTxt = document.getElementById("user-input");
const image = document.getElementById("image");
const button = document.getElementById("send-buttonn");
const status = document.getElementById("status");
const downloadBtn = document.getElementById("downloadBtn");

// Define the keyword or condition for generating an image
// const requiredKeyword = "generate"; // Replace with your actual keyword or condition

button.addEventListener('click', async function () {
    const userInput = inputTxt.value.trim();
    
    // Check if the input contains the required keyword
    // if (!userInput.includes(requiredKeyword)) {
    //     status.textContent = `Please include the keyword "${requiredKeyword}" in your input.`;
    //     return; // Exit the function without making the API call
    // }

    status.classList.remove("hidden");
    status.textContent = "Your image is being generated...";
    image.src = ""; // Clear any previous image
    downloadBtn.classList.add("hidden"); // Hide the download button until a new image is generated

    const response = await query(userInput);
    if (response) {
        const objectURL = URL.createObjectURL(response);
        image.src = objectURL;
        status.textContent = "Image generated successfully!";
        downloadBtn.classList.remove("hidden");
        downloadBtn.href = objectURL;
        downloadBtn.download = "generated-image.png";
    }
});

async function query(input) {
    console.log("Query function called with input:", input); // Debugging log
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/XLabs-AI/flux-RealismLora", 
            {
                headers: { Authorization: `Bearer ${token}` },
                method: "POST",
                body: JSON.stringify({ "inputs": input }),
            }
        );
        console.log("Received response from API"); // Debugging log
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error ${response.status}: ${errorMessage}`);
        }
        const result = await response.blob();
        return result;
    } catch (error) {
        console.error("Error occurred:", error.message);
        status.textContent = "Failed to generate image. Please try again.      {or try after sometime, (server overload)";
    }
}
