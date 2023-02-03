import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Spinner from '../Spinner';

import styles from './Button.module.scss';

const Button = ({
  href,
  type,
  children,
  disabled,
  secondary,
  tertiary,
  quaternary,
  small,
  loading,
  icon: Icon,
  iconProps: { className: iconClassName, ...otherIconProps },
  iconAfter,
  className,
  ...otherProps
}) => {
  let Element = 'button';
  const props = {};

  if (href && !(disabled || loading)) {
    Element = 'a';
    props.href = href;
  } else {
    props.type = type;
  }

  const buttonContent = (children) => {
    return (
      <React.Fragment>
        {Icon && !iconAfter && <Icon className={cx(styles.icon, iconClassName)} {...otherIconProps} />}
        {children}
        {Icon && iconAfter && (
          <Icon
            className={cx(styles.icon, iconClassName, {
              [styles.iconAfter]: iconAfter,
            })}
            {...otherIconProps}
          />
        )}
      </React.Fragment>
    );
  };

  return (
    <Element
      {...props}
      {...otherProps}
      className={cx(
        styles.button,
        {
          [styles.disabled]: disabled || loading,
          [styles.quaternary]: quaternary && !tertiary && !secondary,
          [styles.tertiary]: tertiary && !quaternary && !secondary,
          [styles.secondary]: secondary && !tertiary && !quaternary,
          [styles.primary]: !(secondary || tertiary || quaternary),
          [styles.small]: small,
        },
        className
      )}
      disabled={disabled || loading}
    >
      {loading ? (
        <Spinner data-qa="button-loading-spinner" secondary={secondary || tertiary} />
      ) : (
        buttonContent(children)
      )}
    </Element>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.object, PropTypes.func]),
  iconProps: PropTypes.object,
  iconAfter: PropTypes.bool,
  type: PropTypes.string,
  href: PropTypes.string,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  quaternary: PropTypes.bool,
  small: PropTypes.bool,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  secondary: false,
  tertiary: false,
  quaternary: false,
  iconProps: {},
};

export default Button;
