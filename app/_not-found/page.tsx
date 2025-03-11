'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Introuvable</h1>
      <p className="text-lg text-gray-500 mt-2">Désolé, la page que vous cherchez n'existe pas.</p>
      <Link href="/">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition">
          Retour à l'accueil
        </button>
      </Link>
    </div>
  );
}
