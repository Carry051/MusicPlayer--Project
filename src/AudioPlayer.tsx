import { TbPlayerTrackNext } from 'react-icons/tb';
import { TbPlayerTrackPrev } from 'react-icons/tb';
import { TbPlayerPause } from 'react-icons/tb';
import { TbPlayerSkipForward } from 'react-icons/tb';
import { GoUnmute } from 'react-icons/go';
import { GoMute } from 'react-icons/go';
import { useEffect, useRef, useState } from 'react';
import { musicList } from './data/musicList';

const AudioPlayer = () => {
    const audio = useRef<HTMLAudioElement | null>(null);
    const progressBar = useRef<HTMLProgressElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1.0);
    const [isMuted, setIsMuted] = useState(false);
    const [duration, setDuration] = useState('00:00');
    const [currentTime, setCurrentTime] = useState('00:00');
    const [progress, setProgress] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(0);

    const onNext = () => {
        setCurrentTrack((prevTrack) => (prevTrack + 1) % musicList.length);
    };

    const onPrev = () => {
        setCurrentTrack(
            (prevTrack) => (prevTrack - 1 + musicList.length) % musicList.length
        );
        console.log(musicList[currentTrack].track);
    };

    useEffect(() => {
        if (audio.current) {
            audio.current.pause();
        }

        audio.current = new Audio(musicList[currentTrack].track);

        audio.current.addEventListener('ended', onNext);

        audio.current.addEventListener('loadedmetadata', () => {
            setDuration(formatTime(audio.current?.duration || 0));
            setCurrentTime(formatTime(audio.current?.currentTime || 0));

            if (progressBar.current) {
                progressBar.current.max = `${audio.current?.duration}`;
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

        if (isPlaying) {
            audio.current.play();
        }

        return () => {
            if (audio.current) {
                audio.current.removeEventListener('loadedmetadata', () => {});
                audio.current.removeEventListener('timeupdate', () => {});
            }
        };
    }, [currentTrack]);

    const handlePlaySound = () => {
        setIsPlaying(!isPlaying);

        if (audio.current !== null) {
            if (isPlaying) {
                audio.current.pause();
            } else {
                audio.current.play();
            }
        }
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

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = +e.target.value;
        if (audio.current) {
            audio.current.currentTime = newTime;
        }
        setProgress(newTime);
    };

    return (
        <div className=' flex justify-center h-screen items-center text-white '>
            <div className='border-[1px] rounded-lg  w-[600px] h-[720px] flex flex-col gap-6 items-center '>
                <div className='mt-10'>
                    <img
                        src={musicList[currentTrack].icon}
                        alt=''
                        className='rounded-xl w-[400px] '
                    />
                </div>
                <div>
                    <h1 className='text-4xl'>{musicList[currentTrack].name}</h1>
                    <h2 className='text-2xl text-center text-gray-400'>
                        {musicList[currentTrack].author}
                    </h2>
                </div>

                <div className='flex items-center justify-center gap-5 w-full'>
                    <span>{currentTime}</span>
                    <input
                        className='max-w-[100%] bg-gray-300 cursor-pointer'
                        type='range'
                        onChange={handleProgressChange}
                        ref={progressBar}
                        value={progress}
                    />
                    <span>{duration}</span>
                </div>
                <div className='flex gap-20'>
                    <button onClick={onPrev}>
                        <TbPlayerTrackPrev size={30} />
                    </button>
                    <button onClick={handlePlaySound}>
                        {isPlaying ? (
                            <TbPlayerPause size={30} />
                        ) : (
                            <TbPlayerSkipForward size={30} />
                        )}
                    </button>
                    <button onClick={onNext}>
                        <TbPlayerTrackNext size={30} />
                    </button>
                </div>
                <div className='flex items-center gap-4 '>
                    <input
                        type='range'
                        className=' w-[250px]  cursor-ew-resize'
                        onChange={(e) => handleVolumeChange(e)}
                        value={volume * 100}
                    />
                    <p className='w-10'>{Math.floor(volume * 100) + '%'}</p>
                    <button
                        onClick={handleMute}
                        className='hover:text-blue-500'
                    >
                        {isMuted ? (
                            <GoMute size={30} />
                        ) : (
                            <GoUnmute size={30} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

export default AudioPlayer;
