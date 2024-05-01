'use client'
import { useState, useEffect } from 'react';

type Item = {
  id: number;
  title: string;
  points?: number | null;
  user?: string | null;
  time: number;
  time_ago: string;
  comments_count: number;
  type: string;
  url?: string;
  domain?: string;
};

const getItems = (page: number): Promise<Item[]> =>
  fetch(`https://api.hnpwa.com/v0/news/${page}.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    });

const Item = ({ item }: { item: Item }) => (
  <li className="bg-black bg-opacity-80 rounded-lg p-4 border border-gray-700 shadow-lg transform transition duration-500 hover:scale-105">
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 no-underline hover:text-blue-300">
      {item.title}
    </a>
    <div className="text-gray-400 text-sm mt-2">
      <span>{item.points} points</span>
      <span className="mx-2">|</span>
      <span>
        by {item.user} {item.time_ago}
      </span>
      <span className="mx-2">|</span>
      <span>{item.comments_count} comments</span>
    </div>
  </li>
);

const List = ({ page }: { page: number }) => {
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    getItems(page).then(setItems);
  }, [page]);

  if (!items) return <span className="text-gray-400 text-sm">loading...</span>;
  return (
    <ul className="list-none m-0 p-0 grid gap-4">
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default function App() {
  const [page, setPage] = useState(1);

  return (

    <div className="p-4 m-auto text-white" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)', backgroundSize: 'cover', minHeight: '100vh' }}>
      <header className="h-12 max-w-xl m-auto bg-black bg-opacity-70 flex items-center justify-between backdrop-blur-md px-4 rounded-lg">
        <h2>Galactic News</h2>
        <div>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-none border-none text-gray-300 hover:text-gray-200"
          >
            prev
          </button>
          <span className="text-gray-300 text-sm"> {page} / 10 </span>
          <button
            disabled={page >= 10}
            onClick={() => setPage(page + 1)}
            className="bg-none border-none text-gray-300 hover:text-gray-200"
          >
            next
          </button>
        </div>
      </header>
      <div className="p-4 max-w-xl m-auto text-white">
        <List page={page} />
      </div>
      <div className="fixed bottom-4 right-4 bg-black bg-opacity-60 text-xs text-gray-300 p-2 rounded">
        <a href="https://getaprototype.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
          Generated with Prototyper
        </a>
        <span className="mx-2">|</span>
        <a href="https://github.com/getaprototype/starwars-hackernews" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
          Github
        </a>
      </div>
    </div>
  );
}