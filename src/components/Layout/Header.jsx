import { Link } from 'react-router-dom';
import { Home, ChartBar } from 'lucide-react';
import ScreenRecorder from '../ScreenRecorder/ScreenRecorder';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <Link to="/" className={styles.logo}>
                    <Home className={styles.icon} />
                    <span>Math Explorer</span>
                </Link>
            </div>
            <nav className={styles.nav}>
                <ScreenRecorder />
                <Link to="/analytics" className={styles.navLink}>
                    <ChartBar className={styles.icon} />
                    <span>Progress</span>
                </Link>
            </nav>
        </header>
    );
};

export default Header;
