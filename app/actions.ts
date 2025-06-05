"use server"

import { supabase } from "@/lib/supabase"
import { resend } from "@/lib/resend"
import { revalidatePath } from "next/cache"

export async function subscribeToWaitlist(email: string) {
  if (!email || !email.includes("@")) {
    throw new Error("Invalid email address")
  }

  // Check if already subscribed
  const { data: existing, error: selectError } = await supabase
    .from("WaitlistEmails")
    .select("email")
    .eq("email", email)
    .single()

  if (existing) {
    return { success: true }
  }

  if (selectError) {
    console.error("DB Select Error:", selectError)
    throw new Error("Failed to check existing email")
  }

  // Add to Supabase DB
  const { error: insertError } = await supabase.from("WaitlistEmails").insert([{ email }])

  if (insertError) {
    console.error("DB Insert Error:", insertError)
    throw new Error("Failed to save to database")
  }

  // Send email with Resend
  try {
    await resend.emails.send({
      from: "The AniCreators Team <theanicreatorscompany@gmail.com>",
      to: email,
      subject: "Thanks for joining the waitlist!",
      html: `<p>Hi there,</p><p>Thanks for subscribing to AniCreators! You're now on the waitlist and we'll notify you as soon as we launch 🎉</p><p>— The AniCreators Team</p>`,
    })
  } catch (emailError) {
    console.error("Email Error:", emailError)
    // Optional: don't block success if email fails
  }

  revalidatePath("/")
  return { success: true }
}
