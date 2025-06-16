import { GalleryEventPage } from "@/components/gallery-event-page"

interface GalleryPageProps {
  params: {
    id: string
  }
}

export default function GalleryPage({ params }: GalleryPageProps) {
  return <GalleryEventPage galleryId={params.id} />
}
