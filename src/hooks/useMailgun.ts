import React, { useState } from "react";

export const useMailgun = () => {
	const [mailSending, setMailSending] = useState(false);
	const [status, setStatus] = useState("");

	const fetchMailgun = async (body: any) => {
		setMailSending(true);
		try {
			const res = await fetch("/.netlify/functions/send-email", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(body),
			});

			const data = await res.json;
			setMailSending(false);
			setStatus(data.success ? "Message Sent" : "Failed to Send Message");
		} catch (err) {
			setMailSending(false);
			setStatus("Network Error");
		}
	}

	const fetchTestMailgun = async (body: any) => {
		console.log("fetch mailgun");
		setMailSending(true);
		try {
			const res = await fetch("/.netlify/functions/send-email", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(body),
			});

			const data = await res.json;
			setMailSending(false);
			setStatus(data.success ? "Message Sent" : "Failed to Send Message");
		} catch (err) {
			setMailSending(false);
			setStatus("Network Error");
		}
	}

	return {
		mailSending,
		status,
    	fetchMailgun,
    	fetchTestMailgun,
    	setStatus,
    };
}