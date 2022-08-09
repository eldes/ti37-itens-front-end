import { ReactNode } from 'react';
import styles from './FAB.module.css';

type Props = {
  children: ReactNode;
  onClick?: () => void;
};

const FAB: React.FC<Props> = function (props) {
  return (
    <button className={styles.FAB} onClick={props.onClick}>{props.children}</button>
  );
};


export default FAB;