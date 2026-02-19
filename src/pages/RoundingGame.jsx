import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, RefreshCcw, Check, X } from 'lucide-react';
import NumberLine from '../components/Visuals/NumberLine';
import useInteractionTracker from '../hooks/useInteractionTracker';
import styles from './RoundingGame.module.css';

const RoundingGame = () => {
    const [targetNumber, setTargetNumber] = useState(0);
    const [rangeStart, setRangeStart] = useState(0);
    const [rangeEnd, setRangeEnd] = useState(0);
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect', null
    const [score, setScore] = useState(0);

    const { logInteraction } = useInteractionTracker('RoundingGame');

    const generateNewQuestion = useCallback(() => {
        // Generate random number between 11 and 99, excluding multiples of 10 for challenge
        let num = Math.floor(Math.random() * 89) + 11;
        while (num % 10 === 0) {
            num = Math.floor(Math.random() * 89) + 11;
        }

        const start = Math.floor(num / 10) * 10;
        const end = start + 10;

        setTargetNumber(num);
        setRangeStart(start);
        setRangeEnd(end);
        setSelectedNumber(null);
        setFeedback(null);

        logInteraction('game_start', { target: num, range: [start, end] });
    }, [logInteraction]);

    useEffect(() => {
        const timer = setTimeout(() => generateNewQuestion(), 0);
        return () => clearTimeout(timer);
    }, [generateNewQuestion]);

    const handleSelect = (num) => {
        if (feedback === 'correct') return; // Prevent changing after success

        setSelectedNumber(num);
        logInteraction('select_number', { number: num });

        // Auto-check if it's one of the bounds (simple mode)
        // Or just let user select any number? 
        // For rounding to nearest 10, answers are usually the start or end.
        // Let's allow selecting any, but valid answers are start or end.
    };

    const checkAnswer = () => {
        if (selectedNumber === null) return;

        const correct = Math.round(targetNumber / 10) * 10;
        const isCorrect = selectedNumber === correct;

        if (isCorrect) {
            setFeedback('correct');
            setScore(s => s + 1);
            logInteraction('answer_check', { correct: true, selected: selectedNumber });
        } else {
            setFeedback('incorrect');
            logInteraction('answer_check', { correct: false, selected: selectedNumber, expected: correct });
        }
    };

    const handleKeyDown = (e) => {
        // Allow keyboard selection of bounds?
        if (e.key === 'ArrowLeft') handleSelect(rangeStart);
        if (e.key === 'ArrowRight') handleSelect(rangeEnd);
        if (e.key === 'Enter') checkAnswer();
    };

    return (
        <div className={styles.container} onKeyDown={handleKeyDown} tabIndex="0">
            <div className={styles.header}>
                <h1 className={styles.title}>Rounding Roller Coaster</h1>
                <div className={styles.score}>Score: {score}</div>
            </div>

            <div className={styles.questionSection}>
                <p className={styles.instruction}>
                    Round the number <span className={styles.targetNumber}>{targetNumber}</span> to the nearest 10.
                </p>
                <p className={styles.hint}>Click the number on the line or use Arrow keys!</p>
            </div>

            <div className={styles.visualSection}>
                <NumberLine
                    start={rangeStart}
                    end={rangeEnd}
                    target={targetNumber}
                    highlight={selectedNumber}
                    onSelect={handleSelect}
                />
            </div>

            <div className={styles.controls}>
                <button
                    className={styles.checkButton}
                    onClick={checkAnswer}
                    disabled={selectedNumber === null || feedback === 'correct'}
                >
                    Check Answer
                </button>

                {feedback === 'correct' && (
                    <div className={styles.feedbackSuccess}>
                        <Check size={24} />
                        <span>Great Job!</span>
                        <button className={styles.nextButton} onClick={generateNewQuestion}>
                            Next <ArrowRight size={16} />
                        </button>
                    </div>
                )}

                {feedback === 'incorrect' && (
                    <div className={styles.feedbackError}>
                        <X size={24} />
                        <span>Try Again!</span>
                        <button className={styles.retryButton} onClick={() => setFeedback(null)}>
                            <RefreshCcw size={16} /> Retry
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoundingGame;
