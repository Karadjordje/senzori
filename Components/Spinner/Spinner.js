import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Spinner.module.scss';

const Spinner = ({ secondary, className, ...props }) => (
  <div
    className={cx(styles.spinner, className, {
      [styles.secondary]: secondary,
      [styles.primary]: !secondary,
    })}
  >
    <div className={cx(styles.bounce1)}></div>
    <div className={cx(styles.bounce2)}></div>
    <div className={cx(styles.bounce3)}></div>
  </div>
);

Spinner.propTypes = {
  secondary: PropTypes.bool,
  className: PropTypes.string,
};

Spinner.defaultProps = {
  secondary: false,
};

export default Spinner;
