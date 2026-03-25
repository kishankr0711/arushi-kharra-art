import { auth } from "@/auth"
import { redirect } from "next/navigation"
import RegisterForm from "@/components/auth/RegisterForm"
import Link from "next/link"

export default async function RegisterPage() {
  const session = await auth()
  
  if (session) {
    redirect("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm border border-stone-200">
        <h1 className="text-2xl font-light text-stone-900 text-center mb-2">
          Create Account
        </h1>
        <p className="text-center text-stone-500 mb-8">Join Arushi Kharra Art Shop</p>
        
        <RegisterForm />
        
        <div className="mt-6 text-center text-sm text-stone-500">
          Already have an account?{" "}
          <Link href="/login" className="text-stone-900 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
