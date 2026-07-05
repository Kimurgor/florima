const form = document.querySelector("#contact-form");
const statusEl = document.querySelector("#form-status");

if (form && statusEl) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    statusEl.className = "form-status";
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
      statusEl.classList.add("success");
      statusEl.textContent = data.message || "Thanks. Your message has been sent.";
    } catch (error) {
      statusEl.classList.add("error");
      statusEl.textContent = error.message || "Something went wrong. Please try again.";
    }
  });
}
