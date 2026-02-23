import { NavLink } from 'react-router-dom';
import { Home, BarChart2, Target, Layers, BookOpen, ExternalLink, User } from 'lucide-react';
import ScreenRecorder from '../ScreenRecorder/ScreenRecorder';
import styles from './Header.module.css';

const navItems = [
    { to: '/rounding', label: 'Rounding', icon: Target },
    { to: '/place-value', label: 'Place Value', icon: Layers },
    { to: '/roman-numerals', label: 'Roman Numerals', icon: BookOpen },
    { to: '/analytics', label: 'Progress', icon: BarChart2 },
    { to: '/developer', label: 'Developer', icon: User },
];

const Header = () => {
    return (
        <header className={styles.header}>
            {/* Logo */}
            <NavLink to="/" className={styles.logo}>
                <Home className={styles.logoIcon} />
                <span>Math Explorer</span>
            </NavLink>

            {/* Main Navigation */}
            <nav className={styles.nav}>
                {navItems.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `${styles.navLink} ${isActive ? styles.active : ''}`
                        }
                    >
                        <Icon size={16} className={styles.navIcon} />
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Right Actions */}
            <div className={styles.actions}>
                <ScreenRecorder />
                <a
                    href="https://veankatakrishnan.github.io/festivals-autism-kids-game/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.externalLink}
                >
                    <ExternalLink size={16} />
                    <span>Festivals Game</span>
                </a>
            </div>
        </header>
    );
};

export default Header;
