const token = "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"
const inputTxt = document.getElementById("input")
const image = document.getElementById("image")
const button = document.getElementById("btn")

button.addEventListener('click', async function () {
    const response = await query();
    if (response) {
        const objectURL = URL.createObjectURL(response);
        image.src = objectURL;
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
        alert("Failed to generate image. Please check your input or try again later.");
    }
}
