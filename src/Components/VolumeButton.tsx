import { FC } from 'react';
import { GoMute, GoUnmute } from 'react-icons/go';

type VolumeButtonProps = {
    handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleMute: () => void;
    volume: number;
    isMuted: boolean;
};

const VolumeButton: FC<VolumeButtonProps> = ({
    handleVolumeChange,
    volume,
    handleMute,
    isMuted,
}) => {
    return (
        <div className='flex items-center gap-4 '>
            <input
                type='range'
                className='   volumeButton'
                onChange={(e) => handleVolumeChange(e)}
                value={volume * 100}
            />
            <p className='w-10'>{Math.floor(volume * 100) + '%'}</p>
            <button onClick={handleMute} className='hover:text-blue-500'>
                {isMuted ? <GoMute size={30} /> : <GoUnmute size={30} />}
            </button>
        </div>
    );
};

export default VolumeButton;
