import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import styles from './Analytics.module.css';

const Analytics = () => {
    const [data, setData] = useState([]);
    const [gameStats, setGameStats] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const stored = JSON.parse(localStorage.getItem('math_app_interactions') || '[]');
            setData(stored);

            // Process data for charts
            const stats = {
                RoundingGame: { correct: 0, total: 0 },
                PlaceValueGame: { correct: 0, total: 0 },
                RomanNumeralsGame: { correct: 0, total: 0 }
            };

            stored.forEach(interaction => {
                if (interaction.type === 'check_answer' || interaction.type === 'answer_check') {
                    const game = interaction.game;
                    if (stats[game]) {
                        stats[game].total += 1;
                        if (interaction.details.correct) {
                            stats[game].correct += 1;
                        }
                    }
                }
            });

            const chartData = Object.keys(stats).map(game => ({
                name: game.replace('Game', ''),
                Correct: stats[game].correct,
                Incorrect: stats[game].total - stats[game].correct,
                Total: stats[game].total
            }));

            setGameStats(chartData);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const COLORS = ['#00C49F', '#FF8042'];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Performance Analytics</h1>

            <div className={styles.gridLayout}>
                <div className={styles.card}>
                    <h2>Correct vs Incorrect Answers</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={gameStats}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Correct" fill="#2ecc71" />
                            <Bar dataKey="Incorrect" fill="#e74c3c" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className={styles.card}>
                    <h2>Total Attempts per Game</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={gameStats}
                                dataKey="Total"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            >
                                {gameStats.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className={styles.rawLog}>
                <h2>Recent Interactions Log</h2>
                <div className={styles.logList}>
                    {data.slice(-10).reverse().map((item, idx) => (
                        <div key={idx} className={styles.logItem}>
                            <strong>{new Date(item.timestamp).toLocaleTimeString()}</strong> - {item.game}: {item.type}
                            <span className={styles.details}>{JSON.stringify(item.details)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
