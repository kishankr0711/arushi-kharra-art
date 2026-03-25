'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { deletePainting } from '@/app/(admin)/dashboard/actions';

interface DeleteButtonProps {
  id: string;
}

export default function DeleteButton({ id }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (formData: FormData) => {
    if (!confirm('Are you sure you want to delete this painting?')) {
      return;
    }
    setIsDeleting(true);
    await deletePainting(id);
    setIsDeleting(false);
  };

  return (
    <form action={handleDelete}>
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="text-red-600 hover:text-red-700"
        disabled={isDeleting}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </form>
  );
}