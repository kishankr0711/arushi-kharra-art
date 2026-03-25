import Link from 'next/link';
import { Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg text-stone-900">
              <span className="font-bold">Arushi Kharra</span>{' '}
              <span className="font-light">Art Shop</span>
            </h3>
            <p className="text-sm text-stone-600 max-w-xs">
              An Indian artist who is passionate about paintings.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-stone-600">
              <li><Link href="/paintings" className="hover:text-stone-900">Gallery</Link></li>
              <li><Link href="/about" className="hover:text-stone-900">About the Artist</Link></li>
              <li><Link href="/contact" className="hover:text-stone-900">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
              Connect
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/arushikharra.art/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-stone-400 hover:text-stone-600"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:arushikharra.art@gmail.com"
                aria-label="Email"
                className="text-stone-400 hover:text-stone-600"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-stone-500">
              (c) 2024 Arushi Kharra Art Shop. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
