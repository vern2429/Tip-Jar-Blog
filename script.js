const form = document.getElementById("storyForm");
const storiesContainer = document.getElementById("storiesContainer");

let stories = JSON.parse(localStorage.getItem("stories")) || [];

stories.forEach(storyData => addStoryToPage(storyData));

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("userName").value;
    const story = document.getElementById("storyText").value;
    const piAddress = document.getElementById("piAddress").value;

    if (!name || !story || !piAddress) {
        alert("Please fill in all fields.");
        return;
    }

    const storyData = { name, story, piAddress };
    addStoryToPage(storyData);

    stories.push(storyData);
    localStorage.setItem("stories", JSON.stringify(stories));

    form.reset();
});

// Function to display the story on the page
function addStoryToPage(storyData) {
    const storyElement = document.createElement("div");
    storyElement.classList.add("story-card");

    storyElement.innerHTML = `
        <h3>${storyData.name}</h3>
        <p>${storyData.story}</p>
        <p><strong>Pi Wallet Address:</strong> ${storyData.piAddress}</p>
        <div class="qr-code" id="qr-${storyData.piAddress}"></div>
        <p>Scan the QR code to send Pi donations!</p>
    `;

    storiesContainer.prepend(storyElement);

    // Generate QR Code for the wallet address
    new QRCode(document.getElementById(`qr-${storyData.piAddress}`), {
        text: `pi:${storyData.piAddress}`,
        width: 100,
        height: 100
    });
}

