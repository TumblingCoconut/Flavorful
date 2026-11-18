import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'

import Nav from './Components/Nav.jsx'
import Home from './Pages/Home.jsx'
import Feed from './Pages/Feed.jsx'
import CreatePost from './Pages/CreatePost'
import ViewPost from './Pages/ViewPost' 
import EditPost from './Pages/EditPost.jsx'
import { getAuthorId } from './lib/identity.js'

function App() {

    const authorId = getAuthorId();

    return (
        <div className="app">
            <Nav authorId={authorId} />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/create" element={<CreatePost />} />
                    <Route path="/post/:id/" element={<ViewPost/>} />
                    <Route path="/edit/:id/" element={<EditPost/>} />

                    <Route path="*" element={<h2>Page not found</h2>} />
                </Routes>
            </div>
        </div>
    )
}

export default App
