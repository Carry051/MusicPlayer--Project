import { FC, RefObject } from 'react';

type ProgressAudioBarProps = {
    currentTime: string;
    duration: string;
    progressBar: RefObject<HTMLInputElement> | null; // Зміна типу на RefObject<HTMLInputElement>
    progress: number;
    handleProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const ProgressAudioBar: FC<ProgressAudioBarProps> = ({
    currentTime,
    handleProgressChange,
    progressBar,
    progress,
    duration,
}) => {
    return (
        <div className='flex items-center justify-center gap-5 w-full'>
            <span>{currentTime}</span>
            <input
                className='max-w-[100%] bg-gray-300 cursor-pointer outline-none'
                type='range'
                onChange={handleProgressChange}
                ref={progressBar}
                value={progress}
            />
            <span>{duration}</span>
        </div>
    );
};

export default ProgressAudioBar;
