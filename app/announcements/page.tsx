"use client"
import { useEffect, useState } from 'react';


interface Announcement {
  id: string;
  title: string;
  description: string;
  image: string;
  userId: string;
  typeAnnouncementId: string;
  categoryAnnouncementId: string;
}

export default function AnnouncementsList() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const response = await fetch('https://tradibi.netlify.app/api/announcements');
        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data); 
        } else {
          setMessage('Failed to fetch announcements');
        }
      } catch (error: any) {
        setMessage(`Error: ${error.message}`);
      }
    }

    fetchAnnouncements();
  }, []);

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-7xl p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Announcements</h1>
        {message && (
          <div className={`p-4 ${message.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} rounded-md mb-8`}>
            {message}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="bg-white shadow-md rounded-md p-4">
              {announcement.image && (
                <img
                  src={announcement.image}
                  alt={announcement.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h2 className="text-xl font-bold mb-2">{announcement.title}</h2>
              <p className="text-gray-700 mb-4">{announcement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
