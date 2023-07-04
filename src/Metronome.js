import React from 'react';
import hihat from './samples/HH2.wav';
import kick from './samples/BD2.wav';
import useSound from 'use-sound';
import { PauseCircle } from 'react-feather';
import { PlayCircle } from 'react-feather';
import { useInterval } from 'usehooks-ts'
import { useLocalStorage } from 'usehooks-ts'



const defaultBPM = 80;
function Metronome() {
  const [playHiHat] = useSound(hihat);
  const [playKick] = useSound(kick);

  const [isPlaying, setPlaying] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [bpm, setBPM] = useLocalStorage('bpm', defaultBPM)

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
  const dimensions = { size: 80 }
  const icon = isPlaying ? <PauseCircle {...dimensions} /> : <PlayCircle {...dimensions} />;

  return <div>
    <h3>Metronome</h3>
    <h4>{bpm} BPM</h4>
    <input
      type="range"
      onChange={(e) => setBPM(parseInt(e.target.value, 10))}
      value={bpm}
      min={60}
      max={200}
      step={1}
    />
    <br />
    <div onClick={handleClick}>{icon}</div>
  </div >
}


export default Metronome;
