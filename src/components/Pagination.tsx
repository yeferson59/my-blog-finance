import React from 'react';
import { Button } from './ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center items-center space-x-2 mt-8">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => window.location.href = `?page=${currentPage - 1}`}
      >
        Anterior
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'default' : 'outline'}
          onClick={() => window.location.href = `?page=${page}`}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => window.location.href = `?page=${currentPage + 1}`}
      >
        Siguiente
      </Button>
    </nav>
  );
};

export default Pagination;