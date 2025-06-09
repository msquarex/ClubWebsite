import { EventDetailPage } from "@/components/event-detail-page"

interface EventPageProps {
  params: {
    id: string
  }
}

export default function EventPage({ params }: EventPageProps) {
  return <EventDetailPage eventId={params.id} />
}
