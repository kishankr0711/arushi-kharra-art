// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { uploadImage } from '@/app/(admin)/dashboard/actions';

// interface PaintingFormProps {
//   action: (formData: FormData) => Promise<void>;
// }

// function SubmitButton() {
//   const { pending } = useFormStatus();
//   return (
//     <Button type="submit" intent="art" className="w-full" disabled={pending}>
//       {pending ? 'Saving...' : 'Save Painting'}
//     </Button>
//   );
// }

// export default function PaintingForm({ action }: PaintingFormProps) {
//   const [previewUrl, setPreviewUrl] = useState<string>('');
//   const [uploading, setUploading] = useState(false);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setUploading(true);
    
//     // Show local preview immediately
//     const localUrl = URL.createObjectURL(file);
//     setPreviewUrl(localUrl);

//     // Upload to Cloudinary
//     const formData = new FormData();
//     formData.append('image', file);
    
//     const result = await uploadImage(formData);
    
//     if (result.url) {
//       // Store the Cloudinary URL in a hidden input
//       const hiddenInput = document.getElementById('image-url') as HTMLInputElement;
//       if (hiddenInput) hiddenInput.value = result.url;
//     }
    
//     setUploading(false);
//   };

//   return (
//     <form action={action} className="space-y-6 max-w-2xl">
      
//       {/* Image Upload */}
//       <div className="space-y-2">
//         <label className="text-sm font-medium text-stone-700">
//           Painting Image
//         </label>
        
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="block w-full text-sm text-stone-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200"
//         />
        
//         {uploading && <p className="text-sm text-stone-500">Uploading...</p>}
        
//         {/* Hidden input to store Cloudinary URL */}
//         <input type="hidden" id="image-url" name="image" />
        
//         {/* Preview */}
//         {previewUrl && (
//           <div className="mt-4 aspect-video relative rounded-lg overflow-hidden bg-stone-100">
//             {/* eslint-disable-next-line @next/next/no-img-element */}
//             <img 
//               src={previewUrl} 
//               alt="Preview" 
//               className="object-cover w-full h-full"
//             />
//           </div>
//         )}
//       </div>

//       {/* Rest of your form fields... */}
//       {/* title, artist, price, etc. */}

//       <SubmitButton />
//     </form>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import { useFormStatus } from 'react-dom';
// import { Button } from '@/components/ui/button';

// interface PaintingFormProps {
//   painting?: any;
//   action: (formData: FormData) => Promise<void>;
// }

// function SubmitButton({ isEditing }: { isEditing: boolean }) {
//   const { pending } = useFormStatus();
  
//   return (
//     <Button 
//       type="submit" 
//       intent="art" 
//       className="w-full"
//       disabled={pending}
//     >
//       {pending ? 'Saving...' : isEditing ? 'Update Painting' : 'Create Painting'}
//     </Button>
//   );
// }

// export default function PaintingForm({ painting, action }: PaintingFormProps) {
//   const isEditing = !!painting;
//   const [previewUrl, setPreviewUrl] = useState<string>(painting?.image || '');

//   return (
//     <form action={action} className="space-y-6 max-w-2xl bg-white p-6 rounded-lg border border-stone-200">
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        
//         {/* Title */}
//         <div className="space-y-2">
//           <label htmlFor="title" className="text-sm font-medium text-stone-700">
//             Title *
//           </label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             required
//             defaultValue={painting?.title || ''}
//             className="w-full rounded-md border border-stone-300 px-4 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
//             placeholder="Sunset Harmony"
//           />
//         </div>

//         {/* Artist */}
//         <div className="space-y-2">
//           <label htmlFor="artist" className="text-sm font-medium text-stone-700">
//             Artist *
//           </label>
//           <input
//             type="text"
//             id="artist"
//             name="artist"
//             required
//             defaultValue={painting?.artist || ''}
//             className="w-full rounded-md border border-stone-300 px-4 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
//             placeholder="Elena Vance"
//           />
//         </div>

//         {/* Price */}
//         <div className="space-y-2">
//           <label htmlFor="price" className="text-sm font-medium text-stone-700">
//             Price ($) *
//           </label>
//           <input
//             type="number"
//             id="price"
//             name="price"
//             required
//             min="0"
//             step="0.01"
//             defaultValue={painting?.price || ''}
//             className="w-full rounded-md border border-stone-300 px-4 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
//             placeholder="1200"
//           />
//         </div>

//         {/* Year */}
//         <div className="space-y-2">
//           <label htmlFor="year" className="text-sm font-medium text-stone-700">
//             Year *
//           </label>
//           <input
//             type="number"
//             id="year"
//             name="year"
//             required
//             min="1900"
//             max={new Date().getFullYear()}
//             defaultValue={painting?.year || new Date().getFullYear()}
//             className="w-full rounded-md border border-stone-300 px-4 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
//           />
//         </div>

//         {/* Category */}
//         <div className="space-y-2">
//           <label htmlFor="category" className="text-sm font-medium text-stone-700">
//             Category *
//           </label>
//           <select
//             id="category"
//             name="category"
//             required
//             defaultValue={painting?.category || 'oil'}
//             className="w-full rounded-md border border-stone-300 px-4 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
//           >
//             <option value="oil">Oil</option>
//             <option value="watercolor">Watercolor</option>
//             <option value="acrylic">Acrylic</option>
//             <option value="digital">Digital</option>
//           </select>
//         </div>

//         {/* Dimensions */}
//         <div className="space-y-2">
//           <label htmlFor="dimensions" className="text-sm font-medium text-stone-700">
//             Dimensions *
//           </label>
//           <input
//             type="text"
//             id="dimensions"
//             name="dimensions"
//             required
//             defaultValue={painting?.dimensions || ''}
//             className="w-full rounded-md border border-stone-300 px-4 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
//             placeholder="24x36 inches"
//           />
//         </div>
//       </div>

//       {/* Image URL */}
//       <div className="space-y-2">
//         <label htmlFor="image" className="text-sm font-medium text-stone-700">
//           Image URL
//         </label>
//         <input
//           type="url"
//           id="image"
//           name="image"
//           defaultValue={painting?.image || ''}
//           onChange={(e) => setPreviewUrl(e.target.value)}
//           className="w-full rounded-md border border-stone-300 px-4 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
//           placeholder="https://example.com/image.jpg"
//         />
//         <p className="text-xs text-stone-500">
//           Leave empty to use placeholder image
//         </p>
        
//         {/* Preview */}
//         {previewUrl && (
//           <div className="mt-4 aspect-video relative rounded-lg overflow-hidden bg-stone-100 max-w-sm">
//             <img 
//               src={previewUrl} 
//               alt="Preview" 
//               className="object-cover w-full h-full"
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
//               }}
//             />
//           </div>
//         )}
//       </div>

//       {/* Description */}
//       <div className="space-y-2">
//         <label htmlFor="description" className="text-sm font-medium text-stone-700">
//           Description *
//         </label>
//         <textarea
//           id="description"
//           name="description"
//           required
//           rows={4}
//           defaultValue={painting?.description || ''}
//           className="w-full rounded-md border border-stone-300 px-4 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
//           placeholder="Describe the artwork..."
//         />
//       </div>

//       {/* Checkboxes */}
//       <div className="flex gap-6">
//         <label className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             name="isFeatured"
//             defaultChecked={painting?.isFeatured || false}
//             className="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-500"
//           />
//           <span className="text-sm text-stone-700">Featured on homepage</span>
//         </label>

//         <label className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             name="inStock"
//             defaultChecked={painting?.inStock ?? true}
//             className="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-500"
//           />
//           <span className="text-sm text-stone-700">In Stock</span>
//         </label>
//       </div>

//       <SubmitButton isEditing={isEditing} />
//     </form>
//   );  
// }

'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import ImageUpload from './ImageUpload';
import { parsePaintingImages } from '@/lib/painting-images';

interface PaintingFormProps {
  painting?: {
    image?: string;
    title?: string;
    artist?: string;
    price?: number;
    year?: number;
    category?: 'oil' | 'watercolor' | 'acrylic' | 'digital';
    dimensions?: string;
    description?: string;
    isFeatured?: boolean;
    inStock?: boolean;
  };
  action: (formData: FormData) => Promise<void>;
}

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  
  return (
    <Button 
      type="submit" 
      intent="art" 
      className="w-full"
      disabled={pending}
    >
      {pending ? 'Saving...' : isEditing ? 'Update Painting' : 'Create Painting'}
    </Button>
  );
}

export default function PaintingForm({ painting, action }: PaintingFormProps) {
  const isEditing = !!painting;
  const existingImages = parsePaintingImages(painting?.image);
  const [imageUrls, setImageUrls] = useState<string[]>([
    existingImages[0] || '',
    existingImages[1] || '',
    existingImages[2] || '',
    existingImages[3] || '',
  ]);

  const setImageAtIndex = (index: number, url: string) => {
    setImageUrls((prev) => {
      const next = [...prev];
      next[index] = url;
      return next;
    });
  };

  return (
    <form action={action} className="space-y-6 w-full max-w-2xl rounded-lg border border-stone-200 bg-white p-4 sm:p-6">
      
      {/* Image Upload Section */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-stone-700">
          Painting Images (up to 4)
        </label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="space-y-2 rounded-md border border-stone-200 p-3">
              <p className="text-xs font-medium text-stone-600">Image {index + 1}</p>
              <ImageUpload
                onImageUpload={(url) => setImageAtIndex(index, url)}
                defaultImage={imageUrls[index]}
              />
              <input
                type="hidden"
                name={`image${index + 1}`}
                value={imageUrls[index]}
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-stone-500">
          Upload up to 4 images. If none are uploaded, placeholder image will be used.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        
        {/* Title */}
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-stone-700">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={painting?.title || ''}
            className="w-full rounded-md border border-stone-300 px-4 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
            placeholder="Sunset Harmony"
          />
        </div>

        {/* Artist */}
        <div className="space-y-2">
          <label htmlFor="artist" className="text-sm font-medium text-stone-700">
            Artist *
          </label>
          <input
            type="text"
            id="artist"
            name="artist"
            required
            defaultValue={painting?.artist || ''}
            className="w-full rounded-md border border-stone-300 px-4 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
            placeholder="Elena Vance"
          />
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label htmlFor="price" className="text-sm font-medium text-stone-700">
            Price (INR) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            required
            min="0"
            step="0.01"
            defaultValue={painting?.price || ''}
            className="w-full rounded-md border border-stone-300 px-4 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
            placeholder="50000"
          />
        </div>

        {/* Year */}
        <div className="space-y-2">
          <label htmlFor="year" className="text-sm font-medium text-stone-700">
            Year *
          </label>
          <input
            type="number"
            id="year"
            name="year"
            required
            min="1900"
            max={new Date().getFullYear()}
            defaultValue={painting?.year || new Date().getFullYear()}
            className="w-full rounded-md border border-stone-300 px-4 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium text-stone-700">
            Category *
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={painting?.category || 'oil'}
            className="w-full rounded-md border border-stone-300 px-4 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
          >
            <option value="oil">Oil</option>
            <option value="watercolor">Watercolor</option>
            <option value="acrylic">Acrylic</option>
            <option value="digital">Digital</option>
          </select>
        </div>

        {/* Dimensions */}
        <div className="space-y-2">
          <label htmlFor="dimensions" className="text-sm font-medium text-stone-700">
            Dimensions *
          </label>
          <input
            type="text"
            id="dimensions"
            name="dimensions"
            required
            defaultValue={painting?.dimensions || ''}
            className="w-full rounded-md border border-stone-300 px-4 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
            placeholder="24x36 inches"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-stone-700">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={painting?.description || ''}
          className="w-full rounded-md border border-stone-300 px-4 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
          placeholder="Describe the artwork..."
        />
      </div>

      {/* Checkboxes */}
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            defaultChecked={painting?.isFeatured || false}
            className="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-500"
          />
          <span className="text-sm text-stone-700">Featured on homepage</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="inStock"
            defaultChecked={painting?.inStock ?? true}
            className="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-500"
          />
          <span className="text-sm text-stone-700">In Stock</span>
        </label>
      </div>

      <SubmitButton isEditing={isEditing} />
    </form>
  );
}
