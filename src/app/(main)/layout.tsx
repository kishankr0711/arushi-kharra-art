import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { auth } from '@/auth';
import CartOwnerSync from '@/components/cart/CartOwnerSync';

// This layout wraps all public pages
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex flex-col">
      <CartOwnerSync ownerId={session?.user?.id ?? null} />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
