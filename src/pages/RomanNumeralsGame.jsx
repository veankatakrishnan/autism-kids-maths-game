import { useState, useCallback, useEffect } from 'react';
import { RefreshCcw, Check, ArrowRight, Delete } from 'lucide-react';
import useInteractionTracker from '../hooks/useInteractionTracker';
import styles from './RomanNumeralsGame.module.css';

const ROMAN_VALUES = [
    { symbol: 'M', value: 1000 },
    { symbol: 'D', value: 500 },
    { symbol: 'C', value: 100 },
    { symbol: 'L', value: 50 },
    { symbol: 'X', value: 10 },
    { symbol: 'V', value: 5 },
    { symbol: 'I', value: 1 }
];

const RomanNumeralsGame = () => {
    const [targetNumber, setTargetNumber] = useState(0);
    const [currentRoman, setCurrentRoman] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);

    const { logInteraction } = useInteractionTracker('RomanNumeralsGame');

    const toRoman = (num) => {
        let n = num;
        let str = '';
        const numerals = [
            ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400],
            ['C', 100], ['XC', 90], ['L', 50], ['XL', 40],
            ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]
        ];
        for (const [sym, val] of numerals) {
            while (n >= val) {
                str += sym;
                n -= val;
            }
        }
        return str;
    };

    const generateQuestion = useCallback(() => {
        // Keep numbers relatively small for kids (1-100 or 1-50 first?)
        // Let's go 1-50 clearly.
        const num = Math.floor(Math.random() * 50) + 1;
        setTargetNumber(num);
        setCurrentRoman('');
        setFeedback(null);
        logInteraction('game_start', { target: num });
    }, [logInteraction]);

    useEffect(() => {
        const timer = setTimeout(() => generateQuestion(), 0);
        return () => clearTimeout(timer);
    }, [generateQuestion]);

    const handleAddSymbol = (symbol) => {
        if (feedback === 'correct') return;
        setCurrentRoman(prev => prev + symbol);
        logInteraction('add_symbol', { symbol });
    };

    const handleBackspace = () => {
        if (feedback === 'correct') return;
        setCurrentRoman(prev => prev.slice(0, -1));
        logInteraction('backspace', {});
    };

    const checkAnswer = () => {
        const correctRoman = toRoman(targetNumber);
        if (currentRoman === correctRoman) {
            setFeedback('correct');
            setScore(s => s + 5);
            logInteraction('check_answer', { correct: true, answer: currentRoman });
        } else {
            setFeedback('incorrect');
            logInteraction('check_answer', { correct: false, answer: currentRoman, expected: correctRoman });
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Roman Numeral Quest</h1>
                <div className={styles.score}>Score: {score}</div>
            </header>

            <div className={styles.content}>
                <div className={styles.questionBox}>
                    <p>Build the Roman Numeral for:</p>
                    <div className={styles.targetNumber}>{targetNumber}</div>
                </div>

                <div className={styles.answerBox}>
                    <div className={styles.currentInput}>{currentRoman || <span className={styles.placeholder}>?</span>}</div>
                    <button className={styles.backspaceBtn} onClick={handleBackspace} aria-label="Delete">
                        <Delete size={20} />
                    </button>
                </div>

                <div className={styles.keyboard}>
                    {ROMAN_VALUES.map(({ symbol, value }) => (
                        <button
                            key={symbol}
                            className={styles.key}
                            onClick={() => handleAddSymbol(symbol)}
                            title={`Value: ${value}`}
                        >
                            <span className={styles.keySymbol}>{symbol}</span>
                            <span className={styles.keyValue}>{value}</span>
                        </button>
                    ))}
                </div>

                <div className={styles.actions}>
                    <button className={styles.checkBtn} onClick={checkAnswer} disabled={!currentRoman || feedback === 'correct'}>
                        Check Answer
                    </button>
                </div>

                {feedback === 'correct' && (
                    <div className={styles.feedbackSuccess}>
                        <Check size={24} /> Correct!
                        <button className={styles.nextBtn} onClick={generateQuestion}>
                            Next <ArrowRight size={20} />
                        </button>
                    </div>
                )}

                {feedback === 'incorrect' && (
                    <div className={styles.feedbackError}>
                        Try Again! {targetNumber} is <strong>{toRoman(targetNumber)}</strong>, but try to build it yourself!
                        <button className={styles.retryBtn} onClick={() => { setFeedback(null); setCurrentRoman(''); }}>
                            <RefreshCcw size={16} /> Retry
                        </button>
                    </div>
                )}

                <div className={styles.helperChart}>
                    <h3>Reference Chart</h3>
                    <div className={styles.chartGrid}>
                        {ROMAN_VALUES.map(({ symbol, value }) => (
                            <div key={symbol} className={styles.chartItem}>
                                <strong>{symbol}</strong> = {value}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RomanNumeralsGame;
