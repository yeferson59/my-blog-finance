// src/components/TableOfContents.tsx
import React, { useState, useEffect } from 'react';
import type Header from '@/interfaces/header';

interface TableOfContentsProps {
  headers: Header[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headers }) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -40% 0px' }
    );

    headers.forEach((header) => {
      const element = document.getElementById(header.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headers]);

  return (
    <nav className="hidden lg:block sticky top-24 self-start max-h-[calc(100vh-6rem)] overflow-auto p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Tabla de Contenidos</h2>
      <ul className="space-y-2">
        {headers.map((header) => (
          <li key={header.id} style={{ marginLeft: `${(header.level - 1) * 12}px` }}>
            <a
              href={`#${header.id}`}
              className={`text-sm hover:text-primary-600 dark:hover:text-primary-400 ${activeId === header.id ? 'text-primary-600 dark:text-primary-400 font-medium' : 'text-gray-600 dark:text-gray-300'
                }`}
            >
              {header.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;