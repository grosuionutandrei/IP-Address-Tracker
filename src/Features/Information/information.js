import styles from './Information.module.css';
export function Information({ coords }) {
  return (
    <article className={styles.details} data-article="details">
      <div className={styles.ipcontainer} data-article="ipcontainer">
        <p data-article="iptitle">ip address</p>
        <p data-article="ip">{coords?.ip}</p>
      </div>
      <div className={styles.location} data-article="locationcontainer">
        <p data-article="locationtitle">location</p>
        <p data-article="locationcontry">{coords?.location.country}</p>
        <p data-article="locationregion"> {coords?.location.region}</p>
      </div>
      <div className={styles.timezone} data-article="timezonecontainer">
        <p data-article="timezonetitle">time zone</p>
        <p data-article="timezone"> {`UTC ${coords?.location.timezone}`}</p>
      </div>
      <div className={styles.isp} data-article="ispcontainer">
        <p data-article="isptitle">isp</p>
        <p data-article="isp">{coords?.isp}</p>
      </div>
    </article>
  );
}
