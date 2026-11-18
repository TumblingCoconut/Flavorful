import { Link, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { supabase } from '../lib/supabaseClient'
import { TimeStamp } from '../lib/helper'

import CommentForm from '../Components/CommentForm'
import Upvotes from '../Components/Upvotes'

const ViewPost = ({}) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);

    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])

    useEffect(()=> {
        async function fetchPost() {
            const {data, error} = await supabase
            .from('posts')
            .select('*')

            .eq('id', id)
            .maybeSingle()
            
            if (error) console.error(error)
            setPost(data)
            setLoading(false)
        }
        fetchPost()

    }, [id])

    useEffect(() => {
        async function fetchComments() {
            const { data, error } = await supabase
                .from('comments')
                .select('*')
                .eq('post_id', id)
                .order('created_at', { ascending: false })   // newest first

            if (error) {
                console.error(error)
                return
            }
            setComments(data)
        }
        fetchComments()
    }, [id])

    async function handleDelete() {
        if (!window.confirm("Delete this post? This can't be undone.")) return

        const { data, error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id)
            .select('id')

        if (error || data.length === 0) {
            console.error(error ?? 'Nothing was deleted')
            return
        }
        navigate('/')
    }


    if (loading) return <p>Loading...</p>
    if (!post) return <p> Post not found </p>

    return (
        <div className="view-post center">
            <Link className="view-post-link" to={`/`} >Back to Feed</Link>
            <h1> {post.title} </h1>
            <p>{TimeStamp(post.created_at)}</p>
            {post.image_url && <img src={post.image_url}/>}
            <p style={{whiteSpace: "pre-wrap"}}> {post.content} </p>

            <div className='btn-actions viewpost-btn-actions'>
                <Upvotes postId={post.id} initialCounts={post.upvotes}/>

                <Link to={`/edit/${post.id}`} className='plain-link accent-btn'>
                    Edit Post
                </Link>

                <button type='button' className='light-btn' onClick={handleDelete}>
                    Delete Post
                </button>
            </div>

            < CommentForm post={post} onCommentAdded={(c) => setComments((prev) => [c, ...prev])}/>

            <div className="comment-list">
                {comments.length === 0 && <p>No comments yet.</p>}
                {comments.map((comment) => (
                    <div className="comment" key={comment.id}> 
                        <div className="comment-meta">
                            <p className="comment-time">{TimeStamp(comment.created_at)}</p>
                            <p className="comment-uid">{comment.author_id}</p>
                        </div>
                        
                        <p>{comment.content}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ViewPost; 