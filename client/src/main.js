const form = document.getElementById("fan-form");
const messagesDiv = document.getElementById("messages");

const errorDiv = document.createElement("p");
errorDiv.className = "error";
form.prepend(errorDiv);

async function loadMessages() {
  const res = await fetch("http://localhost:3000/messages");
  const data = await res.json();

  messagesDiv.innerHTML = "";

  data.forEach((msg) => {
    const div = document.createElement("div");
    div.className = "message";

    div.innerHTML = `
      <strong>${msg.fan_name}</strong>
      <div class="team">${msg.team}</div>
      <p>${msg.message}</p>
    `;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", async () => {
      await fetch(`http://localhost:3000/messages/${msg.id}`, {
        method: "DELETE",
      });
      loadMessages();
    });

    div.appendChild(deleteBtn);
    messagesDiv.appendChild(div);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorDiv.textContent = "";

  const fan_name = document.getElementById("fan_name").value.trim();
  const team = document.getElementById("team").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!fan_name || !team || !message) {
    errorDiv.textContent = "All fields are required.";
    return;
  }

  if (message.length < 5) {
    errorDiv.textContent = "Message must be at least 5 characters long.";
    return;
  }

  await fetch("http://localhost:3000/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fan_name, team, message }),
  });

  form.reset();
  loadMessages();
});

loadMessages();
