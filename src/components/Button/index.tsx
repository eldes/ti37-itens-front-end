import styles from './style.module.css';

type Props = {
  label: string;
  onClick?: () => void;
};

const Button: React.FC<Props> = function (props) {
  return (
    <button onClick={props.onClick} className={styles.button}>{props.label}</button>
  );
};


export default Button;