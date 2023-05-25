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

/**  NextJS 빌드 리소스 살펴보기
https://www.moonkorea.dev/React-NextJS-%EB%B9%8C%EB%93%9C-%EB%A6%AC%EC%86%8C%EC%8A%A4-%EC%82%B4%ED%8E%B4%EB%B3%B4%EA%B8%B0
*/

/**
 빌드 후 해당 폴더에 들어가는 내용들..... // .next 
 https://nextjs.org/docs/app/building-your-application/deploying#nextjs-build-api
 self hosting
 https://nextjs.org/docs/app/building-your-application/deploying#self-hosting
 */
