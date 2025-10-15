// file: netlify/functions/send-email.js
import Mailgun from "mailgun.js";
import formData from "form-data";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body || "{}");

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `Nothing Contact Form <mailgun@${process.env.MAILGUN_DOMAIN}>`,
      to: ["pault.tripwirearts@gmail.com"],
      subject: `New message from ${name}`,
      text: `${message}\n\nReply to: ${email}`,
    });

    console.log("Mailgun response:", response);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id: response.id }),
    };
  } catch (err) {
    console.error("Mailgun error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: err.message,
      }),
    };
  }
};
