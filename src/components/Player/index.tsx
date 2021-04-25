import { useContext, useRef, useEffect } from 'react';
import Image from 'next/image';
import Slider from 'rc-slider';

import { PlayerContext } from '../../contexts/PlayerContext';

import styles from './styles.module.scss';
import 'rc-slider/assets/index.css';

export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const { 
    episodeList, 
    currentEpisodeIndex, 
    isPlaying,
    togglePlay, 
    setPlayingState
  } = useContext(PlayerContext);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying])



  const episode = episodeList[currentEpisodeIndex];

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/images/playing.svg" alt="Now playing"/>
        <strong>Now playing</strong>
      </header>

      { episode ? (
        <div className={styles.playingEpisode}>
          <Image 
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Select a podcast to listen to</strong>
        </div>
      ) }

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            { episode ? (
              <Slider 
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider} />
            ) }
          </div>
          <span>00:00</span>
        </div>

        { episode && (
          <audio 
            src={episode.url} 
            ref={audioRef}
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
        ) }

        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/images/shuffle.svg" alt="Shuffle"/>
          </button>
          <button type="button" disabled={!episode}>
            <img src="/images/play-previous.svg" alt="Play previous"/>
          </button>
          <button 
            type="button" 
            className={styles.playButton} 
            disabled={!episode}
            onClick={togglePlay}
          >
            { isPlaying ? (
              <img src="/images/pause.svg" alt="Pause"/>
            ) : (
              <img src="/images/play.svg" alt="Play"/>
            ) }
          </button>
          <button type="button" disabled={!episode}>
            <img src="/images/play-next.svg" alt="Play next"/>
          </button>
          <button type="button" disabled={!episode}>
            <img src="/images/repeat.svg" alt="Repeat"/>
          </button>
        </div>
      </footer>
    </div>
  );
}