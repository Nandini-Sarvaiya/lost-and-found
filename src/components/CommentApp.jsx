import React, { useState } from 'react';

const CommentApp = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = async () => {
    if (!newComment) return;

    try {
      const response = await fetch('/api/addComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: newComment }),
      });

      const data = await response.json();

      if (response.ok) {
        setComments(data.comments); // Update comments state with the new array
        setNewComment(''); // Clear the input field
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      <h1>Comment App</h1>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleAddComment}>Add Comment</button>

      <div className="grid">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            {comment.text}
          </div>
        ))}
      </div>

      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .comment {
          background: #f0f0f0;
          padding: 16px;
          border-radius: 8px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default CommentApp;
