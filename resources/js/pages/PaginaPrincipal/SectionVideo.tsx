import React, { useRef, useState } from 'react';
import { PlayIcon, PauseIcon, InfoCircleIcon } from './icons';
import './style.css';

const SectionVideo: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleVideoToggle = () => {
        const video = videoRef.current;
        if (video) {
            if (isPlaying) {
                video.pause();
            } else {
                video.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVideoEnded = () => {
        setIsPlaying(false);
    };

    return (
        <section className="welcome-video-section" id="video">
            <div className="container">
                <h2 className="section-title">Inspección de Vehículos de Lujo</h2>
                <p style={{
                    textAlign: "center",
                    maxWidth: "800px",
                    margin: "0 auto 2rem",
                    color: "var(--dark-blue)"
                }}>
                    Nuestro proceso de avalúo incluye una inspección minuciosa del interior
                    y exterior del vehículo para determinar su valor real con precisión.
                </p>

                <div className="video-container">
                    <video
                        id="luxuryCarVideo"
                        ref={videoRef}
                        poster="https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80"
                        onClick={handleVideoToggle}
                        onEnded={handleVideoEnded}
                    >
                        <source
                            src="https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-inside-a-modern-garage-41555-large.mp4"
                            type="video/mp4"
                        />
                        Tu navegador no soporta la reproducción de videos.
                    </video>
                    <div className="video-overlay">
                        <div
                            className="play-btn"
                            id="playBtn"
                            onClick={handleVideoToggle}
                        >
                            {isPlaying ? <PauseIcon /> : <PlayIcon />}
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                    <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <InfoCircleIcon style={{ color: 'var(--primary-blue)' }} />
                        Video demostrativo de nuestro proceso de inspección interior en vehículos de alta gama.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SectionVideo;