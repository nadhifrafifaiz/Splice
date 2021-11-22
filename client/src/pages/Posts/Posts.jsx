import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

function Posts() {
    const userGlobal = useSelector(state => state.user)


    return (
        <>
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
