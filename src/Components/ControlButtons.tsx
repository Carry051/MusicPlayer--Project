import { FC, useState } from 'react';
import { motion } from 'framer-motion';

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
    const [isAnimatingPrev, setIsAnimatingPrev] = useState(false);
    const [isAnimatingNext, setIsAnimatingNext] = useState(false);

    const handlePrevClick = () => {
        setIsAnimatingPrev(true);
        onPrev();

        setTimeout(() => {
            setIsAnimatingPrev(false);
        }, 450);
    };

    const handleNextClick = () => {
        setIsAnimatingNext(true);
        onNext();

        setTimeout(() => {
            setIsAnimatingNext(false);
        }, 450);
    };

    return (
        <div className='flex gap-20'>
            <motion.button
                onClick={handlePrevClick}
                className='hover:text-blue-500 outline-none'
                animate={{
                    x: isAnimatingPrev ? -30 : 0,
                    opacity: isAnimatingPrev ? 0 : 1,
                }}
                transition={{
                    x: { type: 'tween', duration: 0.4 },
                    opacity: { duration: 0.2, delay: 0.3 },
                }}
                initial={false}
            >
                <TbPlayerTrackPrev size={30} />
            </motion.button>
            <button
                onClick={handlePlaySound}
                className='hover:text-blue-500 outline-none'
            >
                {isPlaying ? (
                    <TbPlayerPause size={30} />
                ) : (
                    <TbPlayerSkipForward size={30} />
                )}
            </button>
            <motion.button
                onClick={handleNextClick}
                className='hover:text-blue-500 outline-none'
                animate={{
                    x: isAnimatingNext ? 30 : 0,
                    opacity: isAnimatingNext ? 0 : 1,
                }}
                transition={{
                    x: { type: 'tween', duration: 0.4 },
                    opacity: { duration: 0.2, delay: 0.3 },
                }}
                initial={false}
            >
                <TbPlayerTrackNext size={30} />
            </motion.button>
        </div>
    );
};

export default ControlButtons;
