import "./globals.css"
import { GeistSans } from "geist/font/sans"
import { Toaster } from "@/components/ui/toaster"
import type React from "react" // Import React

export const metadata = {
  title: "Bug Crusher Registration 2024",
  description: "Registration form for Bug Crusher Competition 2024",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bug Crusher Registration 2024</h1>
            <p className="mt-2 text-lg text-gray-600">National Junior Hackathon Year 2024</p>
          </div>
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  )
}

