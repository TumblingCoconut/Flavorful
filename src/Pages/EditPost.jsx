import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useEffect} from 'react'
import { supabase } from '../lib/supabaseClient'
import { useParams } from 'react-router'
import PostForm from '../Components/PostForm.jsx'


const EditPost = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('');


    useEffect(()=> {
        async function fetchPost() {
            const {data, error} = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .maybeSingle()
            
            if (error) console.error(error)
            setPost(data)
            console.log(data)
            setLoading(false)
        }
        fetchPost()

    }, [id])

    async function handleUpdate(values) {
        setSubmitting(true)
        setError('')

        const { error } = await supabase
            .from('posts')
            .update(values)
            .eq('id', id)

        if (error) {
            console.error(error)
            setError('Could not save your changes. Please try again. ')
            setSubmitting(false)
            return
        }
        navigate(`/post/${id}`)
    }


    if (loading) return <p>Loading...</p>
    if (!post) return <p>Post not found.</p>
    // if (post.author_id !== getAuthorId()) {
    //     return <p>You can only edit your own posts.</p>
    // }

    return (
        <div className='edit-post center'>
            <h1>Edit Post</h1>
            <PostForm
                initialValues={post}
                onSubmit={handleUpdate}
                submitLabel='Submit Post'
                cancelTo={`/post/${id}`}
                submitting={submitting}
                error={error}
            />
            
        </div>
    )
}

export default EditPost