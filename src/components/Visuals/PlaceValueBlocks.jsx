import styles from './PlaceValueBlocks.module.css';

const BlockDetails = {
    hundred: { color: '#e74c3c', label: '100', size: 100 },
    ten: { color: '#3498db', label: '10', width: 10, height: 100 },
    one: { color: '#f1c40f', label: '1', size: 10 }
};

export const HundredsBlock = ({ count, onClick }) => (
    <div className={styles.groupContainer} onClick={() => onClick && onClick('hundred')}>
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className={styles.hundredBlock} title="Hundred" />
        ))}
    </div>
);

export const TensBlock = ({ count, onClick }) => (
    <div className={styles.groupContainer} onClick={() => onClick && onClick('ten')}>
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className={styles.tenBlock} title="Ten" />
        ))}
    </div>
);

export const OnesBlock = ({ count, onClick }) => (
    <div className={styles.groupContainer} onClick={() => onClick && onClick('one')}>
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className={styles.oneBlock} title="One" />
        ))}
    </div>
);
