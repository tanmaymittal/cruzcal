import styles from './combobox-select.module.css';

/* eslint-disable-next-line */
export interface ComboboxSelectProps {}

export function ComboboxSelect(props: ComboboxSelectProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ComboboxSelect!</h1>
    </div>
  );
}

export default ComboboxSelect;
