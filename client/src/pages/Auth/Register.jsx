import React from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import styles from './Auth.module.css'
import { FaFacebookSquare, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../helper/index'



function Register() {

    const registerInitialValues = {
        username: "",
        email: "",
        password: "",
    }

    const registerValidationSchema = Yup.object().shape({
        username: Yup.string().min(6).required("Username Is Required"),
        email: Yup.string().email("Wrong Email Format").required("Email Is Required"),
        password: Yup.string().min(6).required("Password Is Required"),
        confirmPassword: Yup.string().min(6)
            .when("password", {
                is: (val) => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Password is not match"
                ),
            })
            .required("Confirm Password Required"),
    })

    const register = async (data) => {
        const { username, email, password } = data
        try {
            const registerResponse = await axios.post(`${API_URL}/auth/register`, {
                username, email, password
            })
            console.log(registerResponse);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className={styles['auth-container']}>
                <h1 className={styles.title}>Sign Up</h1>

                {/* <p className={styles.error}>TIDAK BOLEH MASUK GAN</p> */}
                <Formik
                    initialValues={registerInitialValues}
                    onSubmit={register}
                    validationSchema={registerValidationSchema}
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
                        <ErrorMessage name="email" component="span" className={styles.error} />
                        <Field
                            name="email"
                            type="email"
                            placeholder="email"
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
                        <ErrorMessage name="confirmPassword" component="span" className={styles.error} />
                        <Field
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            autoComplete="off"
                            className={styles.input}
                        />
                        <button className={styles.button} type="submit">
                            Sign Up
                        </button>
                    </Form>
                </Formik>

                <div className={styles['cta-container']}>
                    <p className={styles.cta}>Need some space? you can be <Link to="/signup" className={styles.Link}><span className={styles["cta-decor"]}>Anonymous</span></Link> here</p>
                    <p className={styles.cta}>Already have an account? <Link to="/" className={styles.Link}><span className={styles["cta-decor"]}>Login</span></Link> now</p>
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

export default Register
