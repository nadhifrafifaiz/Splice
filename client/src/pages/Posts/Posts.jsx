import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../../component/navbar/Navbar'

function Posts() {
    const userGlobal = useSelector(state => state.user)
    const postGlobal = useSelector(state => state.post)
    const [activeComponent, setActiveComponent] = useState(0)


    const renderPost = () => {
        return postGlobal.posts.map((post, index) => {
            return (
                <div id={index}>
                    {/* aku {userGlobal.username} */}
                    <h5>
                        {post.postTitle}
                    </h5>
                    <p>
                        {post.postBody}
                    </p>
                </div>
            )
        })
    }

    useEffect(() => {
        setActiveComponent(1)
    }, [])

    return (
        <>
            <Navbar activeComponent={activeComponent} />

            <div>
                {renderPost()}
            </div>

        </>

    )
}

export default Posts
