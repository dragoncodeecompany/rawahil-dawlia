"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Languages } from "@/constants/enums";
import { sendContactEmail } from "@/lib/actions/sendEmail";
import { useParams } from "next/navigation";
import { useState } from "react";

function ContactUsForm() {
  const params = useParams();
  const locale = params.locale as string;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        setMessage({
          type: "success",
          text:
            locale === Languages.ARABIC
              ? "تم إرسال الرسالة بنجاح!"
              : "Message sent successfully!",
        });
        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement;
        form?.reset();
      } else {
        setMessage({
          type: "error",
          text:
            locale === Languages.ARABIC
              ? result.error || "فشل في إرسال الرسالة"
              : result.error || "Failed to send message",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text:
          locale === Languages.ARABIC
            ? "حدث خطأ. يرجى المحاولة مرة أخرى."
            : "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="flex-1 bg-[var(--drawing-light)] flex flex-col gap-10 px-4 lg:px-10 py-10 rounded-[20px] min-w-full lg:min-w-[800px] ">
      <h2 className="text-[32px] font font-semibold text-[var(--primary)]">
        {locale === Languages.ARABIC ? "تواصل معنا" : "Get in Touch"}
      </h2>

      {message && (
        <div
          className={`p-3 rounded-md ${
            message.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <form
        id="contact-form"
        action={handleSubmit}
        className="flex flex-col gap-5"
      >
        <Input
          name="fullName"
          type="text"
          placeholder={
            locale === Languages.ARABIC ? "الاسم الكامل" : "Full Name"
          }
          className="bg-white h-10"
          required
        />
        <Input
          name="email"
          type="email"
          placeholder={
            locale === Languages.ARABIC ? "البريد الإلكتروني" : "Email"
          }
          className="bg-white h-10"
          required
        />
        <Input
          name="phoneNumber"
          type="tel"
          placeholder={
            locale === Languages.ARABIC ? "رقم التليفون" : "Phone Number"
          }
          className="bg-white h-10"
          required
        />
        <Textarea
          name="message"
          placeholder={
            locale === Languages.ARABIC
              ? "اكتب رسالتك هنا"
              : "Type your message here"
          }
          className="bg-white min-h-[80px]"
          required
        />
        <Button type="submit" className="h-10" disabled={isSubmitting}>
          {isSubmitting
            ? locale === Languages.ARABIC
              ? "جاري الإرسال..."
              : "Sending..."
            : locale === Languages.ARABIC
            ? "إرسال الآن"
            : "Send Now"}
        </Button>
      </form>
    </div>
  );
}

export default ContactUsForm;
