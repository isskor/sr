import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectSource } from '../../slices/player/playerSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  faPauseCircle,
  faPlayCircle,
} from '@fortawesome/free-regular-svg-icons';

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const source = useSelector(selectSource);
  const audioRef = useRef(null);

  useEffect(() => {
    if (source) {
      setIsPlaying(true);
      audioRef.current.play();
    }
  }, [source]);
  const play = () => {
    !isPlaying && audioRef.current.play();
    isPlaying && audioRef.current.pause();
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {source && (
        <StyledPlayer>
          <audio
            src={source?.liveaudio?.url || source?.url}
            ref={audioRef}
          ></audio>
          <div className='player'>
            <p>{source?.name || source?.title}</p>
            <button onClick={play}>
              {isPlaying ? (
                <FontAwesomeIcon
                  icon={faPauseCircle}
                  size='3x'
                  color='#da9efd'
                />
              ) : (
                <FontAwesomeIcon
                  icon={faPlayCircle}
                  size='3x'
                  color='#86e3f3'
                />
              )}
            </button>
          </div>
        </StyledPlayer>
      )}
    </>
  );
};

export default Player;

const StyledPlayer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  position: fixed;
  bottom: 0;
  width: 100%;

  .player {
    display: flex;
    justify-content: flex-end;
    padding: 0rem 1rem;
    align-items: center;
    gap: 2rem;
  }
  button {
    background: transparent;
    border: none;
    padding: 0.5rem;
    outline: none;
    color: #bb51f8;
  }
`;
