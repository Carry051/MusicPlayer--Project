import { FC } from 'react';

import {
    TbPlayerPause,
    TbPlayerTrackPrev,
    TbPlayerSkipForward,
    TbPlayerTrackNext,
} from 'react-icons/tb';

type ControlButtonsProps = {
    onPrev: () => void;
    onNext: () => void;
    handlePlaySound: () => void;
    isPlaying: boolean;
};

const ControlButtons: FC<ControlButtonsProps> = ({
    onPrev,
    onNext,
    handlePlaySound,
    isPlaying,
}) => {
    return (
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
    );
};

export default ControlButtons;
