import { Link } from 'react-router-dom';
import { Target, Layers } from 'lucide-react';
import styles from './Home.module.css';

const GameCard = ({ title, description, to, icon: Icon, color }) => (
    <Link to={to} className={styles.card} style={{ borderColor: color }}>
        <div className={styles.iconContainer} style={{ backgroundColor: color }}>
            <Icon size={48} color="white" />
        </div>
        <div className={styles.content}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
        </div>
    </Link>
);

const Home = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Welcome to Math Explorer!</h1>
            <p className={styles.subheading}>Choose a game to start learning:</p>

            <div className={styles.grid}>
                <GameCard
                    title="Rounding Roller Coaster"
                    description="Learn to round numbers to the nearest 10 or 100!"
                    to="/rounding"
                    icon={Target}
                    color="#FF6B6B"
                />
                <GameCard
                    title="Place Value Builder"
                    description="Build numbers with blocks: Ones, Tens, and Hundreds."
                    to="/place-value"
                    icon={Layers}
                    color="#4ECDC4"
                />
                <GameCard
                    title="Roman Numeral Quest"
                    description="Discover the secrets of Roman Numerals."
                    to="/roman-numerals"
                    icon={Target} // Placeholder icon
                    color="#45B7D1"
                />
            </div>
        </div>
    );
};

export default Home;
