import { useEffect, useRef, useState } from 'react';
import { musicList } from '../data/musicList';

export const useAudioPlayer = () => {
    const audio = useRef<HTMLAudioElement | null>(null);
    const progressBar = useRef<HTMLInputElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1.0);
    const [isMuted, setIsMuted] = useState(false);
    const [duration, setDuration] = useState('00:00');
    const [currentTime, setCurrentTime] = useState('00:00');
    const [progress, setProgress] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(0);

    // Функція для ініціалізації нового треку
    const initAudio = () => {
        if (audio.current) {
            audio.current.pause();
        }
        audio.current = new Audio(musicList[currentTrack].track);
        audio.current.volume = volume;
        audio.current.addEventListener('ended', onNext);

        audio.current.addEventListener('loadedmetadata', () => {
            setDuration(formatTime(audio.current?.duration || 0));
            setCurrentTime(formatTime(audio.current?.currentTime || 0));

            if (progressBar.current && audio.current?.duration !== undefined) {
                progressBar.current.max = `${audio.current.duration}`;
            }
        });

        audio.current.addEventListener('timeupdate', () => {
            const current = audio.current?.currentTime || 0;
            setCurrentTime(formatTime(current));
            setProgress(current);

            if (progressBar.current) {
                progressBar.current.value = `${current}`;
            }
        });
    };

    // Виклик при зміні треку
    useEffect(() => {
        initAudio();
        if (isPlaying) {
            audio.current?.play();
        }
    }, [currentTrack]);

    // Запуск/паузи відтворення
    useEffect(() => {
        if (isPlaying) {
            audio.current?.play();
        } else {
            audio.current?.pause();
        }
    }, [isPlaying]);

    const handlePlaySound = () => {
        setIsPlaying((prev) => !prev);
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = +e.target.value;
        if (audio.current) {
            audio.current.currentTime = newTime;
        }
        setProgress(newTime);
    };

    const onNext = () => {
        setCurrentTrack((prevTrack) => (prevTrack + 1) % musicList.length);
    };

    const onPrev = () => {
        setCurrentTrack(
            (prevTrack) => (prevTrack - 1 + musicList.length) % musicList.length
        );
    };

    const handleMute = () => {
        setIsMuted(!isMuted);
        if (audio.current !== null) {
            if (!isMuted) {
                audio.current.volume = 0;
                setVolume(0);
            } else {
                audio.current.volume = 1;
                setVolume(1);
            }
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = +e.target.value / 100;
        setVolume(newVolume);
        if (audio.current !== null) {
            audio.current.volume = newVolume;

            if (newVolume === 0) {
                setIsMuted(true);
            } else {
                setIsMuted(false);
            }
        }
    };

    function formatTime(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${
            remainingSeconds < 10 ? '0' : ''
        }${remainingSeconds}`;
    }

    return {
        isPlaying,
        volume,
        isMuted,
        duration,
        currentTime,
        progress,
        currentTrack,
        musicList,
        onNext,
        onPrev,
        handlePlaySound,
        handleMute,
        handleVolumeChange,
        handleProgressChange,
        progressBar,
    };
};
