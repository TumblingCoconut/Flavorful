import { Link } from 'react-router'
import { TimeStamp } from '../lib/helper.js'
import Upvotes from './Upvotes.jsx'
import { supabase } from '../lib/supabaseClient.js'

const Post = ({post}) =>{
    const { id, author_id, title, created_at, upvotes, flag } = post  

    return (
        <div className="post">
            
            <div className='post-body'>
                
                <div className='post-metadata'>

                    {<time dateTime={created_at}>{TimeStamp(created_at)}</time>}
                    <span className="post-uid" title={author_id}>
                        {author_id}
                    </span>
                </div>
                
                <h2 className="post-title">
                    <Link to={`/post/${id}`} className='post-link plain-link'> {title}</Link>
                </h2>
            
            </div>
            
            <Upvotes postId={id} initialCounts={upvotes}/>
            
        </div>
    )
}

export default Post