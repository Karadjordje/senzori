import React from 'react';
import cx from 'classnames';
import Button from '../Button';
import Card from '../Card';
import styles from './Result.module.scss';

const Result = ({ chosenGoal, onHit, onMiss }) => {
  if (!chosenGoal) {
    return null;
  }

  return (
    <Card className={styles.container}>
      <span className={styles.goal}>Trenutno izabran gol broj {chosenGoal}</span>
      <div className={styles.btnWrapper}>
        <Button className={cx(styles.btn, styles.hit)} onClick={onHit}>
          Pogodak
        </Button>
        <Button className={cx(styles.btn, styles.miss)} onClick={onMiss}>
          Promašaj
        </Button>
      </div>
    </Card>
  );
};

export default Result;
