import { supabase } from '../lib/supabaseClient'
import { useEffect, useState } from 'react'
import { getAuthorId } from '../lib/identity'


const CommentForm = ( {post, onCommentAdded}) => {
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('');

    const [comment, setComment] = useState('');
    
    async function handleSubmit(e) {
            e.preventDefault()
            setSubmitting(true);
            setError('');
    
            const { data, error } = await supabase
                .from('comments')
                .insert({
                    post_id: post.id,
                    content: comment,
                    author_id: getAuthorId(),
                })
                .select('*')
                .single();

            setSubmitting(false);

            if (error) {
                console.error(error);
                setError('Could not publish your comment. Please try again.');
                return 
            }

            setComment('')
            onCommentAdded?.(data)
    }
    
    return (
        <form className='comment-form' onSubmit={handleSubmit}>
            
            <h1>Comments</h1>
            <p>Add a comment</p>
            <textarea 
                id="content" 
                rows="4" 
                placeholder="Enter your comment here"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
            />

            <button type='submit' className='comment-btn accent-btn' disabled={submitting}>
                {submitting ? 'Submitting...' : 'Post Comment'}
            </button>

        </form>
    )
}

export default CommentForm