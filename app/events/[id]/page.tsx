import { EventDetailPage } from "@/components/event-detail-page";

type EventPageProps = {
  // 👇 notice the Promise<>
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;        // ✨ unwrap the promise
  return <EventDetailPage eventId={id} />;
}
