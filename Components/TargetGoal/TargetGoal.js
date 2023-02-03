import React from 'react';
import Card from '../Card';
import Button from '../Button';
import styles from './TargetGoal.module.scss';

const TargetGoal = ({ attempts, hits, onHit }) => {
  return (
    <Card className={styles.container}>
      {attempts > 0 && (
        <span className={styles.goal}>
          Rezultat {hits}/{attempts}
        </span>
      )}
      <Button className={styles.btn} onClick={onHit}>
        Ciljaj
      </Button>
    </Card>
  );
};

export default TargetGoal;
