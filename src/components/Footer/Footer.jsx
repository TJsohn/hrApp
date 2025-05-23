import styles from './Footer.module.css';

const Footer = ({year}) => {
    return (
        <footer className={styles.footer}>
            <p>Copyright &copy; REACT25K TJ Sohn {year}</p>
        </footer>
    )
}

export default Footer;