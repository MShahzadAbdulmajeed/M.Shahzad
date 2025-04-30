// Animated Text Content
const roles = [
    "Chatbot Developer.",
    "Fullstack Developer.",
    "AI Developer.",
    "AI Agent Specialist.",
    "AI Engineer.",
    "AI Researcher.",
];

const animatedText = document.getElementById("animatedText");

let currentIndex = 0;

function showNextRole() {
    // Clear previous span if any
    animatedText.innerHTML = "";

    const span = document.createElement("span");
    span.textContent = roles[currentIndex];
    animatedText.appendChild(span);

    // Cycle through roles
    currentIndex = (currentIndex + 1) % roles.length;

    // Repeat after delay
    setTimeout(showNextRole, 2000); // 2 seconds per role
}

// Start animation
showNextRole();

// Tab Switching
function switchTab(tabName) {
    document.querySelectorAll('.cards-container').forEach(container => {
        container.classList.remove('active');
    });
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}
// Handle toggle for all dropdowns
document.querySelectorAll('.nav_link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent anchor default jump

        // Get the corresponding dropdown_menu ID from the link ID
        const dropdownId = 'dropdown_menu_' + link.id.split('_').pop();
        const dropdown = document.getElementById(dropdownId);

        // Close all dropdowns first
        document.querySelectorAll('.dropdown_menu').forEach(menu => {
            if (menu !== dropdown) {
                menu.style.display = 'none';
            }
        });

        // Toggle current dropdown
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        } else {
            dropdown.style.display = 'block';
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const aboutMeSection = document.querySelector("#about-me");
    aboutMeSection.style.transition = "transform 0.3s ease-in-out";
    aboutMeSection.addEventListener("mouseover", () => {
        aboutMeSection.style.transform = "scale(1.05)";
    });
    aboutMeSection.addEventListener("mouseout", () => {
        aboutMeSection.style.transform = "scale(1)";
    });
});