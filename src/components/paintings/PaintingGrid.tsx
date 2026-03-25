import { prisma } from '@/prisma/client';
import { Prisma } from '@prisma/client';
import PaintingCard from './PaintingCard';
import EmptyState from './EmptyState';
import { auth } from '@/auth';

interface PaintingGridProps {
  category?: string;
  sort?: string;
  isAdmin?: boolean;
}

export default async function PaintingGrid({ 
  category,
  sort = 'newest',
  isAdmin = false 
}: PaintingGridProps) {
  const session = await auth();
  
  // Build where clause based on filters
  const where: Prisma.PaintingWhereInput = {};
  
  // Category filter (case insensitive)
  if (category && category !== 'all') {
    where.category = {
      equals: category,
      mode: 'insensitive', // Makes it case insensitive
    };
  }
  
  // Only show in stock items for public
  if (!isAdmin) {
    where.inStock = true;
  }

  // Build orderBy based on sort
  let orderBy: Prisma.PaintingOrderByWithRelationInput = { createdAt: 'desc' }; // default newest
  
  if (sort === 'price_asc') {
    orderBy = { price: 'asc' };
  } else if (sort === 'price_desc') {
    orderBy = { price: 'desc' };
  }

  // Fetch from database with filters
  const paintings = await prisma.painting.findMany({
    where,
    orderBy,
  });

  // Empty state
  if (!paintings || paintings.length === 0) {
    return (
      <EmptyState 
        isAdmin={isAdmin} 
        message={
          category 
            ? `No ${category} paintings available.` 
            : "No paintings available."
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {paintings.map((painting) => (
        <PaintingCard 
          key={painting.id} 
          painting={painting} 
          isAdmin={isAdmin}
          userId={session?.user?.id ?? null}
        />
      ))}
    </div>
  );
}
