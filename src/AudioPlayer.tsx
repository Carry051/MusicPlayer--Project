import { TbPlayerTrackNext } from 'react-icons/tb';
import { TbPlayerTrackPrev } from 'react-icons/tb';
import { TbPlayerPause } from 'react-icons/tb';
import { TbPlayerSkipForward } from 'react-icons/tb';
import { GoUnmute } from 'react-icons/go';
import { GoMute } from 'react-icons/go';
import { useEffect, useRef, useState } from 'react';
import music1 from '/src/assets/audio/music1.mp3';

const AudioPlayer = () => {
    const audio = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1.0);
    const [isMuted, setIsMuted] = useState(false);
    // const [duration, setDuration] = useState(0);
    // const [currentTime, setCurrentTime] = useState(0);
    // const [fileName, setFileName] = useState('');

    useEffect(() => {
        audio.current = new Audio(music1);
        audio.current.loop = true;
    }, [audio]);

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

    return (
        <div className=' flex justify-center h-screen items-center text-white '>
            <div className='border-[1px] rounded-lg  w-[600px] h-[720px] flex flex-col gap-6 items-center '>
                <div className='mt-10'>
                    <img
                        src='https://i.scdn.co/image/ab67616d0000b273ed50c8fe9503fd8d73d82f9f'
                        alt=''
                        className='rounded-xl w-[400px] '
                    />
                </div>
                <div>
                    <h1 className='text-4xl'>Snowfall</h1>
                    <h2 className='text-2xl text-center text-gray-400'>
                        Øneheart
                    </h2>
                </div>
                <div>0:00 ------------------------------------- 2:00</div>
                <div className='flex gap-20'>
                    <button>
                        <TbPlayerTrackPrev size={30} />
                    </button>
                    <button onClick={handlePlaySound}>
                        {isPlaying ? (
                            <TbPlayerPause size={30} />
                        ) : (
                            <TbPlayerSkipForward size={30} />
                        )}
                    </button>
                    <button>
                        <TbPlayerTrackNext size={30} />
                    </button>
                </div>
                <div className='flex items-center gap-4 '>
                    <input
                        type='range'
                        className=' w-[250px]'
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

export default AudioPlayer;
