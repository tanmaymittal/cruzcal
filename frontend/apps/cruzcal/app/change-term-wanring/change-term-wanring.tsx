import styles from './change-term-wanring.module.css';

/* eslint-disable-next-line */
export interface ChangeTermWanringProps {}

export function ChangeTermWanring(props: ChangeTermWanringProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ChangeTermWanring!</h1>
    </div>
  );
}

export default ChangeTermWanring;
