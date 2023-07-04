import useSound from 'use-sound';
import { useInterval } from 'usehooks-ts'
import snare from './samples/snare.wav';
import React from 'react';
import { PlayCircle } from 'react-feather';
import { PauseCircle } from 'react-feather';



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

  const label = isPlaying ? <PauseCircle size="100" /> : <PlayCircle size="100" />;

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
    <br />
    <a onClick={() => setPlaying(!isPlaying)}>{label}
    </a>
  </div>
}


export default Metronome;
