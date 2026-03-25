import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Get user details from database
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-stone-900">My Profile</h1>
          <p className="mt-2 text-stone-600">Manage your account and view your orders</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          
          {/* User Info Card */}
          <div className="md:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-sm border border-stone-200">
              <div className="flex flex-col items-center text-center">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || ""}
                    className="h-24 w-24 rounded-full mb-4"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-stone-200 flex items-center justify-center mb-4">
                    <span className="text-2xl font-light text-stone-600">
                      {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                
                <h2 className="text-xl font-medium text-stone-900">{user.name}</h2>
                <p className="text-sm text-stone-500">{user.email}</p>
                
                {user.role === "admin" && (
                  <span className="mt-2 inline-flex items-center rounded-full bg-stone-800 px-3 py-1 text-xs font-medium text-white">
                    Administrator
                  </span>
                )}
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Member since</span>
                  <span className="text-stone-900">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {user.role === "admin" && (
                <div className="mt-6 pt-6 border-t border-stone-100">
                  <Link href="/dashboard">
                    <Button intent="art" className="w-full">
                      Go to Admin Dashboard
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Orders Section */}
          <div className="md:col-span-2">
            <div className="rounded-lg bg-white p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-medium text-stone-900 mb-4">My Orders</h3>

              <p className="text-sm text-stone-500 mb-5">
                View full payment history, order details, payment proof and tracking placeholder.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/orders" className="w-full sm:w-auto">
                  <Button intent="art" className="w-full sm:w-auto">
                    View Order History
                  </Button>
                </Link>
                <Link href="/paintings" className="w-full sm:w-auto">
                  <Button intent="outline" className="w-full sm:w-auto">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
