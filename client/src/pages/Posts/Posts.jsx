import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../../component/navbar/Navbar'
import './Posts.css'
import { API_URL } from '../../helper/index'
import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment'


function Posts() {
    const userGlobal = useSelector(state => state.user)
    const postGlobal = useSelector(state => state.post)
    const [activeComponent, setActiveComponent] = useState(0)


    const renderPost = () => {
        return postGlobal.posts.map((post, index) => {
            return (
                <div id={index} className="post-card">
                    <div className="post-header post-card-item">
                        <div className="post-header-left">
                            <img src={`${API_URL}` + post.User.profilePhoto} alt="tes" className="post-profile-photo" />
                            <div className="post-user" >
                                <h5 className="post-user-item">
                                    {post.User.username}
                                </h5>
                                <p className="post-user-item post-time">
                                    {moment(post.User.createdAt).startOf('hour').fromNow()}
                                </p>
                            </div>
                        </div>

                        <p>SHARE</p>
                    </div>
                    <div className="post-card-item">
                        <p>
                            {post.postBody}
                        </p>
                    </div>
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

            <div className="home">

                <div className="post-section">
                    {renderPost()}
                    {renderPost()}
                    {renderPost()}
                    {renderPost()}
                </div>
                <div className="post-section-2">
                    Ini Sidebar
                </div>
            </div>

        </>

    )
}

export default Posts
