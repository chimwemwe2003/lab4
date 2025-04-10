function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const clock = document.getElementById('clock');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initialize the clock immediately
updateClock();


// Theme management
function setTheme(theme) {
    document.body.classList.toggle("dark-theme", theme === 'dark');
    localStorage.setItem('theme', theme);
    document.getElementById("themeToggle").classList.add('active');
    setTimeout(() => {
        document.getElementById("themeToggle").classList.remove('active');
    }, 300);
}

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

document.getElementById("themeToggle").addEventListener("click", () => {
    const currentTheme = document.body.classList.contains("dark-theme") ? 'light' : 'dark';
    setTheme(currentTheme);
});
document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("nameInput").value.trim();
    const message = document.getElementById("messageInput").value.trim();
    if (name === "" || message === "") {
        alert("Please fill out all fields.");
    } else {
        document.getElementById("response").innerText = `Thanks, ${name}. We'll get back to you soon!`;
        // Optional: reset form
        e.target.reset();
    }
});

// Load users function
async function loadUsers() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await res.json();
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.name;
            userList.appendChild(li);
        });
    } catch (err) {
        console.error('Failed to load users:', err);
        userList.innerHTML = '<li>Error loading users</li>';
    }
}

// Load users when page loads
document.addEventListener('DOMContentLoaded', loadUsers);

// Button click handler
document.getElementById('loadUsersBtn').addEventListener('click', loadUsers);

// FAQ Container Toggle Functionality
document.querySelector(".faq-toggle").addEventListener("click", () => {
    const faqContent = document.querySelector(".faq-content");
    const isExpanded = faqContent.classList.contains("expanded");
    
    faqContent.classList.toggle("expanded", !isExpanded);
    const icon = document.querySelector(".faq-toggle i");
    icon.classList.toggle("fa-chevron-up", !isExpanded);
    icon.classList.toggle("fa-chevron-down", isExpanded);
});

// Initialize FAQ items to be expanded by default
document.querySelectorAll(".faq-item .question").forEach((q) => {
    q.addEventListener("click", () => {
        const answer = q.nextElementSibling;
        const isOpening = !answer.classList.contains("visible");
        
        q.classList.toggle("expanded", isOpening);
        answer.classList.toggle("visible", isOpening);
        answer.style.maxHeight = isOpening ? answer.scrollHeight + "px" : "0";
    });
});
