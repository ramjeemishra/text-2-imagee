const token = "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";
const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");
const status = document.getElementById("status");
const downloadBtn = document.getElementById("downloadBtn");

button.addEventListener('click', async function () {
    status.classList.remove("hidden");
    status.textContent = "Your image is being generated...";
    image.src = ""; // Clear any previous image
    downloadBtn.classList.add("hidden"); // Hide the download button until a new image is generated
    const response = await query();
    if (response) {
        const objectURL = URL.createObjectURL(response);
        image.src = objectURL;
        status.textContent = "Image generated successfully!";
        downloadBtn.classList.remove("hidden");
        downloadBtn.href = objectURL;
        downloadBtn.download = "generated-image.png";
    }
});

async function query() {
    console.log("Query function called"); // Debugging log
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/XLabs-AI/flux-RealismLora", 
            {
                headers: { Authorization: `Bearer ${token}` },
                method: "POST",
                body: JSON.stringify({ "inputs": inputTxt.value }),
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
        status.textContent = "Failed to generate image. Please try again.";
    }
}
