// Countdown Timer Script - Updated for 2025 summit
function updateCountdown() {
    // Set to June 10-12, 2025 as placeholder - update with actual dates
    const endDate = new Date("2025-07-24T10:00:00+02:00").getTime();
    const now = new Date().getTime();
    const distance = endDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
}

// setInterval(updateCountdown, 1000);
updateCountdown();