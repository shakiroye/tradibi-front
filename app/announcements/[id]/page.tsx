"use client"

import { useEffect, useState } from 'react';
import { useRouter,useParams } from 'next/navigation';

interface Announcement {
  id: string;
  title: string;
  description: string;
  image: string;
  userId: string;
  typeAnnouncementId: string;
  categoryAnnouncementId: string;
}

export default function AnnouncementDetails() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { id } = useParams();


  useEffect(() => {
    if (!id) return;

    async function fetchAnnouncementDetails() {
      try {
        const response = await fetch(`https://tradibi.netlify.app/api/announcements/${id}`);
        if (response.ok) {
          const data = await response.json();
          setAnnouncement(data);
        } else {
          setMessage('Failed to fetch announcement details');
        }
      } catch (error:any) {
        setMessage(`Error: ${error.message}`);
      }
    }

    fetchAnnouncementDetails();
  }, [id]);

  if (!announcement) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white shadow-md rounded-md">
        {message && (
          <div className={`p-4 ${message.includes('Failed') || message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} rounded-md mb-4`}>
            {message}
          </div>
        )}
        {announcement && (
          <>
            <h1 className="text-3xl font-bold mb-4">{announcement.title}</h1>
            {announcement.image && (
              <img
                src={announcement.image}
                alt={announcement.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
            )}
            <p className="text-gray-700 mb-4">{announcement.description}</p>
            
          </>
        )}
      </div>
    </div>
  );
}
