import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import styles from './Auth.module.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearUserMessage } from '../../redux/actions/user';
import { Spinner } from "react-bootstrap";
import AuthFooter from '../../component/auth/AuthFooter';


function SignIn() {
    const dispatch = useDispatch()
    const userGlobal = useSelector(state => state.user)
    const singinInitialValues = {
        username: "",
        password: ""
    }

    const signinValidationSchema = Yup.object().shape({
        username: Yup.string().min(6).required("Username is Required"),
        password: Yup.string().min(6).required("Password is Required")
    })

    const signin = (data) => {
        try {
            dispatch(loginUser(data))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        return () => {
            dispatch(clearUserMessage())
        }
    }, [dispatch])

    return (
        <>

            <div className={styles['auth-container']}>
                <h1 className={styles.title}>Slace</h1>
                <h4 className={styles.subtitle}>Free, No Judgment, Enjoy</h4>
                <p className={styles.description}>Sometimes we need a safe place to be ourselves</p>
                {
                    userGlobal.message !== "" &&
                    <p className={styles.error}>{userGlobal.message}</p>
                }
                <Formik
                    initialValues={singinInitialValues}
                    onSubmit={signin}
                    validationSchema={signinValidationSchema}
                >
                    <Form className={styles.form}>
                        <ErrorMessage name="username" component="span" className={styles.error} />
                        <Field
                            name="username"
                            type="text"
                            placeholder="username"
                            autoComplete="off"
                            className={styles.input}
                        />
                        <ErrorMessage name="password" component="span" className={styles.error} />
                        <Field
                            name="password"
                            type="password"
                            placeholder="Password"
                            autoComplete="off"
                            className={styles.input}
                        />

                        {
                            userGlobal.loading ?
                                <Spinner animation="border" />
                                :
                                <button className={styles.button} type="submit">
                                    Sign In
                                </button>
                        }
                    </Form>
                </Formik>

                <div className={styles['cta-container']}>
                    <p className={styles.cta}>Need some space? you can be <Link to="/" className={styles.Link}><span className={styles["cta-decor"]}>Anonymous</span></Link> here</p>
                    <p className={styles.cta}>Don't have an account yet? Click <Link to="/register" className={styles.Link}><span className={styles["cta-decor"]}>Here</span></Link> to Sign Up</p>
                </div>
            </div>


            <AuthFooter />
        </>
    )
}

export default SignIn
