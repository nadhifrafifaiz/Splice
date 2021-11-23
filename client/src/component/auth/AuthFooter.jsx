import React from 'react'
import { FaFacebookSquare, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import styles from '../../pages/Auth/Auth.module.css'

function AuthFooter() {
    return (
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
    )
}

export default AuthFooter
