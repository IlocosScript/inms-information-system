import EventAttendanceClient from './EventAttendanceClient';

interface PageProps {
  params: { eventId: string };
}

export default function EventAttendancePage({ params }: PageProps) {
  return <EventAttendanceClient eventId={params.eventId} />;
}

export async function generateStaticParams() {
  // Replace these IDs with your actual event IDs as needed
  return [
    { eventId: '1' },
    { eventId: '2' },
    { eventId: '3' }
  ];
}