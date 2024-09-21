// src/app/page.tsx
"use client"; // Client-side component

import { useEffect, useState } from 'react';
import AddItemForm from '@/components/AddItemForm';

interface Comment {
  id: number;
  imageId: string;
  description: string;
  name: string;
  contact: string;
  content: string;
}

export default function Page() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch('/api/getComments');
      const data = await response.json();
      setComments(data);
    };

    fetchComments();
  }, []);

  const handleAddComment = async (comment: Comment) => {
    const response = await fetch('/api/addComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });

    const newComment = await response.json();
    setComments((prevComments) => [...prevComments, newComment]);
    setFormVisible(false);
  };

  return (
    <div>
      <button
        onClick={() => setFormVisible((prev) => !prev)}
        className="mb-4 p-2 bg-blue-500 text-white"
      >
        {formVisible ? "Close Form" : "Add Task"}
      </button>

      {formVisible && <AddItemForm onAddComment={handleAddComment} />}

      <div className="grid grid-cols-3 gap-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border p-4">
            <img src={comment.imageId} alt="Uploaded" className="w-full h-auto" />
            <p><strong>Description:</strong> {comment.description}</p>
            <p><strong>Name:</strong> {comment.name}</p>
            <p><strong>Contact:</strong> {comment.contact}</p>
            <p><strong>Comment:</strong> {comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
