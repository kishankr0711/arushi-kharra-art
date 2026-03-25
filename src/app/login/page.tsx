import { auth } from "@/auth"
import { redirect } from "next/navigation"
import LoginForm from "@/components/auth/LoginForm"
import Link from "next/link"

interface LoginPageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth()
  const { callbackUrl } = await searchParams
  const redirectTarget = callbackUrl?.startsWith("/") ? callbackUrl : "/"
  
  // Redirect if already logged in
  if (session) {
    redirect(redirectTarget)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm border border-stone-200">
        <h1 className="text-2xl font-light text-stone-900 text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-stone-500 mb-8">Sign in to your account</p>
        
        <LoginForm callbackUrl={redirectTarget} />
        
        <div className="mt-6 text-center text-sm text-stone-500">
          Do not have an account?{" "}
          <Link href="/register" className="text-stone-900 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}
