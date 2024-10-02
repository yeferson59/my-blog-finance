import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import type { User } from 'lucia';
import { z } from 'astro:schema';

interface CommentSectionProps {
  articleId?: string;
  user: User | null;
}

const CommentSchema = z.object({
  id: z.string(),
  post_id: z.number(),
  user_id: z.string(),
  content: z.string(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
  image: z.string(),
  username: z.string().nullable(),
  email: z.string().nullable()
});

type Comment = z.infer<typeof CommentSchema>;

export function CommentSection({ articleId, user }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleComments, setVisibleComments] = useState(5);

  useEffect(() => {
    async function getPosts(articleId: string) {
      const response = await fetch(`/api/comments/${articleId}`);
      if (!response.ok) {
        return;
      }
      const fetchedComments: Comment[] = await response.json();
      setComments(fetchedComments.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    }
    if (articleId) {
      getPosts(articleId);
    }
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '' || !user || !articleId) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          content: newComment,
          postSlug: articleId,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el comentario');
      }

      const newCommentData: Comment = await response.json();
      newCommentData.created_at = new Date(newCommentData.created_at).toLocaleString();
      setComments([newCommentData, ...comments]);
      setNewComment('');
    } catch (error: any) {
      setError(error.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const getAvatarFallback = (name?: string) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  const loadMoreComments = () => {
    setVisibleComments(prevVisible => prevVisible + 5);
  };

  return (
    <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-primary-800 dark:text-primary-200 mb-6">Comentarios</h2>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex items-start mb-4">
            <Avatar className="w-10 h-10 mr-4">
              <AvatarImage src={user.image || ""} alt={user.username || user.email || ""} />
              <AvatarFallback className="bg-secondary-500 text-white">
                {getAvatarFallback(user.username || user.email)}
              </AvatarFallback>
            </Avatar>
            <Textarea
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              rows={3}
              placeholder="Escribe un comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <Button
            type="submit"
            className="bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? 'Publicando...' : 'Publicar Comentario'}
          </Button>
        </form>
      ) : (
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          Por favor, <a href="/auth/signin" className="text-primary-500 hover:underline">inicia sesión</a> para comentar.
        </p>
      )}

      {comments.slice(0, visibleComments).map((comment) => (
        <div key={comment.id} className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-start">
          <Avatar className="w-10 h-10 mr-4">
            <AvatarImage src={comment.image} alt={comment.username ?? ""} />
            <AvatarFallback className="bg-secondary-500 text-white">
              {getAvatarFallback(comment.username || comment.email || "")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-gray-800 dark:text-gray-200">{comment.content}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Por {comment.username || 'Usuario anónimo'} el {new Date(comment.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      ))}

      {comments.length > visibleComments && (
        <Button
          onClick={loadMoreComments}
          className="mt-4 bg-secondary-500 text-white py-2 px-4 rounded-md hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:ring-opacity-50"
        >
          Cargar más comentarios
        </Button>
      )}
    </div>
  );
}