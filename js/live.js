// Simple chat functionality
document
  .getElementById("send-message")
  .addEventListener("click", function () {
    const input = document.getElementById("chat-input");
    const message = input.value.trim();

    if (message) {
      const chatMessages = document.getElementById("chat-messages");
      const now = new Date();
      const timeString =
        now.getHours() +
        ":" +
        (now.getMinutes() < 10 ? "0" : "") +
        now.getMinutes();

      const messageElement = document.createElement("div");
      messageElement.className = "message";
      messageElement.innerHTML = `
              <div>
                  <span class="message-user">You:</span>
                  <span class="message-time">${timeString}</span>
              </div>
              <div class="message-content">${message}</div>
          `;

      chatMessages.appendChild(messageElement);
      input.value = "";
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Simulate a response after a short delay
      setTimeout(() => {
        const responses = [
          "Great point!",
          "I agree with that.",
          "Interesting perspective.",
          "Thanks for sharing!",
          "Let's discuss this further in the networking session.",
        ];

        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];
        const responder = [
          "Moderator",
          "Teboho_M",
          "Lerato_NUL",
          "Botho_Student",
        ][Math.floor(Math.random() * 4)];

        const responseElement = document.createElement("div");
        responseElement.className = "message";
        responseElement.innerHTML = `
                  <div>
                      <span class="message-user">${responder}:</span>
                      <span class="message-time">${timeString}</span>
                  </div>
                  <div class="message-content">${randomResponse}</div>
              `;

        chatMessages.appendChild(responseElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1000 + Math.random() * 3000);
    }
  });

// Allow sending message with Enter key
document
  .getElementById("chat-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      document.getElementById("send-message").click();
    }
  });

// Close mobile menu when clicking outside
document.addEventListener("click", function (event) {
  const navbarCollapse = document.getElementById("navbarNav");
  const navbarToggler = document.querySelector(".navbar-toggler");

  if (
    navbarCollapse.classList.contains("show") &&
    !event.target.closest(".navbar") &&
    !event.target.classList.contains("navbar-toggler")
  ) {
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
      toggle: false,
    });
    bsCollapse.hide();

    navbarToggler.setAttribute("aria-expanded", "false");
  }
});
