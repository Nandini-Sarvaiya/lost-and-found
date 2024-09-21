// src/components/AddItemForm.tsx
"use client"; // Client-side component

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface AddItemFormProps {
  onAddComment: (comment: { id: number; imageId: string; description: string; name: string; contact: string; content: string }) => void; // Adjust based on your comment structure
}

export default function AddItemForm({ onAddComment }: AddItemFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [comment, setComment] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const uploadImage = async () => {
    if (!imageFile) return null;
    const formData = new FormData();
    formData.append('file', imageFile);
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      return result.filename; // Ensure this returns the correct image path
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const uploadedImageId = await uploadImage();

    if (uploadedImageId) {
      onAddComment({ 
        id: Date.now(), 
        imageId: uploadedImageId, 
        description, 
        name, 
        contact, 
        content: comment 
      });
      // Reset form fields
      setImageFile(null);
      setDescription('');
      setName('');
      setContact('');
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <Label htmlFor="image">Upload Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="name">Your Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="contact">Contact Information</Label>
        <Input
          id="contact"
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="comment">Add Comment</Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className="flex justify-between">
        <Button type="submit">Add Item & Comment</Button>
        <Button type="button" onClick={() => { 
          setImageFile(null); 
          setDescription(''); 
          setName(''); 
          setContact(''); 
          setComment(''); 
        }}>Cancel</Button>
      </div>
    </form>
  );
}
