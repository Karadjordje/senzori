import React from 'react';
import cx from 'classnames';
import styles from './Card.module.scss';

const Card = ({ children, className }) => <div className={cx(styles.card, className)}>{children}</div>;

export default Card;
