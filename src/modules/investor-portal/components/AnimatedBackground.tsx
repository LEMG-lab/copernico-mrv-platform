import React from 'react';

/**
 * AnimatedBackground - Premium floating gradient orbs with visible motion
 * Elegant animations that are subtle but perceptible
 * CSS-only animations for optimal performance
 */
const AnimatedBackground: React.FC = () => {
    return (
        <div className="animated-bg-container">
            {/* Animated gradient base */}
            <div className="gradient-base" />

            {/* Primary orbs - larger and more visible */}
            <div className="animated-orb orb-1" />
            <div className="animated-orb orb-2" />
            <div className="animated-orb orb-3" />

            {/* Secondary pulsing orbs */}
            <div className="animated-orb orb-4" />
            <div className="animated-orb orb-5" />
            <div className="animated-orb orb-6" />

            {/* Subtle grid pattern */}
            <div className="grid-pattern" />

            {/* Vignette overlay */}
            <div className="vignette-overlay" />

            <style>{`
                .animated-bg-container {
                    position: fixed;
                    inset: 0;
                    z-index: 0;
                    overflow: hidden;
                    pointer-events: none;
                    background: #0a0f1a;
                }

                .gradient-base {
                    position: absolute;
                    inset: 0;
                    background: 
                        radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
                        radial-gradient(ellipse 60% 80% at 100% 100%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                        radial-gradient(ellipse 60% 60% at 0% 100%, rgba(139, 92, 246, 0.08) 0%, transparent 50%);
                    animation: baseShift 20s ease-in-out infinite;
                }

                @keyframes baseShift {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
                
                .animated-orb {
                    position: absolute;
                    border-radius: 50%;
                    will-change: transform, opacity;
                }
                
                /* Main cyan orb - top right, very visible */
                .orb-1 {
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, rgba(6, 182, 212, 0.5) 0%, rgba(6, 182, 212, 0.2) 40%, transparent 70%);
                    filter: blur(60px);
                    top: -100px;
                    right: -50px;
                    animation: orb1Move 12s ease-in-out infinite, orb1Pulse 4s ease-in-out infinite;
                }
                
                /* Blue orb - bottom left */
                .orb-2 {
                    width: 450px;
                    height: 450px;
                    background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.15) 40%, transparent 70%);
                    filter: blur(50px);
                    bottom: -100px;
                    left: -100px;
                    animation: orb2Move 15s ease-in-out infinite, orb2Pulse 5s ease-in-out infinite;
                }
                
                /* Purple orb - center */
                .orb-3 {
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%);
                    filter: blur(70px);
                    top: 30%;
                    left: 20%;
                    animation: orb3Move 18s ease-in-out infinite, orb3Pulse 6s ease-in-out infinite;
                }
                
                /* Small accent orb - pulsing cyan */
                .orb-4 {
                    width: 200px;
                    height: 200px;
                    background: radial-gradient(circle, rgba(34, 211, 238, 0.6) 0%, transparent 70%);
                    filter: blur(40px);
                    top: 15%;
                    right: 25%;
                    animation: orb4Pulse 3s ease-in-out infinite;
                }
                
                /* Small accent orb - top left */
                .orb-5 {
                    width: 250px;
                    height: 250px;
                    background: radial-gradient(circle, rgba(20, 184, 166, 0.4) 0%, transparent 70%);
                    filter: blur(45px);
                    top: 5%;
                    left: 10%;
                    animation: orb5Move 10s ease-in-out infinite;
                }
                
                /* Small accent orb - bottom right */
                .orb-6 {
                    width: 180px;
                    height: 180px;
                    background: radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, transparent 70%);
                    filter: blur(35px);
                    bottom: 15%;
                    right: 10%;
                    animation: orb6Pulse 4s ease-in-out infinite, orb6Move 14s ease-in-out infinite;
                }

                .grid-pattern {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
                    background-size: 60px 60px;
                    mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 70%);
                }

                .vignette-overlay {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(ellipse 80% 80% at 50% 50%, transparent 0%, rgba(10, 15, 26, 0.8) 100%);
                }
                
                /* Orb 1 animations - fast and visible */
                @keyframes orb1Move {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(-40px, 30px) scale(1.05); }
                    50% { transform: translate(-20px, 60px) scale(0.95); }
                    75% { transform: translate(30px, 20px) scale(1.02); }
                }
                
                @keyframes orb1Pulse {
                    0%, 100% { opacity: 0.8; }
                    50% { opacity: 1; }
                }
                
                /* Orb 2 animations */
                @keyframes orb2Move {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(50px, -40px) rotate(5deg); }
                    66% { transform: translate(20px, -60px) rotate(-3deg); }
                }
                
                @keyframes orb2Pulse {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 0.95; }
                }
                
                /* Orb 3 animations - slow drift */
                @keyframes orb3Move {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(80px, 40px); }
                }
                
                @keyframes orb3Pulse {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 0.85; }
                }
                
                /* Orb 4 - fast pulse */
                @keyframes orb4Pulse {
                    0%, 100% { 
                        opacity: 0.5; 
                        transform: scale(1);
                    }
                    50% { 
                        opacity: 0.9; 
                        transform: scale(1.15);
                    }
                }
                
                /* Orb 5 - gentle float */
                @keyframes orb5Move {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(30px, 40px); }
                }
                
                /* Orb 6 animations */
                @keyframes orb6Pulse {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 0.9; }
                }
                
                @keyframes orb6Move {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(-30px, -20px); }
                }
            `}</style>
        </div>
    );
};

export default AnimatedBackground;
