const PLACEHOLDER = '/images/placeholder.jpg';

export function parsePaintingImages(imageField?: string | null): string[] {
  if (!imageField) return [];

  const raw = imageField.trim();
  if (!raw) return [];

  if (raw.startsWith('[')) {
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) {
        return parsed
          .filter((value): value is string => typeof value === 'string')
          .map((value) => value.trim())
          .filter(Boolean)
          .slice(0, 4);
      }
    } catch {
      return [];
    }
  }

  return [raw];
}

export function serializePaintingImages(images: string[]): string {
  const cleaned = images
    .map((url) => url.trim())
    .filter(Boolean)
    .slice(0, 4);

  if (cleaned.length === 0) return PLACEHOLDER;
  if (cleaned.length === 1) return cleaned[0];
  return JSON.stringify(cleaned);
}

export function getPrimaryPaintingImage(imageField?: string | null): string {
  const images = parsePaintingImages(imageField);
  if (images.length === 0) return PLACEHOLDER;
  return images[0];
}

export function getPaintingImagesWithFallback(imageField?: string | null): string[] {
  const images = parsePaintingImages(imageField);
  if (images.length === 0) return [PLACEHOLDER];
  return images;
}
