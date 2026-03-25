// import Link from 'next/link';
// import { auth, signOut } from '@/auth';
// import { Button } from '@/components/ui/button';
// import { ShoppingBag, User, LogOut } from 'lucide-react';

// export default async function Navbar() {
//   const session = await auth();

//   return (
//     <nav className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md">
//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
//         {/* Logo */}
//         <Link href="/" className="flex items-center space-x-2">
//           <span className="text-2xl font-light tracking-tight text-stone-800">
//             Inkara
//           </span>
//           <span className="text-xs uppercase tracking-widest text-stone-500">
//             Gallery
//           </span>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex md:items-center md:space-x-8">
//           <Link href="/" className="text-sm font-medium text-stone-600 hover:text-stone-900">
//             Home
//           </Link>
//           <Link href="/paintings" className="text-sm font-medium text-stone-600 hover:text-stone-900">
//             Gallery
//           </Link>
//           <Link href="/about" className="text-sm font-medium text-stone-600 hover:text-stone-900">
//             About
//           </Link>
//           <Link href="/contact" className="text-sm font-medium text-stone-600 hover:text-stone-900">
//             Contact
//           </Link>
//         </div>

//         {/* Right Side - Auth & Cart */}
//         <div className="flex items-center gap-4">
//           <Link href="/cart">
//             <Button variant="ghost" size="sm">
//               <ShoppingBag className="h-5 w-5" />
//             </Button>
//           </Link>

//           {session ? (
//             <div className="flex items-center gap-3">
//               {session.user.role === "admin" && (
//                 <Link href="/dashboard">
//                   <Button intent="art" size="sm">
//                     Admin
//                   </Button>
//                 </Link>
//               )}
              
//               <div className="flex items-center gap-2">
//                 {session.user.image ? (
//                   <img
//                     src={session.user.image}
//                     alt={session.user.name || ""}
//                     className="h-8 w-8 rounded-full"
//                   />
//                 ) : (
//                   <div className="h-8 w-8 rounded-full bg-stone-200 flex items-center justify-center">
//                     <User className="h-4 w-4 text-stone-600" />
//                   </div>
//                 )}
//                 <span className="text-sm text-stone-700 hidden lg:block">
//                   {session.user.name || session.user.email}
//                 </span>
//               </div>

//               <form
//                 action={async () => {
//                   "use server"
//                   await signOut({ redirectTo: "/" })
//                 }}
//               >
//                 <Button variant="ghost" size="sm" type="submit">
//                   <LogOut className="h-4 w-4" />
//                 </Button>
//               </form>
//             </div>
//           ) : (
//             <div className="flex items-center gap-2">
//               <Link href="/login">
//                 <Button variant="ghost" size="sm">
//                   Sign In
//                 </Button>
//               </Link>
//               <Link href="/register">
//                 <Button intent="art" size="sm">
//                   Sign Up
//                 </Button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }



// import Link from 'next/link';
// import { auth } from '@/auth';
// import { Button } from '@/components/ui/button';
// import { ShoppingBag, User, LogOut, LayoutDashboard } from 'lucide-react';

// export default async function Navbar() {
//   const session = await auth();

//   return (
//     <nav className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md">
//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
//         {/* Logo */}
//         <Link href="/" className="flex items-center space-x-2">
//           <span className="text-2xl font-light tracking-tight text-stone-800">
//             Inkara
//           </span>
//           <span className="text-xs uppercase tracking-widest text-stone-500">
//             Gallery
//           </span>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex md:items-center md:space-x-8">
//           <Link href="/" className="text-sm font-medium text-stone-600 hover:text-stone-900">
//             Home
//           </Link>
//           <Link href="/paintings" className="text-sm font-medium text-stone-600 hover:text-stone-900">
//             Gallery
//           </Link>
//           <Link href="/about" className="text-sm font-medium text-stone-600 hover:text-stone-900">
//             About
//           </Link>
//           <Link href="/contact" className="text-sm font-medium text-stone-600 hover:text-stone-900">
//             Contact
//           </Link>
//         </div>

//         {/* Right Side - Auth & Cart */}
//         <div className="flex items-center gap-4">
//           <Link href="/cart">
//             <Button variant="ghost" size="sm">
//               <ShoppingBag className="h-5 w-5" />
//             </Button>
//           </Link>

//           {session ? (
//             <div className="flex items-center gap-3">
//               {/* Admin Dashboard Link - Only for admins */}
//               {(session.user.role === "admin" || session.user.email === "your-email@gmail.com") && (
//                 <Link href="/dashboard">
//                   <Button intent="art" size="sm">
//                     <LayoutDashboard className="mr-2 h-4 w-4" />
//                     Admin
//                   </Button>
//                 </Link>
//               )}

//               {/* Profile Link */}
//               <Link href="/profile">
//                 <Button variant="ghost" size="sm" className="flex items-center gap-2">
//                   {session.user.image ? (
//                     <img
//                       src={session.user.image}
//                       alt={session.user.name || ""}
//                       className="h-8 w-8 rounded-full"
//                     />
//                   ) : (
//                     <div className="h-8 w-8 rounded-full bg-stone-200 flex items-center justify-center">
//                       <User className="h-4 w-4 text-stone-600" />
//                     </div>
//                   )}
//                   <span className="hidden lg:block text-sm text-stone-700">
//                     {session.user.name || session.user.email}
//                   </span>
//                 </Button>
//               </Link>

//               <form
//                 action={async () => {
//                   "use server"
//                   const { signOut } = await import("@/auth");
//                   await signOut({ redirectTo: "/" });
//                 }}
//               >
//                 <Button variant="ghost" size="sm" type="submit">
//                   <LogOut className="h-4 w-4" />
//                 </Button>
//               </form>
//             </div>
//           ) : (
//             <div className="flex items-center gap-2">
//               <Link href="/login">
//                 <Button variant="ghost" size="sm">
//                   Sign In
//                 </Button>
//               </Link>
//               <Link href="/register">
//                 <Button intent="art" size="sm">
//                   Sign Up
//                 </Button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }


import Link from 'next/link';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { User, LogOut, LayoutDashboard } from 'lucide-react';
import CartIcon from '@/components/cart/CartIcon';
import CountryCurrencyNavSelector from '@/components/layout/CountryCurrencyNavSelector';
import MobileNavMenu from '@/components/layout/MobileNavMenu';

export default async function Navbar() {
  const session = await auth();
  const cartHref = session ? '/cart' : '/login?callbackUrl=%2Fcart';
  const logoutAction = async () => {
    'use server';
    const { signOut } = await import('@/auth');
    await signOut({ redirectTo: '/' });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#e1c996] bg-[#ffffff]/95 backdrop-blur-md">
      {/* Mobile Navbar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-3 md:hidden">
        <Link href="/" className="shrink-0 text-xl tracking-tight text-[#8a611a]">
          <span className="font-bold">Arushi Kharra</span>{' '}
          <span className="font-light">Art Shop</span>
        </Link>

        <div className="ml-auto w-[130px]">
          <CountryCurrencyNavSelector className="h-8 text-[11px]" />
        </div>

        <MobileNavMenu
          isLoggedIn={!!session}
          isAdmin={session?.user?.role === 'admin'}
          userLabel={session?.user?.name || session?.user?.email || undefined}
          cartHref={cartHref}
          logoutAction={logoutAction}
        />
      </div>

      {/* Desktop Navbar */}
      <div className="mx-auto hidden h-16 max-w-7xl items-center justify-between gap-4 px-6 md:flex lg:px-8">
        <Link href="/" className="flex min-w-0 items-center space-x-2">
          <span className="text-2xl font-bold tracking-tight text-[#8a611a]">Arushi Kharra</span>
          <span className="text-xs uppercase tracking-widest font-light text-[#b1812f]">Art Shop</span>
        </Link>

        <div className="flex items-center space-x-8">
          <Link href="/" className="text-sm font-medium text-[#996d1f] hover:text-[#7a5516]">
            Home
          </Link>
          <Link href="/paintings" className="text-sm font-medium text-[#996d1f] hover:text-[#7a5516]">
            Gallery
          </Link>
          <Link href="/about" className="text-sm font-medium text-[#996d1f] hover:text-[#7a5516]">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-[#996d1f] hover:text-[#7a5516]">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <CountryCurrencyNavSelector className="w-[220px]" />

          <CartIcon
            isLoggedIn={!!session}
            className="relative rounded-full p-2 hover:bg-[#faf6ee]"
            iconClassName="h-5 w-5 text-[#8a611a]"
            badgeClassName="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#d0a24e] text-xs font-bold text-white"
          />

          {session ? (
            <div className="flex items-center gap-3">
              {session.user.role === "admin" && (
                <Link href="/dashboard">
                  <Button intent="art" size="sm" className="border border-[#d0a24e] bg-[#d0a24e] px-3 text-white hover:bg-[#bc8f3d]">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Admin</span>
                  </Button>
                </Link>
              )}
              
              <Link href="/profile">
                <Button variant="ghost" size="sm" className="flex items-center gap-2 px-3 text-[#8a611a] hover:bg-[#faf6ee] hover:text-[#7a5516]">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || ""}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-[#f8efdf] flex items-center justify-center">
                      <User className="h-4 w-4 text-[#8a611a]" />
                    </div>
                  )}
                  <span className="hidden lg:block text-sm text-[#8a611a]">
                    {session.user.name || session.user.email}
                  </span>
                </Button>
              </Link>

              <form
                action={logoutAction}
              >
                <Button variant="ghost" size="sm" type="submit" className="text-[#8a611a] hover:bg-[#faf6ee] hover:text-[#7a5516]">
                  <LogOut className="h-4 w-4" />
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="px-3 text-[#8a611a] hover:bg-[#faf6ee] hover:text-[#7a5516]">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button intent="art" size="sm" className="border border-[#d0a24e] bg-[#d0a24e] px-3 text-white hover:bg-[#bc8f3d]">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
