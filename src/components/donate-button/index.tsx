import styles from './style.module.css';

const DonateButton = ({
  address,
}: {
  address: string;
}) => {
  return (
    <a href={`payto://${address}?rc=m&donate=1`}>
      <a className={styles.ptDonate}>💠 Recurring donate</a>
    </a>
  );
};

export default DonateButton;
