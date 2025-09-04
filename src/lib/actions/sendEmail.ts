"use server";

import nodemailer from "nodemailer";

export async function sendContactEmail(formData: FormData) {
  try {
    // Check if email configuration is set
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS
    ) {
      console.error("SMTP configuration is missing");
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

    // Create transporter using Hostinger SMTP settings
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: parseInt(process.env.SMTP_PORT || "587") === 465, // true لو 465
      auth: {
        user: process.env.SMTP_USER, // البريد بتاعك
        pass: process.env.SMTP_PASS, // كلمة المرور
      },
    });

    // Email content
    const mailOptions = {
      from: `"Rawahel Dawlia Contact Form" <${process.env.SMTP_USER}>`,
      to: "support@rawaheldawlia.com",
      replyTo: `"${fullName}" <${email}>`,
      subject: `رسالة جديدة من ${fullName} - ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            رسالة جديدة من ${fullName}
          </h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>الاسم:</strong> ${fullName}</p>
            <p style="margin: 10px 0;"><strong>البريد الإلكتروني:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>رقم الهاتف:</strong> ${phoneNumber}</p>
            <p style="margin: 10px 0;"><strong>الرسالة:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 3px; border-left: 4px solid #007bff;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            تم إرسال هذه الرسالة من نموذج الاتصال في موقع رواة الدولية
          </p>
        </div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.messageId);
    return { success: true, data: { messageId: info.messageId } };
  } catch (error) {
    console.error("Error in sendContactEmail:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
  }
}
