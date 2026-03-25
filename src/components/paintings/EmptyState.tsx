import { Button } from '@/components/ui/button';
import { Palette, Plus } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  isAdmin?: boolean;
  message?: string;
}

export default function EmptyState({ 
  isAdmin = false,
  message = "No paintings available."
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 rounded-full bg-stone-100 p-8">
        <Palette className="h-12 w-12 text-stone-400" />
      </div>
      
      <h3 className="text-xl font-medium text-stone-900">
        {message}
      </h3>
      
      <p className="mt-2 max-w-sm text-stone-600">
        {isAdmin 
          ? "Get started by adding your first artwork to the gallery."
          : "Check back soon for new arrivals or try a different category."}
      </p>

      {isAdmin && (
        <Link href="/dashboard/paintings/new" className="mt-6">
          <Button intent="art">
            <Plus className="mr-2 h-4 w-4" />
            Add First Painting
          </Button>
        </Link>
      )}
    </div>
  );
}