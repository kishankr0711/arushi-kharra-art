'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface MobileNavMenuProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  userLabel?: string;
  cartHref: string;
  logoutAction: () => Promise<void>;
}

export default function MobileNavMenu({
  isLoggedIn,
  isAdmin,
  userLabel,
  cartHref,
  logoutAction,
}: MobileNavMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      const target = event.target as Node;
      if (!containerRef.current.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-[#d7bc8a] text-[#6b4d1f] hover:bg-[#f3e7d2]"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-md border border-stone-200 bg-white p-3 shadow-lg">
          <div className="space-y-1">
            <Link href="/" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm text-stone-700 hover:bg-stone-100">
              Home
            </Link>
            <Link href="/paintings" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm text-stone-700 hover:bg-stone-100">
              Gallery
            </Link>
            <Link href="/about" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm text-stone-700 hover:bg-stone-100">
              About
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm text-stone-700 hover:bg-stone-100">
              Contact
            </Link>
            <Link href={cartHref} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm text-stone-700 hover:bg-stone-100">
              Cart
            </Link>
          </div>

          <div className="my-3 border-t border-stone-200" />

          {isLoggedIn ? (
            <div className="space-y-1">
              <p className="px-3 py-1 text-xs text-stone-500">{userLabel || 'Logged in user'}</p>

              {isAdmin && (
                <Link href="/dashboard" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm text-stone-700 hover:bg-stone-100">
                  Admin Dashboard
                </Link>
              )}

              <Link href="/profile" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm text-stone-700 hover:bg-stone-100">
                Profile
              </Link>

              <form action={logoutAction}>
                <button
                  type="submit"
                  className="w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-1">
              <Link href="/login" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm text-stone-700 hover:bg-stone-100">
                Sign In
              </Link>
              <Link href="/register" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm text-stone-700 hover:bg-stone-100">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
