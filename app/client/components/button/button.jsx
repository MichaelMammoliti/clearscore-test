import styles from './button.scss';

const Button = ({ text, onClick }) => (
  <button
    className={styles.button}
    onClick={onClick}
  >
    {text}
  </button>
);

Button.displayName = 'Button';
Button.defaultProps = {
  onClick: () => {},
};

export default Button;
