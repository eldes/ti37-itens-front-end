import styles from './FAB.module.css';

type Props = {
  text: string;
  onClick?: () => void;
};

const FAB: React.FC<Props> = function (props) {
  return (
    <button className={styles.FAB} onClick={props.onClick}>{props.text}</button>
  );
};


export default FAB;