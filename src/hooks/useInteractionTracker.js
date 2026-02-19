import { useState, useEffect, useCallback } from 'react';

const useInteractionTracker = (gameName) => {
    const [interactions, setInteractions] = useState([]);

    const logInteraction = useCallback((type, details) => {
        const interaction = {
            timestamp: Date.now(),
            game: gameName,
            type,
            details,
        };

        // In a real app, we might batch these or send to an analytics service
        setInteractions((prev) => {
            const newInteractions = [...prev, interaction];
            // Save to localStorage for Analytics
            const stored = JSON.parse(localStorage.getItem('math_app_interactions') || '[]');
            localStorage.setItem('math_app_interactions', JSON.stringify([...stored, interaction]));
            return newInteractions;
        });

        console.log(`[Interaction] ${gameName}: ${type}`, details);
    }, [gameName]);

    const handleKeyDown = useCallback((e) => {
        logInteraction('keydown', { key: e.key, code: e.code });
    }, [logInteraction]);

    const handleClick = useCallback((e) => {
        // Log meaningful clicks (e.g., buttons, interactive elements)
        // We can filter by target if needed
        if (e.target.tagName === 'BUTTON' || e.target.closest('button') || e.target.dataset.interactive) {
            logInteraction('click', {
                x: e.clientX,
                y: e.clientY,
                target: e.target.tagName,
                label: e.target.innerText || e.target.ariaLabel
            });
        }
    }, [logInteraction]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('click', handleClick);
        };
    }, [handleKeyDown, handleClick]);

    return { interactions, logInteraction };
};

export default useInteractionTracker;
