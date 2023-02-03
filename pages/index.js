import { useCallback, useEffect, useMemo, useState } from 'react';
import getRandomNum from '../utils/getRandomNum';
import TargetGoal from '../Components/TargetGoal';
import NUMBER_OF_GOALS from '../constants/NUMBER_OF_GOALS';
import Result from '../Components/Result/Result';

const yellow = '0xFFFF00';
const green = '0x00FF00';
const red = '0xFF0000';
const black = '0x000000';

const App = () => {
  const ws = useMemo(() => {
    if (typeof window !== 'undefined') {
      return new WebSocket('ws://192.168.1.126/ws');
    }

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const [chosenGoal, setChosenGoal] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [hits, setHits] = useState(0);

  return (
    <>
      {chosenGoal ? (
        <Result
          chosenGoal={chosenGoal}
          onHit={() => {
            setAttempts(attempts + 1);
            setHits(hits + 1);
            setChosenGoal(null);
            ws.send(`${chosenGoal}:${green}`);
          }}
          onMiss={() => {
            setAttempts(attempts + 1);
            setChosenGoal(null);
            ws.send(`${chosenGoal}:${red}`);
          }}
          attempts={attempts}
          hits={hits}
          setAttempts={setAttempts}
          setHits={setHits}
          setChosenGoal={setChosenGoal}
        />
      ) : (
        <TargetGoal
          attempts={attempts}
          hits={hits}
          currentGoal={chosenGoal}
          onHit={() => {
            const randomNum = getRandomNum({ to: NUMBER_OF_GOALS });

            // -1 is used for reset
            ws.send(`-1:${black}`);
            ws.send(`${randomNum}:${yellow}`);
            setChosenGoal(randomNum);
          }}
        />
      )}
    </>
  );
};

export default App;
