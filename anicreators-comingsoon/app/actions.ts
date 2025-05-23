"use server"

import { revalidatePath } from "next/cache"

type Subscriber = {
  email: string
  createdAt: Date
}

// In-memory storage for demo purposes
// In a real app, you would use a database
const subscribers: Subscriber[] = []

export async function subscribeToWaitlist(email: string) {
  // Validate email
  if (!email || !email.includes("@")) {
    throw new Error("Invalid email address")
  }

  // Check if email already exists
  if (subscribers.some((sub) => sub.email === email)) {
    // Return success even if already subscribed to prevent email harvesting
    return { success: true }
  }

  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Add to subscribers
    subscribers.push({
      email,
      createdAt: new Date(),
    })

    console.log(`New subscriber: ${email}`)
    console.log(`Total subscribers: ${subscribers.length}`)

    // In a real app, you would save to a database here
    // await db.insert(subscribers).values({ email, createdAt: new Date() })

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Failed to subscribe:", error)
    throw new Error("Failed to subscribe")
  }
}
