import useSound from 'use-sound';
import { useInterval } from 'usehooks-ts'
import snare from './samples/snare.wav';
import React from 'react';
import { Play } from 'react-feather';
import { Pause } from 'react-feather';



const PlayButton = () => {
  const [play] = useSound(snare);

  return <button onClick={play}>Boom!</button>;
};


const defaultBPM = 80;
function Metronome() {
  const [isPlaying, setPlaying] = React.useState(false);
  const [bpm, setBPM] = React.useState(defaultBPM);
  const [play] = useSound(snare);

  useInterval(() => {
    play()
  },
    isPlaying ? (1000 * 60 / bpm) : null
  )

  const label = isPlaying ? <Pause /> : <Play />

  return <div>
    <h3>Metronome</h3>
    <h4>{bpm} BPM</h4>
    <input type="range"
      onChange={(e) => setBPM(e.target.value)}
      value={bpm}
      min={60}
      max={200}
      step={1}
    />
    <button onClick={() => setPlaying(!isPlaying)}>{label}
    </button>
  </div>
}


export default Metronome;
