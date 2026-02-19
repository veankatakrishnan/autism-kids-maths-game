import { useState, useCallback, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Trash2, CheckCircle } from 'lucide-react';
import { HundredsBlock, TensBlock, OnesBlock } from '../components/Visuals/PlaceValueBlocks';
import useInteractionTracker from '../hooks/useInteractionTracker';
import styles from './PlaceValueGame.module.css';

const PlaceValueGame = () => {
    const [targetNumber, setTargetNumber] = useState(0);
    const [hundreds, setHundreds] = useState(0);
    const [tens, setTens] = useState(0);
    const [ones, setOnes] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const { logInteraction } = useInteractionTracker('PlaceValueGame');

    const generateQuestion = useCallback(() => {
        const num = Math.floor(Math.random() * 300) + 1; // 1 to 300
        setTargetNumber(num);
        setHundreds(0);
        setTens(0);
        setOnes(0);
        setFeedback('');
        logInteraction('game_start', { target: num });
    }, [logInteraction]);

    useEffect(() => {
        const timer = setTimeout(() => generateQuestion(), 0);
        return () => clearTimeout(timer);
    }, [generateQuestion]);

    const handleAdd = (type) => {
        if (feedback === 'Correct!') return;

        if (type === 'hundred' && hundreds < 9) {
            setHundreds(h => h + 1);
            logInteraction('add_block', { type: 'hundred' });
        }
        if (type === 'ten' && tens < 19) { // Allow slight overflow for learning regrouping? Maybe stick to standard max 9 for now or flexible.
            // Let's stick to standard place value: usually max 9, but in building sometimes you have 12 tens. 
            // For simplicity, let's allow up to 20 to let them overbuild and correct.
            setTens(t => t + 1);
            logInteraction('add_block', { type: 'ten' });
        }
        if (type === 'one' && ones < 20) {
            setOnes(o => o + 1);
            logInteraction('add_block', { type: 'one' });
        }
    };

    const handleRemove = (type) => {
        if (feedback === 'Correct!') return;

        if (type === 'hundred' && hundreds > 0) setHundreds(h => h - 1);
        if (type === 'ten' && tens > 0) setTens(t => t - 1);
        if (type === 'one' && ones > 0) setOnes(o => o - 1);

        logInteraction('remove_block', { type });
    };

    const currentSum = hundreds * 100 + tens * 10 + ones;

    const checkAnswer = () => {
        if (currentSum === targetNumber) {
            setFeedback('Correct!');
            setScore(s => s + 10);
            logInteraction('check_answer', { correct: true, currentSum });
        } else {
            setFeedback(currentSum < targetNumber ? 'Too Low! Add more.' : 'Too High! Remove some.');
            logInteraction('check_answer', { correct: false, currentSum, target: targetNumber });
        }
    };

    const handleReset = () => {
        setHundreds(0);
        setTens(0);
        setOnes(0);
        setFeedback('');
        logInteraction('reset', {});
    };

    // Keyboard controls
    const handleKeyDown = (e) => {
        if (e.key === '1') handleAdd('one');
        if (e.key === '2') handleAdd('ten');
        if (e.key === '3') handleAdd('hundred');
        if (e.key === 'Backspace') handleReset();
        if (e.key === 'Enter') checkAnswer();
    };

    return (
        <div className={styles.container} onKeyDown={handleKeyDown} tabIndex="0">
            <header className={styles.header}>
                <h1 className={styles.title}>Place Value Builder</h1>
                <div className={styles.score}>Score: {score}</div>
            </header>

            <div className={styles.targetSection}>
                <p>Build the number:</p>
                <div className={styles.targetNumber}>{targetNumber}</div>
            </div>

            <div className={styles.builderArea}>
                <div className={styles.column}>
                    <h3>Hundreds (100)</h3>
                    <div className={styles.controls}>
                        <button onClick={() => handleAdd('hundred')}>+</button>
                        <button onClick={() => handleRemove('hundred')}>-</button>
                    </div>
                    <HundredsBlock count={hundreds} onClick={() => handleAdd('hundred')} />
                    <div className={styles.columnValue}>
                        {hundreds} × 100 = <strong>{hundreds * 100}</strong>
                    </div>
                </div>

                <div className={styles.column}>
                    <h3>Tens (10)</h3>
                    <div className={styles.controls}>
                        <button onClick={() => handleAdd('ten')}>+</button>
                        <button onClick={() => handleRemove('ten')}>-</button>
                    </div>
                    <TensBlock count={tens} onClick={() => handleAdd('ten')} />
                    <div className={styles.columnValue}>
                        {tens} × 10 = <strong>{tens * 10}</strong>
                    </div>
                </div>

                <div className={styles.column}>
                    <h3>Ones (1)</h3>
                    <div className={styles.controls}>
                        <button onClick={() => handleAdd('one')}>+</button>
                        <button onClick={() => handleRemove('one')}>-</button>
                    </div>
                    <OnesBlock count={ones} onClick={() => handleAdd('one')} />
                    <div className={styles.columnValue}>
                        {ones} × 1 = <strong>{ones}</strong>
                    </div>
                </div>
            </div>

            <div className={styles.currentSum}>
                Current Total: {currentSum}
            </div>

            <div className={styles.mainControls}>
                <button className={styles.resetBtn} onClick={handleReset}>
                    <Trash2 size={20} /> Clear
                </button>
                <button className={styles.checkBtn} onClick={checkAnswer}>
                    <CheckCircle size={20} /> Check
                </button>
                {feedback === 'Correct!' && (
                    <button className={styles.nextBtn} onClick={generateQuestion}>
                        Next <ArrowRight size={20} />
                    </button>
                )}
            </div>

            {feedback && <div className={`${styles.feedback} ${feedback === 'Correct!' ? styles.success : styles.error}`}>
                {feedback}
            </div>}
        </div>
    );
};

export default PlaceValueGame;
