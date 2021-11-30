import React from 'react'
import { useSelector } from 'react-redux'
import { FaHeart } from "react-icons/fa";
import { ImExit } from "react-icons/im"
import { AiFillHome } from "react-icons/ai"
import { BsClockHistory } from "react-icons/bs"
import './Navbar.css'
import { API_URL } from '../../helper';
import { Link } from 'react-router-dom'

function Navbar({ activeComponent }) {
    const userGlobal = useSelector(state => state.user)
    const { profilePhoto } = userGlobal

    return (
        <div className="navbar-container">
            <div>
                <h3 className="navbar-logo">Slace</h3>
            </div>
            <div className="navbar-links">
                <Link to="/">
                    <AiFillHome className={"link" + (activeComponent === 1 ? "-tes" : "")} />
                </Link>
                <Link to="/favorite">
                    <FaHeart className="link" />
                </Link>

                {
                    userGlobal.isLogin &&
                    <Link to="/profile">
                        <img src={`${API_URL}` + profilePhoto} alt="tes" className={"navbar-photo" + (activeComponent === 3 ? "-tes" : "")} />
                    </Link>
                }
                <BsClockHistory className="link" />
                <Link to="/login">
                    <ImExit className="link" />
                </Link>
            </div>
        </div>
    )
}

export default Navbar
