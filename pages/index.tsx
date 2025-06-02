import { FunctionComponent } from 'react'
import styles from '../styles/Home.module.css'
import Hero from '../components/Hero'
import FinanceOffers from '../components/FinanaceOffer'
import VehicleCarousel from '../components/VehicleCarousel'

const Home: FunctionComponent = () => {
  return (
    <>
      <main className={styles.main}>
        <Hero />
        <VehicleCarousel />
        <FinanceOffers />
      </main>
      {/* </div> */}
    </>
  )
}

export default Home
