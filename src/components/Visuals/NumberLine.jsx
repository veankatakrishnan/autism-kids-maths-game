import React from 'react';
import styles from './NumberLine.module.css';

const NumberLine = ({ start, end, target, highlight, onSelect }) => {
    const numbers = [];
    for (let i = start; i <= end; i++) {
        numbers.push(i);
    }

    return (
        <div className={styles.container}>
            <div className={styles.line}></div>
            <div className={styles.ticksContainer}>
                {numbers.map((num) => {
                    const isTarget = num === target;
                    const isHighlight = highlight === num;

                    return (
                        <div
                            key={num}
                            className={`${styles.tickWrapper} ${isTarget ? styles.targetWrapper : ''}`}
                            onClick={() => onSelect && onSelect(num)}
                            data-interactive="true"
                        >
                            <div className={`${styles.tick} ${num % 5 === 0 ? styles.majorTick : ''}`}></div>
                            <div className={`${styles.label} ${isTarget ? styles.targetLabel : ''} ${isHighlight ? styles.highlightLabel : ''}`}>
                                {num}
                            </div>
                            {isTarget && <div className={styles.marker}>📍</div>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NumberLine;
