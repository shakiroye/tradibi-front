"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
//   const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const access_token = localStorage.getItem('access_token');
      if (access_token) {
        setIsLogged(!!access_token);
      }

      const userJSON = localStorage.getItem('user');
      if (userJSON) {
        // Si vous avez besoin de l'utilisateur, vous pouvez le sauvegarder dans un état ici.
      }
    }
  }, []);

//   const logout = async () => {
//     setIsOpen(false);
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('user');
//     setIsLogged(false);
//     await router.push('/login');
//     window.location.reload();
//   };

  return (
    <nav className="bg-transparent p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo de l'application */}
        <div>
          <Link href="/" legacyBehavior>
            <a className="text-lg text-sky-800 font-semibold">Tradibi</a>
          </Link>
        </div>

        {/* Liens de navigation */}
        <ul className="flex space-x-4">
          <li>
            <Link href="/" legacyBehavior>
              <a className="hover:text-gray-300">Accueil</a>
            </Link>
          </li>
          <li>
            <Link href="/announcements" legacyBehavior>
              <a className="hover:text-gray-300">Les annonces</a>
            </Link>
          </li>
          <li>
            <Link href="/create-announcement" legacyBehavior>
              <a className="hover:text-gray-300">Créer une annonce</a>
            </Link>
          </li>
          <li>
            <Link href="/category-announcement" legacyBehavior>
              <a className="hover:text-gray-300">Créer une catégorie</a>
            </Link>
          </li>
          <li>
            <Link href="/type-announcement" legacyBehavior>
              <a className="hover:text-gray-300">Créer les types</a>
            </Link>
          </li>
        </ul>

        {!isLogged ? (
          <Link href="/login" legacyBehavior>
            <a className="tradibi-primary-btn w-fit" style={{ lineHeight: 3 }}>
              Se connecter
            </a>
          </Link>
        ) : (
          <>
            <button
              className="tradibi-primary-btn w-fit"
              onClick={() => setIsOpen(true)}
            >
              🙍‍♂️
            </button>
            {isOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex flex-col justify-center">
                    <Link href="/myaccount" legacyBehavior>
                      <a className="text-center my-5 text-base underline text-sky-800 font-semibold">
                        Mon compte
                      </a>
                    </Link>
                    <button
                      className="tradibi-primary-btn w-fit m-auto"
                    >
                      Se déconnecter
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
