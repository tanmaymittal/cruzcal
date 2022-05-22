import styles from './information-pane.module.css';

/* eslint-disable-next-line */
export interface InformationPaneProps {}

export function InformationPane(props: InformationPaneProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to InformationPane!</h1>
    </div>
  );
}

export default InformationPane;
