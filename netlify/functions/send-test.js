import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

const API = "d20ada7684032757ebad3086e8f528a0-5e1ffd43-f63cfd03";

async function sendSimpleMessage() {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || API,
    // When you have an EU-domain, you must specify the endpoint:
    // url: "https://api.eu.mailgun.net"
  });
  try {
    const data = await mg.messages.create("sandbox99dd166741d24d1a84bb28e8d8ab9a5f.mailgun.org", {
      from: "Mailgun Sandbox <postmaster@sandbox99dd166741d24d1a84bb28e8d8ab9a5f.mailgun.org>",
      to: ["Paul  Trueba <pault.tripwirearts@gmail.com>"],
      subject: "Hello Paul  Trueba",
      text: "Congratulations Paul  Trueba, you just sent an email with Mailgun! You are truly awesome!",
    });

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}
