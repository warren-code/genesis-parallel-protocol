import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface DiscussionForumProps {
  courseId: string;
  userId: string;
}

function DiscussionForum({ courseId, userId }: DiscussionForumProps) {
    const [forum, setForum] = useState<any>(null);
    const [posts, setPosts] = useState<any[]>([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });

    useEffect(() => {
        const fetchForum = async () => {
            // Fetch or create forum for this course
            const { data: forumData, error: forumError } = await supabase
                .from('discussion_forums')
                .select('*')
                .eq('course_id', courseId)
                .single();

            if (forumError && forumError.code === 'PGRST116') {
                // Forum doesn't exist, create it
                const { data: newForum, error: createError } = await supabase
                    .from('discussion_forums')
                    .insert({
                        course_id: courseId,
                        title: 'Course Discussion',
                        description: 'Discuss course content and ask questions'
                    })
                    .select()
                    .single();

                if (createError) console.error('Error creating forum:', createError);
                else setForum(newForum);
            }

            setForum(forumData);

            // Fetch posts
            if (forumData) {
                const { data: postsData, error: postsError } = await supabase
                    .from('forum_posts')
                    .select('*, users(full_name)')
                    .eq('forum_id', forumData.id)
                    .is('parent_post_id', null)
                    .order('created_at', { ascending: false });

                if (postsError) console.error('Error fetching posts:', postsError);
                else setPosts(postsData);
            }
        };

        fetchForum();
    }, [courseId]);

    const createPost = async () => {
        if (!newPost.title || !newPost.content) {
            alert('Please fill in all fields');
            return;
        }

        const { data, error } = await supabase
            .from('forum_posts')
            .insert({
                forum_id: forum.id,
                author_id: userId,
                title: newPost.title,
                content: newPost.content
            })
            .select('*, users(full_name)')
            .single();

        if (error) console.error('Error creating post:', error);
        else {
            setPosts([data, ...posts]);
            setNewPost({ title: '', content: '' });
        }
    };

    return (
        <div>
            <h3>Discussion Forum</h3>
            
            <div className="create-post">
                <h4>Create New Post</h4>
                <input
                    type="text"
                    placeholder="Post Title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
                <textarea
                    placeholder="Post Content"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={4}
                />
                <button onClick={createPost}>Post</button>
            </div>

            <div className="posts-list">
                <h4>Recent Posts</h4>
                {posts.map(post => (
                    <div key={post.id} className="post">
                        <h5>{post.title}</h5>
                        <p>{post.content}</p>
                        <small>By {post.users?.full_name || 'Anonymous'} - {new Date(post.created_at).toLocaleDateString()}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DiscussionForum;
