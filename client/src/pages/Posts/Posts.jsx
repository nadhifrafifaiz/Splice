import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../../component/navbar/Navbar'

function Posts() {
    const userGlobal = useSelector(state => state.user)


    return (
        <>
            <Navbar />
            {
                userGlobal.isLogin ?
                    <div>
                        AKU DAH MASUK, aku {userGlobal.username}
                    </div>
                    :
                    <div>
                        AKU Gak MASUK
                    </div>

            }
        </>

    )
}

export default Posts
