
import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

const Upvotes = ( { postId, initialCounts} ) => {
    const [count, setCount] = useState(initialCounts)
    
    async function handleClick(){
        setCount((c) => c + 1)
        
        const { data, error } = await supabase.rpc('increment_upvotes', { post_id: postId })

        if (error) {
            console.error(error)
            setCount((c) => c - 1)                   // roll back
            return
        }
        setCount(data)                               // use the real count from the database
    }
    
    
    return (
        <button className='upvotes upvotes-btn' onClick={handleClick}> 
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M7 2l6 9H1z" fill="var(--accent)" />
            </svg>
            <data value={count}>{count}</data>
            <span className="visually-hidden">upvotes</span>
        </button>
    )
}

export default Upvotes