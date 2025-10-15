import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
	username: "api",
    key: process.env.MAILGUN_TEST_API || "API_KEY",
    // When you have an EU-domain, you must specify the endpoint:
    // url: "https://api.eu.mailgun.net"
});

export async function handler(event) {
	try {
	    const response = await mg.messages.create("sandbox99dd166741d24d1a84bb28e8d8ab9a5f.mailgun.org", {
	      from: "Mailgun Sandbox <postmaster@sandbox99dd166741d24d1a84bb28e8d8ab9a5f.mailgun.org>",
	      to: ["Paul  Trueba <pault.tripwirearts@gmail.com>"],
	      subject: "Hello Paul  Trueba",
	      text: "Congratulations Paul  Trueba, you just sent an email with Mailgun! You are truly awesome!",
	    });

	    console.log(response); // logs response data
	    return {
	      statusCode: 200,
	      body: JSON.stringify({
	        message: "✅ Mail sent successfully!",
	        mailgunId: response.id,
	      }),
	    };
	  } catch (err) {
	    console.log(err); //logs any error
	    return {
	      statusCode: 500,
	      body: JSON.stringify({ success: false, error: err.message || err.toString()}),
	    };
	  }
}
