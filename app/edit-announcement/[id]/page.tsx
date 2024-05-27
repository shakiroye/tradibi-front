"use client"
import { useEffect, useState } from 'react';
import { useRouter,useParams } from 'next/navigation';

export default function Page() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [userId, setUserId] = useState('');
  const [typeAnnouncementId, setTypeAnnouncementId] = useState('');
  const [categoryAnnouncementId, setCategoryAnnouncementId] = useState('');
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    // Fetch types and categories
    async function fetchTypesAndCategories() {
      try {
        const [typesRes, categoriesRes] = await Promise.all([
          fetch('https://tradibi.netlify.app/api/type-announcements'),
          fetch('https://tradibi.netlify.app/api/category-announcements'),
        ]);

        const [typesData, categoriesData] = await Promise.all([
          typesRes.json(),
          categoriesRes.json(),
        ]);

        setTypes(typesData);
        setCategories(categoriesData);
      } catch (error:any) {
        setMessage(`Error fetching types or categories: ${error.message}`);
      }
    }

    fetchTypesAndCategories();

    // Retrieve userId from localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }

    // Fetch the announcement details
    async function fetchAnnouncementDetails() {
      try {
        const response = await fetch(`https://tradibi.netlify.app/api/announcements/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setDescription(data.description);
          setTypeAnnouncementId(data.typeAnnouncementId);
          setCategoryAnnouncementId(data.categoryAnnouncementId);
          // Assume image URL is stored, set it if available
          setImage(data.image ? data.image : null);
        } else {
          setMessage('Failed to fetch announcement details');
        }
      } catch (error:any) {
        setMessage(`Error: ${error.message}`);
      }
    }

    fetchAnnouncementDetails();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    
    let urlImage = "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    
    let parsedId =Number(userId)
    let parsedType =Number(typeAnnouncementId)
    let parsedCategory =Number(categoryAnnouncementId)

    const dataToSend = {
      "title": title,
      "description": description,
      "image": urlImage,
      "userId": parsedId,
      "typeAnnouncementId": parsedType,
      "categoryAnnouncementId": parsedCategory
    }

    try {
      const response = await fetch(`https://tradibi.netlify.app/api/announcements/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setMessage('Announcement updated successfully!');
        router.push('/announcements'); // redirect to the announcements list
      } else {
        const data = await response.json();
        setMessage(`Failed to update announcement: ${data.message}`);
      }
    } catch (error:any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-center">Edit Announcement</h1>
        {message && (
          <div className={`p-4 ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded-md`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label htmlFor="typeAnnouncementId" className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              id="typeAnnouncementId"
              value={typeAnnouncementId}
              onChange={(e) => setTypeAnnouncementId(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Select a type</option>
              {types.map((type: any) => (
                <option key={type.id} value={type.id}>
                  {type.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="categoryAnnouncementId" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="categoryAnnouncementId"
              value={categoryAnnouncementId}
              onChange={(e) => setCategoryAnnouncementId(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Select a category</option>
              {categories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Update Announcement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
