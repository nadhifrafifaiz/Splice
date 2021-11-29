import React from 'react'
import { useSelector } from 'react-redux'
import { FaHeart } from "react-icons/fa";
import { ImExit } from "react-icons/im"
import { AiFillHome } from "react-icons/ai"
import { BsClockHistory } from "react-icons/bs"
import './Navbar.css'
import { API_URL } from '../../helper';

function Navbar({ activeComponent }) {
    const userGlobal = useSelector(state => state.user)
    const { profilePhoto } = userGlobal

    return (
        <div className="navbar-container">
            <div>
                <h3 className="navbar-logo">Slace</h3>
            </div>
            <div className="navbar-links">
                <AiFillHome className={"link" + (activeComponent === 1 ? "-tes" : "")} />
                <FaHeart className="link" />
                {
                    userGlobal.isLogin &&
                    <img src={`${API_URL}` + profilePhoto} alt="tes" className={"navbar-photo" + (activeComponent === 3 ? "-tes" : "")} />
                }
                <BsClockHistory className="link" />
                <ImExit className="link" />
            </div>
        </div>
    )
}

export default Navbar
