import React from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import styles from './Auth.module.css'
import { FaFacebookSquare, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

function SignIn() {


    const singinInitialValues = {
        username: "",
        password: ""
    }

    const signinValidationSchema = Yup.object().shape({
        username: Yup.string().min(6).required("Username is Required"),
        password: Yup.string().min(6).required("Password is Required")
    })

    const signin = (data) => {
        console.log(data);
    }

    return (
        <>
            <div className={styles['auth-container']}>
                <h1 className={styles.title}>Slace</h1>
                <h4 className={styles.subtitle}>Free No Judgment Enjoy</h4>
                <p className={styles.description}>Sometimes we need a safe place to be ourselves</p>

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
                        <button className={styles.button} type="submit">
                            Sign Up
                        </button>
                    </Form>
                </Formik>

                <div className={styles['cta-container']}>
                    <p className={styles.cta}>Need some space? you can be Anonymous here</p>
                    <p className={styles.cta}>Don't have an account yet? Click Here to Sign Up</p>
                </div>
            </div>


            <div className={styles.footer}>
                <div className={styles['footer-help']}>
                    <p className={styles['footer-help-item']}>About Slace</p>
                    <p className={styles['footer-help-item']}>Help</p>
                    <p className={styles['footer-help-item']}>Community Guidelines</p>
                    <p className={styles['footer-help-item']}>Term of use</p>
                    <p className={styles['footer-help-item']}>Privacy Policy</p>
                    <p className={styles['footer-help-item']}>Transparancy Report</p>
                    <p className={styles['footer-help-item']}>Cookies Policy</p>
                </div>
                <hr className={styles["footer-line"]} />
                <div className={styles['footer-social']}>
                    <FaFacebookSquare className={styles.icon} />
                    <FaInstagram className={styles.icon} />
                    <FaTwitter className={styles.icon} />
                    <FaGithub className={styles.icon} />
                </div>
            </div>
        </>
    )
}

export default SignIn
