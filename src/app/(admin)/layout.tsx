// import Link from "next/link";
// import { auth } from "@/auth";
// import { redirect } from "next/navigation";
// import { cookies } from 'next/headers';

// const adminLinks = [
//   { href: "/dashboard", label: "Dashboard" },
//   { href: "/dashboard/paintings", label: "Paintings" },
// ];

// export default async function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   // Check auth
//   const auth = (await cookies()).get('admin-auth');
//   if (!auth || auth.value !== 'true') {
//     redirect('/login');
//   }

//   return (
//     <div className="flex h-screen bg-stone-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r border-stone-200 flex flex-col">
//         <div className="p-6">
//           <h2 className="text-xl font-light text-stone-900">Admin Panel</h2>
//           <p className="text-xs text-stone-500 mt-1">Inkara Gallery</p>
//         </div>
        
//         <nav className="px-4 space-y-1 flex-1">
//           <Link
//             href="/dashboard"
//             className="block rounded-md px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900"
//           >
//             Dashboard
//           </Link>
//           <Link
//             href="/dashboard/paintings"
//             className="block rounded-md px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900"
//           >
//             Paintings
//           </Link>
//         </nav>
        
//         {/* Logout */}
//         <div className="p-4 border-t border-stone-200">
//           <form action="/api/auth/logout" method="POST">
//             <button
//               type="submit"
//               className="w-full text-left text-sm text-red-600 hover:text-red-700"
//             >
//               Logout
//             </button>
//           </form>
//         </div>
//       </aside>
      
//       {/* Main Content */}
//       <main className="flex-1 overflow-auto p-8">
//         {children}
//       </main>
//     </div>
//   );
// }

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/prisma/client';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Palette, 
  ShoppingBag, 
  Users, 
  Settings,
  LogOut 
} from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Check if user is logged in
  if (!session) {
    redirect('/login');
  }

  // Check if user is admin
  if (session.user.role !== 'admin') {
    redirect('/profile');
  }

  // Get stats for sidebar
  const totalPaintings = await prisma.painting.count();

  const adminLinks = [
    { 
      href: '/dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard,
      badge: null 
    },
    { 
      href: '/dashboard/paintings', 
      label: 'Paintings', 
      icon: Palette,
      badge: totalPaintings 
    },
    { 
      href: '/dashboard/orders', 
      label: 'Orders', 
      icon: ShoppingBag,
      badge: 0 
    },
    { 
      href: '/dashboard/users', 
      label: 'Users', 
      icon: Users,
      badge: null 
    },
    { 
      href: '/dashboard/settings', 
      label: 'Settings', 
      icon: Settings,
      badge: null 
    },
  ];

  return (
    <div className="min-h-screen bg-stone-100 md:flex">
      {/* Sidebar */}
      <aside className="w-full bg-white border-b border-stone-200 md:w-64 md:border-b-0 md:border-r md:min-h-screen md:sticky md:top-0 md:self-start">
        <div className="p-4 sm:p-6">
          <Link href="/" className="flex flex-col items-start leading-tight">
            <span className="text-xl font-bold text-stone-900">Arushi Kharra</span>
            <span className="mt-1 whitespace-nowrap text-[11px] font-light uppercase tracking-[0.18em] text-stone-500">
              Art Shop Admin
            </span>
          </Link>
        </div>
        
        <nav className="flex gap-2 overflow-x-auto px-4 pb-4 md:block md:space-y-1 md:overflow-visible md:pb-0">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-w-fit items-center justify-between rounded-md border border-stone-200 px-3 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors md:min-w-0 md:border-0 md:px-4"
            >
              <div className="flex items-center">
                <link.icon className="mr-3 h-4 w-4" />
                {link.label}
              </div>
              {link.badge !== null && (
                <span className="bg-stone-100 text-stone-600 text-xs px-2 py-0.5 rounded-full">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Admin Info */}
        <div className="border-t border-stone-200 p-4">
          <div className="mb-4 flex items-center">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || ""}
                className="h-8 w-8 rounded-full mr-3"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-stone-200 flex items-center justify-center mr-3">
                <span className="text-sm font-medium text-stone-600">
                  {session.user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-stone-900 truncate">
                {session.user.name}
              </p>
              <p className="text-xs text-stone-500 truncate">
                {session.user.email}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Link href="/profile" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                Profile
              </Button>
            </Link>
            <form
              action={async () => {
                "use server"
                const { signOut } = await import("@/auth");
                await signOut({ redirectTo: "/" });
              }}
              className="flex-1"
            >
              <Button variant="ghost" size="sm" type="submit" className="w-full">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </form>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden p-4 sm:p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
