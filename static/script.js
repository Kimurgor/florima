const form = document.querySelector("#contact-form");
const statusEl = document.querySelector("#form-status");

if (form && statusEl) {
  const statusBaseClass = "min-h-6 text-florima-muted";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    statusEl.className = statusBaseClass;
    statusEl.textContent = "Sending...";

    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Unable to send your message.");
      }

      form.reset();
      statusEl.className = "min-h-6 text-florima-purple";
      statusEl.textContent = data.message || "Thanks. Your message has been sent.";
    } catch (error) {
      statusEl.className = "min-h-6 text-red-700";
      statusEl.textContent = error.message || "Something went wrong. Please try again.";
    }
  });
}
