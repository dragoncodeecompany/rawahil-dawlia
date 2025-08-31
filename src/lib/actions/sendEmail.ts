"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  try {
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return {
        success: false,
        error: "Email service is not configured. Please contact administrator.",
      };
    }

    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const message = formData.get("message") as string;

    if (!fullName || !email || !phoneNumber || !message) {
      return { success: false, error: "All fields are required" };
    }

    const { data, error } = await resend.emails.send({
      from: "Rawahel Dawlia <onboarding@resend.dev>",
      to: ["aafify326@gmail.com"],
      subject: `New Contact Form Submission from ${fullName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return {
        success: false,
        error: `Email service error: ${error.message || "Unknown error"}`,
      };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error in sendContactEmail:", error);
    return { success: false, error: "Internal server error" };
  }
}
