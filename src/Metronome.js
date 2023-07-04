import useSound from 'use-sound';
import { useInterval } from 'usehooks-ts'
import hihat from './samples/HH2.wav';
import kick from './samples/BD2.wav';
import React from 'react';
import { PlayCircle } from 'react-feather';
import { PauseCircle } from 'react-feather';


const defaultBPM = 80;
function Metronome() {
  const [playHiHat] = useSound(hihat);
  const [playKick] = useSound(kick);
  const [isPlaying, setPlaying] = React.useState(false);
  const [bpm, setBPM] = React.useState(defaultBPM);
  const [count, setCount] = React.useState(0);

  useInterval(() => {
    setCount(count + 1)
    const shouldPlayKick = (count % 4) === 0;
    if (shouldPlayKick)
      playKick();
    else
      playHiHat();
  },
    isPlaying ? (1000 * 60 / bpm) : null
  )


  const handleClick = () => {
    if (isPlaying)
      setCount(0);

    setPlaying(!isPlaying)
  }

  const aText = isPlaying ? <PauseCircle size="100" /> : <PlayCircle size="100" />;

  return <div>
    <h3>Metronome</h3>
    <h4>{bpm} BPM</h4>
    <input
      type="range"
      onChange={(e) => setBPM(e.target.value)}
      value={bpm}
      min={60}
      max={200}
      step={1}
    />
    <br />
    <a onClick={handleClick}>{aText}</a>
  </div >
}


export default Metronome;
