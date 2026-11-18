 import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { supabase } from '../lib/supabaseClient'
import Post from '../Components/Post'

const Home = () => {
    const [topPosts, setTopPosts] = useState([])

    useEffect(() => {
        async function fetchTopPosts() {
            const { data, error } = await supabase
                .from('posts')
                .select('id, author_id, created_at, title, upvotes, content, image_url')
                .order('upvotes', { ascending: false })
                .limit(3)

            if (error) {
                console.error(error)
                return
            }
            setTopPosts(data)
        }
        fetchTopPosts()
    }, [])

    // use the first top post that has an image as the hero picture
    const heroImage = topPosts.find((p) => p.image_url)?.image_url

    return (
        <div className="home center">
            <section className="home-top">
                <div className="home-desc">
                    <h1>Show what you're eating.</h1>
                    <p>
                        Post recipes, restaurant finds, and kitchen wins. Upvote the
                        dishes you love and talk it over in the comments.
                    </p>
                    <div className="home-actions">
                        <Link to="/feed" className="plain-link accent-btn">Browse the feed</Link>
                        <Link to="/create" className="plain-link light-btn">Create a Post</Link>
                    </div>
                </div>

                {heroImage && (
                    <img
                        className="home-img"
                        src={heroImage}
                        alt=""
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                )}
            </section>

            <section className="home-post">
                <div className="home-post-header">
                    <h2>Top posts</h2>
                    <Link to="/feed" className="home-see-all">See all posts</Link>
                </div>

                <ul className="content-feed">
                    {topPosts.length === 0 && <li>No posts yet.</li>}
                    {topPosts.map((post) => (
                        <li key={post.id}>
                            <Post post={post} />
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}

export default Home