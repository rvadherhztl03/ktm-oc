import { FunctionComponent } from 'react'
import styles from '../styles/Home.module.css'
import Hero from '../components/Hero'

const Home: FunctionComponent = () => {
  return (
    <>
      <main className={styles.main}>
        <Hero />
      </main>
      {/* </div> */}
    </>
  )
}

export default Home
