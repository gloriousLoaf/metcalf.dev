/**
 * POST /api/contact - Cloudflare Pages Function
 * Checks the contact form and forwards it to Formbold, so the form id stays
 * out of client code. Set FORMBOLD_FORM_ID as a secret in the Pages project:
 * Settings > Variables and Secrets (Production and Preview).
 */
const LIMITS = { name: 100, email: 254, message: 5000 };
const EMAIL = /^\S+@\S+\.\S+$/;

const reply = (status, error) =>
  error ? Response.json({ error }, { status }) : new Response(null, { status });

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.formData();
  } catch {
    return reply(400, "Expected form data.");
  }

  // honeypot: bots fill the hidden last_name field, let them think it worked
  if (data.get("last_name")) {
    return reply(204);
  }

  const fields = {};
  for (const [key, max] of Object.entries(LIMITS)) {
    const value = String(data.get(key) ?? "").trim();
    if (!value || value.length > max) {
      return reply(400, `Please check the ${key} field.`);
    }
    fields[key] = value;
  }
  if (!EMAIL.test(fields.email)) {
    return reply(400, "Please check the email field.");
  }

  if (!env.FORMBOLD_FORM_ID) {
    console.error("FORMBOLD_FORM_ID is not set");
    return reply(500, "The form is not configured.");
  }

  const body = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    body.append(key, value);
  }

  try {
    const response = await fetch(
      `https://formbold.com/s/${env.FORMBOLD_FORM_ID}`,
      { method: "POST", headers: { Accept: "application/json" }, body }
    );
    if (!response.ok) {
      throw new Error(`Formbold responded ${response.status}`);
    }
  } catch (error) {
    console.error(error.message);
    return reply(502, "The message could not be delivered.");
  }

  return reply(204);
}
