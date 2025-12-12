import React, { useEffect } from 'react';
import './IntroAnimation.css'; // Import the styles

const IntroAnimation = ({ onComplete }) => {
    
    useEffect(() => {
        // The animation takes about 4 seconds total.
        // We wait 4.5 seconds (4500ms) to be safe, then call onComplete.
        const timer = setTimeout(() => {
            if (onComplete) {
                onComplete();
            }
        }, 4500);

        return () => clearTimeout(timer); // Cleanup if user closes tab
    }, [onComplete]);

    return (
        <div className="intro-overlay">
            <div className="netflix-intro" data-letter="O">
                <div className="helper-1">
                    <div className="effect-brush">
                        {/* We need 31 fur spans for the effect */}
                        {[...Array(31)].map((_, i) => (
                            <span key={`fur-${i}`} className={`fur-${i + 1}`}></span>
                        ))}
                    </div>
                    <div className="effect-lumieres">
                        {/* We need 28 lamp spans for the sparkle effect */}
                        {[...Array(28)].map((_, i) => (
                            <span key={`lamp-${i}`} className={`lamp-${i + 1}`}></span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntroAnimation;