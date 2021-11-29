import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../../component/navbar/Navbar'

function Posts() {
    const userGlobal = useSelector(state => state.user)
    const [activeComponent, setActiveComponent] = useState(0)

    useEffect(() => {
        setActiveComponent(1)
    }, [])

    return (
        <>
            <Navbar activeComponent={activeComponent} />
            {
                userGlobal.isLogin ?
                    <div>
                        AKU DAH MASUK, aku {userGlobal.username}, {activeComponent}
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
