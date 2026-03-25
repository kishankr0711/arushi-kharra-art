'use server';

// import { prisma } from '@/prisma/client';
import { prisma } from "../../../../prisma/client";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v2 as cloudinary } from 'cloudinary';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { serializePaintingImages } from '@/lib/painting-images';

// CREATE - Add new painting
export async function createPainting(formData: FormData) {
  try {
    const images = [
      (formData.get('image1') as string) || '',
      (formData.get('image2') as string) || '',
      (formData.get('image3') as string) || '',
      (formData.get('image4') as string) || '',
    ];

    await prisma.painting.create({
      data: {
        title: formData.get('title') as string,
        artist: formData.get('artist') as string,
        price: parseFloat(formData.get('price') as string),
        image: serializePaintingImages(images),
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        dimensions: formData.get('dimensions') as string,
        year: parseInt(formData.get('year') as string),
        isFeatured: formData.get('isFeatured') === 'on',
        inStock: formData.get('inStock') === 'on',
      },
    });

    revalidatePath('/paintings');
    revalidatePath('/dashboard/paintings');
    redirect('/dashboard/paintings'); 
  } catch (error) {
    return { error: 'Failed to create painting' };
  }
}

// READ - Get all paintings
export async function getPaintings() {
  try {
    const paintings = await prisma.painting.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return { paintings };
  } catch (error) {
    return { error: 'Failed to fetch paintings', paintings: [] };
  }
}

// READ - Get single painting
export async function getPainting(id: string) {
  try {
    const painting = await prisma.painting.findUnique({
      where: { id },
    });
    return { painting };
  } catch (error) {
    return { error: 'Failed to fetch painting', painting: null };
  }
}

// UPDATE - Update painting
export async function updatePainting(id: string, formData: FormData) {
  try {
    const images = [
      (formData.get('image1') as string) || '',
      (formData.get('image2') as string) || '',
      (formData.get('image3') as string) || '',
      (formData.get('image4') as string) || '',
    ];

    await prisma.painting.update({
      where: { id },
      data: {
        title: formData.get('title') as string,
        artist: formData.get('artist') as string,
        price: parseFloat(formData.get('price') as string),
        image: serializePaintingImages(images),
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        dimensions: formData.get('dimensions') as string,
        year: parseInt(formData.get('year') as string),
        isFeatured: formData.get('isFeatured') === 'on',
        inStock: formData.get('inStock') === 'on',
      },
    });

    revalidatePath('/paintings');
    revalidatePath('/dashboard/paintings');
    revalidatePath(`/`);
    redirect('/dashboard/paintings');
  } catch (error) {
    return { error: 'Failed to update painting' };
  }
}

// DELETE - Delete painting
export async function deletePainting(id: string) {
  try {
    await prisma.painting.delete({
      where: { id },
    });

    revalidatePath('/paintings');
    revalidatePath('/dashboard/paintings');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete painting' };
  }
}

// TOGGLE FEATURED - Quick action
export async function toggleFeatured(id: string, isFeatured: boolean) {
  try {
    await prisma.painting.update({
      where: { id },
      data: { isFeatured: !isFeatured },
    });

    revalidatePath('/paintings');
    revalidatePath('/');
    revalidatePath('/dashboard/paintings');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to update' };
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get('image') as File;
    
    if (!file || file.size === 0) {
      return { error: 'No file uploaded' };
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create temporary file
    const tempFile = join(tmpdir(), file.name);
    await writeFile(tempFile, buffer);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(tempFile, {
      folder: 'inkara-gallery',
      resource_type: 'image',
    });

    return { url: result.secure_url };
  } catch (error) {
    console.error('Upload error:', error);
    return { error: 'Failed to upload image' };
  }
}


// 'use server';

// import { prisma } from '@/prisma/client';  // Or use direct import below
// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';

// // Alternative: Direct import (if above doesn't work)
// // import { PrismaClient } from '@prisma/client';
// // const prisma = new PrismaClient();

// // CREATE - Add new painting
// export async function createPainting(formData: FormData) {
//   try {
//     const painting = await prisma.painting.create({
//       data: {
//         title: formData.get('title') as string,
//         artist: formData.get('artist') as string,
//         price: parseFloat(formData.get('price') as string),
//         image: formData.get('image') as string || '/images/placeholder.jpg',
//         description: formData.get('description') as string,
//         category: formData.get('category') as string,
//         dimensions: formData.get('dimensions') as string,
//         year: parseInt(formData.get('year') as string),
//         isFeatured: formData.get('isFeatured') === 'on',
//         inStock: formData.get('inStock') === 'on',
//       },
//     });

//     revalidatePath('/paintings');
//     revalidatePath('/dashboard/paintings');
//     redirect('/dashboard/paintings');
//   } catch (error) {
//     console.error('Create painting error:', error);
//     return { error: 'Failed to create painting' };
//   }
// }

// // READ - Get all paintings
// export async function getPaintings() {
//   try {
//     const paintings = await prisma.painting.findMany({
//       orderBy: { createdAt: 'desc' },
//     });
//     return { paintings };
//   } catch (error) {
//     console.error('Get paintings error:', error);
//     return { error: 'Failed to fetch paintings', paintings: [] };
//   }
// }

// // READ - Get single painting
// export async function getPainting(id: string) {
//   try {
//     const painting = await prisma.painting.findUnique({
//       where: { id },
//     });
//     return { painting };
//   } catch (error) {
//     console.error('Get painting error:', error);
//     return { error: 'Failed to fetch painting', painting: null };
//   }
// }

// // UPDATE - Update painting
// export async function updatePainting(id: string, formData: FormData) {
//   try {
//     await prisma.painting.update({
//       where: { id },
//       data: {
//         title: formData.get('title') as string,
//         artist: formData.get('artist') as string,
//         price: parseFloat(formData.get('price') as string),
//         image: formData.get('image') as string,
//         description: formData.get('description') as string,
//         category: formData.get('category') as string,
//         dimensions: formData.get('dimensions') as string,
//         year: parseInt(formData.get('year') as string),
//         isFeatured: formData.get('isFeatured') === 'on',
//         inStock: formData.get('inStock') === 'on',
//       },
//     });

//     revalidatePath('/paintings');
//     revalidatePath('/dashboard/paintings');
//     revalidatePath('/');
//     redirect('/dashboard/paintings');
//   } catch (error) {
//     console.error('Update painting error:', error);
//     return { error: 'Failed to update painting' };
//   }
// }

// // DELETE - Delete painting
// export async function deletePainting(id: string) {
//   try {
//     await prisma.painting.delete({
//       where: { id },
//     });

//     revalidatePath('/paintings');
//     revalidatePath('/dashboard/paintings');
//     revalidatePath('/');
//     return { success: true };
//   } catch (error) {
//     console.error('Delete painting error:', error);
//     return { error: 'Failed to delete painting' };
//   }
// }

// // TOGGLE FEATURED - Quick action
// export async function toggleFeatured(id: string, isFeatured: boolean) {
//   try {
//     await prisma.painting.update({
//       where: { id },
//       data: { isFeatured: !isFeatured },
//     });

//     revalidatePath('/paintings');
//     revalidatePath('/');
//     revalidatePath('/dashboard/paintings');
//     return { success: true };
//   } catch (error) {
//     console.error('Toggle featured error:', error);
//     return { error: 'Failed to update' };
//   }
// }
