import React, { useEffect } from 'react'
import AuthFooter from '../../component/auth/AuthFooter'
import styles from './Auth.module.css'
import { Link, Redirect } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { userAuth } from '../../redux/actions/user'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'


function Verification() {
    const userGlobal = useSelector(state => state.user)
    const params = useParams()
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false);


    const verify = async () => {
        await dispatch(userAuth(params.token))
        setTimeout(() => setRedirect(true), 3000);
    }

    useEffect(() => {
        verify()
    }, [])

    if (redirect) {
        return <Redirect to="/" />
    }




    return (
        <>
            <div className={styles['auth-container']}>

                <h1 className={styles.title}>Your account is verified, {userGlobal.username}</h1>

                <p className={styles.cta}>Go to posts <Link to="/" className={styles.Link}><span className={styles["cta-decor"]}>Anonymous</span></Link></p>

            </div>
            <AuthFooter />
        </>
    )
}

export default Verification
