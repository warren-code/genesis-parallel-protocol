import React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('forum_posts').select('*');
    if (error) console.error(error);
    else setPosts(data);
    setLoading(false);
  };

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div>
      <h1>Forum</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
