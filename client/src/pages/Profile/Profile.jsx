import React, { useEffect, useState } from 'react'
import Navbar from '../../component/navbar/Navbar'


function Profile() {
    const [activeComponent, setActiveComponent] = useState(0)

    useEffect(() => {
        setActiveComponent(3)
    }, [])

    return (
        <div>
            <Navbar activeComponent={activeComponent} />
            AKU PROFILE
        </div>
    )
}

export default Profile
