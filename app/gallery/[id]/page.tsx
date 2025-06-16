import { use } from "react";            // 🪄 helps unwrap promises
import { GalleryEventPage } from "@/components/gallery-event-page";

// ✅ v15‑compatible typing
type GalleryPageProps = {
  params: Promise<{ id: string }>;
};

export default function GalleryPage({ params }: GalleryPageProps) {
  const { id } = use(params);          // unwrap without making the component async
  return <GalleryEventPage galleryId={id} />;
}