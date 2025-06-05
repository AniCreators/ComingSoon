"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Mail, Star, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import CursorEffect from "@/components/cursor-effect"
import FeatureCard from "@/components/feature-card"
import AnimatedText from "@/components/animated-text"
import AnimatedBackground from "@/components/animated-background"
import { subscribeToWaitlist } from "@/app/actions"

export default function ComingSoonPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    
    e.preventDefault()

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await subscribeToWaitlist(email)
      setIsSubscribed(true)
      setEmail("")
      toast({
        title: "Success!",
        description: "You've been added to our waitlist!",
        variant: "default",
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "";
      toast({
        title: "Something went wrong",
        description: `Please try again later ${errorMessage}`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
      <AnimatedBackground />
      <CursorEffect />
      <Toaster />

      <header className="container mx-auto px-4 pt-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Star className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400"
          >
            <i>Ani</i>Creators
          </motion.h1>
        </div>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
            disabled={true}
          >
            Early Access
          </Button>
        </motion.div>
      </header>

      <main className="container mx-auto px-4 pb-24 relative z-10">
        <section className="py-12 md:py-24 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-3xl mx-auto mb-12"
          >
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero-background.png"
                alt="Anime creator silhouette against a dramatic sky"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-8">
                <h2 className="text-white text-2xl font-bold">Where Animation Dreams Come to Life</h2>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="relative">
              <AnimatedText
                text="COMING SOON ..."
                className="text-3xl md:text-5xl font-extrabold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 dark:from-purple-400 dark:via-pink-300 dark:to-orange-300"
              />
              <motion.div
                className="absolute -z-10 inset-0 blur-3xl opacity-20 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 dark:opacity-30"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.2, 0.25, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-700 dark:text-gray-300"
            >
              The ultimate platform for anime creators and fans
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
              onSubmit={handleSubscribe}
            >
              <div className="relative flex-1 max-w-md">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-12 rounded-full border-purple-200 dark:border-purple-800 focus:border-purple-500 focus:ring-purple-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <Button
                type="submit"
                className="h-12 px-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing
                  </span>
                ) : (
                  <>
                    Join Waitlist
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </motion.form>
          </div>
        </section>

        <section className="py-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100"
          >
            Platform Features
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Creator Showcase"
              description="Share your animations and get rewarded by fans who unlock your content using coins."
              imageSrc="/images/creator-community.png"
              delay={0.3}
            />
            <FeatureCard
              title="Hiring Marketplace"
              description="Connect with YouTubers and animation studios looking for talented animators."
              imageSrc="/images/animator-working.png"
              delay={0.4}
            />
            <FeatureCard
              title="Asset Store"
              description="Buy and sell animation assets, templates, and resources to speed up your workflow."
              imageSrc="/images/asset-store.png"
              delay={0.5}
            />
          </div>
        </section>

        <section id="waitlist" className="py-16 max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-purple-100 dark:border-purple-900">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Be the First to Know</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Join our waitlist to get early access and exclusive updates about our platform launch. We are
                    building something special for anime creators and fans alike.
                  </p>

                  <AnimatePresence mode="wait">
                    {isSubscribed ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-green-600 dark:text-green-400"
                      >
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Thanks for subscribing!</span>
                      </motion.div>
                    ) : (
                      <motion.form
                        className="space-y-4"
                        onSubmit={handleSubscribe}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10 h-12 rounded-full border-purple-200 dark:border-purple-800 focus:border-purple-500 focus:ring-purple-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isSubmitting}
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center">
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing
                            </span>
                          ) : (
                            <>
                              Join Waitlist
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>

                <div className="md:w-1/2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className="relative h-[250px] w-full rounded-xl overflow-hidden shadow-lg"
                  >
                    <Image
                      src="/images/thanks.png"
                      alt="Anime creator community"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-8 border-t border-gray-200 dark:border-gray-800 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} AniCreators. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
            >
              Discord
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}