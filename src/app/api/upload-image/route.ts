// import { NextResponse } from 'next/server';
// import { v2 as cloudinary } from 'cloudinary';

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get('image') as File;

//     if (!file) {
//       return NextResponse.json(
//         { error: 'No file uploaded' },
//         { status: 400 }
//       );
//     }

//     // Convert file to base64
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;

//     // Upload to Cloudinary
//     const result = await cloudinary.uploader.upload(base64Image, {
//       folder: 'inkara-gallery',
//       resource_type: 'image',
//       transformation: [
//         { width: 800, height: 1000, crop: 'limit' }, // Resize if too large
//         { quality: 'auto' }, // Auto optimize quality
//       ],
//     });

//     return NextResponse.json({
//       url: result.secure_url,
//       publicId: result.public_id,
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     return NextResponse.json(
//       { error: 'Failed to upload image' },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export async function POST(req: Request) {
  try {
    // Debug: Log what we have
    console.log('Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    console.log('API Key exists:', !!process.env.CLOUDINARY_API_KEY);
    console.log('API Secret exists:', !!process.env.CLOUDINARY_API_SECRET);

    // Check config
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      return NextResponse.json(
        { error: 'Cloud name missing in .env.local' },
        { status: 500 }
      );
    }

    // Configure Cloudinary
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const formData = await req.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file' }, { status: 400 });
    }

    // Convert to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload
    const result = await cloudinary.uploader.upload(base64, {
      folder: 'inkara-gallery',
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error: any) {
    console.error('Full error:', error);
    
    // Check for specific Cloudinary errors
    if (error.message?.includes('cloud_name')) {
      return NextResponse.json(
        { error: 'Invalid cloud name. Check your NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME' },
        { status: 500 }
      );
    }
    
    if (error.message?.includes('Authorization')) {
      return NextResponse.json(
        { error: 'Invalid API key or secret' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Upload failed', details: error.message },
      { status: 500 }
    );
  }
}