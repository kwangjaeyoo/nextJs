import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <div className={styles.container}>
        <main>
          <h1>About APP</h1>

          <p>Hi, this is Smartship.</p>
        </main>

        <footer className={styles.footer}>
          Powered by NEXT JS and Qxpress.net
        </footer>
      </div>
    </div>
  )
}
