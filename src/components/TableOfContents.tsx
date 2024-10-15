import React, { useState, useEffect } from "react";
import type Header from "@/interfaces/header";

interface TableOfContentsProps {
  headers: Header[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headers }) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0% -80% 0%" }
    );

    headers.forEach((header) => {
      const element = document.getElementById(header.text.trim());
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headers]);

  return (
    <nav className="table-of-contents bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Contenido
      </h2>
      <ul className="space-y-2">
        {headers.map((header) => (
          <li
            key={header.id}
            style={{ marginLeft: `${(header.level - 1) * 12}px` }}
          >
            <a
              href={`#${header.text.trim()}`}
              className={`block py-1 px-2 text-sm rounded transition-colors duration-200 ${
                activeId === header.text.trim()
                  ? "bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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
