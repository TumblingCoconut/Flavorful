import { useEffect, useState } from 'react'
import { getAuthorId } from '../lib/identity'
import { supabase } from '../lib/supabaseClient'
import Post from '../Components/Post';

const FLAGS = ['Question', 'Discussion', 'Recipe', 'Review']

const Feed = () => {
    const authorId = getAuthorId();

    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('created_at')
    // const [flag, setFlag] = useState('')   // '' means All
    
    useEffect(() => {
        async function fetchPosts(){
            let query = supabase
                .from('posts')
                .select('id, author_id, created_at, title, upvotes, flag, content')
                .order(sort, {ascending: false})

            if (search) query = query.ilike('title', `%${search}%`)
            // if (flag) query = query.eq('flag', flag)

            const { data, error } = await query
            if (error) {
                console.error(error)
                return
            }
            setPosts(data)
            
        }
        fetchPosts()
    }, [search, sort])

    return (
        <div className="feed center">
            <h1>What's Cooking</h1>

            <div className='search-control'>
                
                <div className='search-row'>
                    <input className='text-input' 
                            type='text' 
                            placeholder='Search by title' 
                            onChange={(e) => setSearch(e.target.value)}/>
                    
                    <button className={sort == 'created_at' ? 'accent-btn' : 'light-btn'}
                            onClick={() => setSort('created_at')}>
                        Newest
                    </button>
                    
                    <button className={sort == 'upvotes' ? 'accent-btn' : 'light-btn'}
                            onClick={() => setSort('upvotes')}>
                        Most upvoted
                    </button>
                </div>

            </div>
            
            <div className='content-feed'>
                {posts.length === 0 && <p>No posts found.</p>}
                {posts.map((post) => (
                    <li key={post.id}>
                        <Post post={post} />
                    </li>
                ))}
            </div>
        </div>
    )
}

export default Feed; 