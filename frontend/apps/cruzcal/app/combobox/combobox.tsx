import styles from './combobox.module.css';

/* eslint-disable-next-line */
export interface ComboboxProps {}

export function Combobox(props: ComboboxProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Combobox!</h1>
    </div>
  );
}

export default Combobox;
