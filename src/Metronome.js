import React from 'react';
import hihat from './samples/HH2.wav';
import kick from './samples/BD2.wav';
import useSound from 'use-sound';
import { PauseCircle } from 'react-feather';
import { PlayCircle } from 'react-feather';
import { useInterval } from 'usehooks-ts'
import { useLocalStorage } from 'usehooks-ts'

const defaultBPM = 80;
const defaultBeatCount = 4;
const defaultNoteKind = 4;

function Metronome() {
  const [playHiHat] = useSound(hihat);
  const [playKick] = useSound(kick);

  const [isPlaying, setPlaying] = React.useState(false);
  const [bpm, setBPM] = useLocalStorage('bpm', defaultBPM)
  const [beatCount, setBeatCount] = useLocalStorage('beatCount', defaultBeatCount)
  const [currentBeat, setCurrentBeat] = React.useState(0)
  const [beats, setBeats] = React.useState([]);
  const [noteKind, setNoteKind] = useLocalStorage('noteKind', defaultNoteKind)
  const dimensions = { size: 40 }
  const icon = isPlaying ? <PauseCircle {...dimensions} /> : <PlayCircle {...dimensions} />;

  useInterval(() => {
    if (currentBeat >= beatCount - 1)
      setCurrentBeat(0);
    else
      setCurrentBeat(currentBeat + 1);

  },
    isPlaying ? (1000 * 60 / bpm) : null
  )

  const handleClick = () => {
    setPlaying(!isPlaying)
  }

  React.useEffect(() => {
    const shouldPlayKick = currentBeat === 0;
    if (shouldPlayKick)
      playKick();
    else
      playHiHat();
  }, [currentBeat, playKick, playHiHat])

  React.useEffect(() => {
    const beats = Array.from(Array(beatCount).keys()).map((i) => {
      if (currentBeat === i)
        return <div key={i} className="border-2 border-black-200 rounded py-1 m-2 h-10 bg-yellow-100"></div>
      else
        return <div key={i} className="border-2 border-black-200 rounded py-1 m-2 h-10 bg-green-100"></div>
    });

    setBeats(beats);

  }, [currentBeat, beatCount])

  return <div>

    <div className="grid">
      <h1 className="text-2xl">Metronome</h1>

      <div className=" py-1 m-2">
        <h2>BPM</h2>
        <input
          name="bpm"
          type="number"
          onChange={(e) => setBPM(parseInt(e.target.value, 10))}
          value={bpm}
          className="border-2 border-zinc-400 rounded text-center	"
          min={60}
          max={200}
          step={1}
        />
      </div>
      <div className="py-1 m-2">
        <input
          name="beatCount"
          type="number"
          onChange={(e) => setBeatCount(parseInt(e.target.value, 10))}
          value={beatCount}
          className="border-2 border-zinc-400 rounded text-center mr-1"
          min={1}
          max={16}
          step={1}
        />

        /

        <input
          name="noteKind"
          type="number"
          onChange={(e) => setNoteKind(parseInt(e.target.value, 10))}
          value={noteKind}
          className="border-2 border-zinc-400 rounded text-center ml-1"
          min={1}
          max={16}
          step={1}
        />
      </div>
      <div className="grid grid-flow-col mx-2">
        {beats}
      </div>
      <div className="mt-2 mx-auto">
        <div onClick={handleClick}>{icon}</div>
      </div>
    </div>

  </div >
}


export default Metronome;
