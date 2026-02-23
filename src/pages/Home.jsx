import { Link } from 'react-router-dom';
import { Target, Layers, BookOpen, BarChart2, Gamepad2, Star, Zap, Heart } from 'lucide-react';
import styles from './Home.module.css';

const GameCard = ({ title, description, to, icon: Icon }) => (
    <Link to={to} className={styles.card}>
        <div className={styles.iconContainer}>
            <Icon size={40} className={styles.cardIcon} />
        </div>
        <div className={styles.content}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.cardArrow}>Play Now →</div>
    </Link>
);

const FeatureBadge = ({ icon: Icon, label }) => (
    <div className={styles.badge}>
        <Icon size={18} className={styles.badgeIcon} />
        <span>{label}</span>
    </div>
);

const Home = () => {
    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.heroBadge}>
                        <Star size={14} />
                        <span>Designed for Autistic Learners</span>
                    </div>
                    <h1 className={styles.heroTitle}>
                        Math Explorer
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Elegant, interactive learning. Helping children master
                        rounding, place value, and Roman numerals through distraction-free play.
                    </p>
                    <div className={styles.heroActions}>
                        <Link to="/rounding" className={styles.heroCta}>
                            <Gamepad2 size={20} />
                            Start Playing
                        </Link>
                        <Link to="/analytics" className={styles.heroSecondary}>
                            <BarChart2 size={18} />
                            View Progress
                        </Link>
                    </div>
                    <div className={styles.featureBadges}>
                        <FeatureBadge icon={Zap} label="Interactive" />
                        <FeatureBadge icon={Heart} label="Inclusive" />
                        <FeatureBadge icon={Star} label="3 Games" />
                        <FeatureBadge icon={BarChart2} label="Tracking" />
                    </div>
                </div>
            </section>

            {/* Games Section */}
            <section className={styles.gamesSection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Choose Your Game</h2>
                    <p className={styles.sectionSubtitle}>Select a module to begin.</p>
                </div>
                <div className={styles.grid}>
                    <GameCard
                        title="Rounding Roller Coaster"
                        description="Learn to round numbers to the nearest 10 or 100 with clear challenges."
                        to="/rounding"
                        icon={Target}
                    />
                    <GameCard
                        title="Place Value Builder"
                        description="Build numbers using structured visual blocks: Ones, Tens, Hundreds."
                        to="/place-value"
                        icon={Layers}
                    />
                    <GameCard
                        title="Roman Numeral Quest"
                        description="Decode and write ancient Roman numerals in a focused environment."
                        to="/roman-numerals"
                        icon={BookOpen}
                    />
                </div>
            </section>

            {/* Analytics CTA Section */}
            <section className={styles.analyticsSection}>
                <div className={styles.analyticsCard}>
                    <BarChart2 size={48} className={styles.analyticsIcon} />
                    <div>
                        <h3>Track Your Progress</h3>
                        <p>Review scores, streaks, and personal growth.</p>
                    </div>
                    <Link to="/analytics" className={styles.analyticsBtn}>View Analytics →</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
