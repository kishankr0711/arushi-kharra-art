"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import Link from "next/link"

export default function RegisterForm() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const checkRes = await fetch("/api/auth/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const checkData = await checkRes.json()

      if (checkData.exists) {
        setError("Account already exists. Please login.")
        setLoading(false)
        return
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || data.details || "Registration failed")
        setLoading(false)
        return
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Account created but login failed. Please login manually.")
        setLoading(false)
        return
      }

      router.refresh()
      window.location.href = "/"
    } catch {
      setError("Network error. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" })
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">
            {error}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full rounded-md border border-stone-300 px-4 py-2 focus:border-stone-500 focus:outline-none"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-md border border-stone-300 px-4 py-2 focus:border-stone-500 focus:outline-none"
            placeholder="you@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            minLength={6}
            className="w-full rounded-md border border-stone-300 px-4 py-2 focus:border-stone-500 focus:outline-none"
            placeholder="********"
          />
          <p className="mt-1 text-xs text-stone-500">Minimum 6 characters</p>
          <div className="mt-2 text-right">
            <Link href="/forgot-password" className="text-xs text-stone-700 hover:underline">
              Forgot Password?
            </Link>
          </div>
        </div>
        
        <Button
          type="submit"
          intent="art"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-stone-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-stone-500">Or continue with</span>
        </div>
      </div>

      <Button
        type="button"
        intent="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
      >
        Google
      </Button>
    </div>
  )
}
