document.getElementById("greet").addEventListener("click", function() {
    showFullScreenPopup(getGreeting());
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
});

// Function to determine the greeting based on time
function getGreeting() {
    let now = new Date();
    let hours = now.getHours();
    let timeString = now.toLocaleTimeString();
    
    let greetingMessage = "";

    if (hours < 12) {
        greetingMessage = "Good Morning!";
    } else if (hours < 18) {
        greetingMessage = "Good Afternoon!";
    } else {
        greetingMessage = "Good Evening!";
    }

    return `${greetingMessage}\nCurrent Time: ${timeString}`;
}

// Function to create a full-screen popup dynamically
function showFullScreenPopup(message) {
    let popup = document.createElement("div");
    popup.id = "fullscreen-popup";
    popup.innerHTML = `
        <div id="popup-content">
            <h1>${message}</h1>
            <button id="close-popup">Close</button>
        </div>
    `;

    // Ensure full-screen overlay
    popup.style.position = "fixed";
    popup.style.color = "#333";
    popup.style.top = "0";
    popup.style.left = "0";
    popup.style.width = "100vw";
    popup.style.height = "100vh";
    popup.style.background = "rgba(0, 0, 0, 0.8)";
    popup.style.display = "flex";
    popup.style.justifyContent = "center";
    popup.style.alignItems = "center";
    popup.style.zIndex = "9999"; // Ensure it's on top

    // Style for the popup content
    let popupContent = popup.querySelector("#popup-content");
    popupContent.style.background = "rgba(255, 255, 255, 0.15)"; // Light glass effect
    popupContent.style.backdropFilter = "blur(25px) saturate(180%)"; // Stronger blur & brightness
    popupContent.style.webkitBackdropFilter = "blur(25px) saturate(180%)"; // Safari support
    popupContent.style.border = "2px solid rgba(255, 255, 255, 0.3)"; // Subtle white border
    popupContent.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)"; // Soft shadow for depth
    popupContent.style.borderRadius = "12px"; // Smooth corners
    popupContent.style.padding = "30px";
    popupContent.style.textAlign = "center";
    popupContent.style.width = "80%";
    popupContent.style.maxWidth = "400px";
    popupContent.style.color = "#ffffff"; // White text for better contrast
    popupContent.style.textShadow = "0 2px 5px rgba(0, 0, 0, 0.3)"; // Glow effect for readability


    // Close button styling
    let closeButton = popup.querySelector("#close-popup");
    closeButton.style.marginTop = "20px";
    closeButton.style.padding = "10px 20px";
    closeButton.style.fontSize = "16px";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "5px";
    closeButton.style.cursor = "pointer";
    closeButton.style.background = "rgba(255, 0, 100, 0.8)"; // Brighter pink-red
    closeButton.style.boxShadow = "0 0 10px rgba(255, 0, 100, 0.7)"; // Glow effect

    closeButton.style.color = "white";

    // Close event
    closeButton.addEventListener("click", function() {
        popup.remove();
    });

    document.body.appendChild(popup);
    
    // 🎉 Fire confetti animation
    launchConfetti();
}
// Confetti animation
function launchConfetti() {
    let confettiScript = document.createElement("script");
    confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1";
    confettiScript.onload = () => {
        const duration = 2 * 1000; // 2 seconds
        const animationEnd = Date.now() + duration;
        const colors = ["#ff0a54", "#ff477e", "#ff7096", "#ff85a1", "#ff99ac"];

        function frame() {
            confetti({
                particleCount: 7,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });

            confetti({
                particleCount: 7,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < animationEnd) {
                requestAnimationFrame(frame);
            }
        }

        frame();
    };
    document.body.appendChild(confettiScript);
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showPopup") {
        showFullScreenPopup(request.message);
    }
});
