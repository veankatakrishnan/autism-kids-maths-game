import { Mail, Github, Linkedin, Camera, Globe } from 'lucide-react';
import styles from './Developer.module.css';
import { useState } from 'react';

const Developer = () => {
    // The user needs to place their photo at public/developer.jpg
    const [imgError, setImgError] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.headerGlow}></div>

                <div className={styles.profileSection}>
                    <div className={styles.imageContainer}>
                        {!imgError ? (
                            <img
                                src="/developer.png"
                                alt="Developer"
                                className={styles.profileImage}
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <div className={styles.placeholderImage}>
                                <Camera size={48} className={styles.cameraIcon} />
                            </div>
                        )}
                        <div className={styles.statusDot}></div>
                    </div>

                    <h1 className={styles.name}>Veankata Krishnan S M </h1>
                    <p className={styles.role}>Full Stack Developer & Creator</p>

                    <p className={styles.bio}>
                        Passionate about building inclusive, accessible, and engaging educational tools.
                        Creator of Math Explorer, designed specifically to help neurodivergent children learn math through interactive play.
                    </p>
                </div>

                <div className={styles.contactSection}>
                    <h2 className={styles.sectionTitle}>Connect With Me</h2>
                    <div className={styles.links}>
                        <a href="mailto:[veankatakrishnan@gmail.com]" className={styles.linkButton}>
                            <Mail size={20} />
                            <span>Email Me</span>
                        </a>
                        <a href="https://github.com/veankatakrishnan" target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
                            <Github size={20} />
                            <span>GitHub</span>
                        </a>
                        <a href="https://www.linkedin.com/in/veankatakrishnan/" target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
                            <Linkedin size={20} />
                            <span>LinkedIn</span>
                        </a>
                        <a href="https://veankatakrishnan.github.io/portfolio/" target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
                            <Globe size={20} />
                            <span>Portfolio</span>
                        </a>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Developer;
