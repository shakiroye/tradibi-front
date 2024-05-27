// pages/Home.tsx
import React from 'react';
const Home: React.FC = () => {

  const imageUrl = "https://cdni.iconscout.com/illustration/premium/thumb/man-searching-real-estate-on-website-7771572-6200858.png?f=webp";

  return (
    <div>
      <main className="container mx-auto">
        <h1 className="text-4xl font-bold mt-16 text-center">Bienvenue sur Tradibi</h1>
        <img src={imageUrl} alt="Image d'accueil" className="w-full" />      </main>
    </div>
  );
};

export default Home;
