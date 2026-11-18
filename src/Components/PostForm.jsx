import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { supabase } from '../lib/supabaseClient'
import { getAuthorId } from '../lib/identity'


const PostForm = ( {initialValues, onSubmit, submitLabel, cancelTo, submitting, error} ) => {
    
    const [title, setTitle] = useState(initialValues?.title ?? '');
    const [content, setContent] = useState(initialValues?.content ?? '');
    const [imageUrl, setImageUrl] = useState(initialValues?.image_url ?? '');
    
    function handleSubmit(e) {
        e.preventDefault()
        onSubmit({
            title: title.trim(),
            content: content.trim() || null,
            image_url: imageUrl.trim() || null,
        })
    }


    return (
        <div className="postform">
        
            <form className="postform-body" onSubmit={handleSubmit}>

                <div className='postform-field'>
                    <label htmlFor='title'>Title (required)</label>
                    <input  
                        id='title'
                        className='text-input' 
                        type="text" 
                        placeholder='Name your post'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className='postform-field'>
                    <label htmlFor='content'>Content (optional)</label>
                    <textarea 
                        id="content" 
                        rows="5" 
                        value={content}
                        placeholder="Recipe, story, tips..." 
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <div className='postform-field'>
                    <label htmlFor='ImageUrl'>Image url (optional)</label>
                    <input 
                        id='ImageUrl'
                        className='text-input' 
                        type="url" 
                        value={imageUrl}
                        placeholder='https://example.com/placeholder.jpg'
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <p>Paste the link of an image hosted elsewhere</p>
                </div>

                {error && <p role="alert">{error}</p>}

                <div className='btn-actions'>
                    <Link to={cancelTo} className='plain-link light-btn'>Cancel</Link>
                    <button type='submit' className='publish-btn accent-btn' disabled={submitting}>
                        {submitting ? 'Submitting...' : submitLabel}
                    </button>
                </div>

            </form>

        </div>
    )
}

export default PostForm;