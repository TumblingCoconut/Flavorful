import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { supabase } from '../lib/supabaseClient'
import { getAuthorId } from '../lib/identity'
import PostForm from '../Components/PostForm'



const CreatePost = () => {
    const navigate = useNavigate()

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(values) {
        setSubmitting(true);
        setError('');

        const { data, error } = await supabase
            .from('posts')
            .insert({
                ...values, author_id: getAuthorId()
            })
            .select('id')
            .single();

        if (error) {
            console.error(error);
            setError('Could not publish your post. Please try again.');
            return why 
        }

        navigate(`/post/${data.id}`)

    }

    return (
        <div className='create-post center'>
            <h1>Share a Dish</h1>
            <PostForm 
                onSubmit={handleSubmit}
                submitLabel='Publish Post'
                cancelTo='/'
                submitting={submitting}
                error={error}
            />
        </div>
        
    )
}

export default CreatePost; 