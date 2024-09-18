import { useAudioPlayer } from './hooks/useAudioPlayer';

import VolumeButton from './Components/VolumeButton';
import ProgressAudioBar from './Components/ProgressAudioBar';
import ControlButtons from './Components/ControlButtons';

const AudioPlayer = () => {
    const {
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
    } = useAudioPlayer();

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
                <ProgressAudioBar
                    currentTime={currentTime}
                    handleProgressChange={handleProgressChange}
                    progressBar={progressBar}
                    progress={progress}
                    duration={duration}
                />

                <ControlButtons
                    onPrev={onPrev}
                    onNext={onNext}
                    handlePlaySound={handlePlaySound}
                    isPlaying={isPlaying}
                />
                <VolumeButton
                    handleVolumeChange={handleVolumeChange}
                    handleMute={handleMute}
                    volume={volume}
                    isMuted={isMuted}
                />
            </div>
        </div>
    );
};

export default AudioPlayer;
