import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
	username: "api",
	key: process.env.MAILGUN_API_KEY,
});

export async function handler(event) {
	if (event.httpMethod !== "POST") {
		return {
			statusCode: 405,
			body: JSON.stringify({ error: "Method not allowed" }),
		}
	} 

	try {
		const { name, email, message } = JSON.parse(event.body);

		const result = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
			from: `Nothing Contact Form <mailgun@${process.env.MAILGUN_DOMAIN}>`,
			to: ["pault.tripwirearts@gmail.com"],
			subject: `New message from ${name}`,
			text: `${message}\n\nReply to: ${email}`,
		});

		console.log("Mailgun response: ", result);

		return {
			statusCode: 200,
			body: JSON.stringify({ success: true }),
		};
	} catch (err) {
		console.error("Mailgun error: ", err);
		return {
			statusCode: 500,
			body: JSON.stringify({ success: false, error: err.message }),
		};
	}
}
