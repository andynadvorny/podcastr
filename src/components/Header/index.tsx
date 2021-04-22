import format from 'date-fns/format';

import styles from './styles.module.scss';

export function Header() {
  const currentDate = format(new Date(), 'EEE, MMMM d');

  return (
    <header className={styles.headerContainer}>
      <img src="/images/logo.svg" alt="Podcastr" />

      <p>The best for you to listen, always</p>

      <span>{currentDate}</span>
    </header>
  );
}