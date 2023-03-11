import { useCallback, useEffect, useMemo, useState } from 'react';
import getRandomNum from '../utils/getRandomNum';
import TargetGoal from '../Components/TargetGoal';
import {NUMBER_OF_GOALS, GOALS_RANGES} from '../constants/goals';
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

  const resetGoals = useCallback(() => ws.send(`-1:-1:${black}\0`), [ws]);
  const highlightGoal = useCallback((goalIndex, color) => {
    const goalIndices = GOALS_RANGES[goalIndex];
    for (const [startIndex, endIndex] of goalIndices) {
      ws.send(`${startIndex}:${endIndex}:${color}\0`);
    }
  }, [ws]);

  return (
    <>
      {chosenGoal !== null ? (
        <Result
          chosenGoal={chosenGoal + 1}
          onHit={() => {
            setAttempts(attempts + 1);
            setHits(hits + 1);
            setChosenGoal(null);
            highlightGoal(chosenGoal, green);
          }}
          onMiss={() => {
            setAttempts(attempts + 1);
            setChosenGoal(null);
            highlightGoal(chosenGoal, red);
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
            const goalIndex = getRandomNum({ to: NUMBER_OF_GOALS });
            resetGoals();
            highlightGoal(goalIndex, yellow);
            setChosenGoal(goalIndex);
          }}
        />
      )}
    </>
  );
};

export default App;
