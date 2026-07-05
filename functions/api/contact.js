const json = (body, init = {}) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...(init.headers || {}),
    },
  });

const parseBody = async (request) => {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return request.json();
  }

  const formData = await request.formData();
  return Object.fromEntries(formData.entries());
};

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function onRequestPost({ request, env }) {
  try {
    const body = await parseBody(request);
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    if (!isEmail(email)) {
      return json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const submission = {
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
      source: "florima.io",
    };

    if (env.CONTACT_WEBHOOK_URL) {
      await fetch(env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
    } else {
      console.log("Contact form submission", submission);
    }

    return json({ message: "Thanks. Your message has been sent." });
  } catch (error) {
    console.error("Contact form error", error);
    return json({ error: "Unable to send your message right now." }, { status: 500 });
  }
}

export function onRequestGet() {
  return json({ error: "Method not allowed." }, { status: 405 });
}
