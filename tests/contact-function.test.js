import assert from "node:assert/strict";
import { onRequestGet, onRequestPost } from "../functions/api/contact.js";

const validRequest = new Request("https://florima.io/api/contact", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    name: "Test User",
    email: "test@example.com",
    message: "Hello from smoke test.",
  }),
});

const validResponse = await onRequestPost({ request: validRequest, env: {} });
assert.equal(validResponse.status, 200);
assert.match(await validResponse.text(), /Thanks/);

const invalidRequest = new Request("https://florima.io/api/contact", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    name: "Test User",
    email: "not-an-email",
    message: "Hello from smoke test.",
  }),
});

const invalidResponse = await onRequestPost({ request: invalidRequest, env: {} });
assert.equal(invalidResponse.status, 400);
assert.match(await invalidResponse.text(), /valid email/);

const getResponse = onRequestGet();
assert.equal(getResponse.status, 405);

console.log("contact function tests passed");
