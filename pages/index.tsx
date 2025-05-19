import { FunctionComponent, useState } from 'react'
import Image from 'next/image'
// import { useOcSelector } from '../ordercloud/redux/ocStore'
import styles from '../styles/Home.module.css'
import OcLoginForm from '../ordercloud/components/OcLoginForm'

const Home: FunctionComponent = () => {
  const [logIn, setLogIn] = useState(false)
  // const user = useOcSelector((s) => s.ocUser.user)

  return (
    <>
      <main className={styles.main}>
        <div className="banner h-screen w-full relative flex items-center justify-center">
          <Image
            src="/images/3503-homepage-web.webp"
            alt="Home page"
            layout="fill"
            className="w-full overflow-hidden object-cover"
            unoptimized
            priority
          />

          {!logIn && (
            <OcLoginForm
              onLoggedIn={function (): void {
                setLogIn(true)
              }}
            />
          )}
          {logIn && (
            <h1 className="text-[36px] md:text-[48px] lg:text-[72px] text-white z-20 absolute bottom-4/5 md:bottom-1/5 text-5xl font-bold left-3">
              Welcome to Store
            </h1>
          )}
        </div>

        {/* {user && user !== undefined && (
          <pre className={styles.code}>
            <code>{JSON.stringify(user, null, 2)}</code>
          </pre>
        )} */}
      </main>
      {/* </div> */}
    </>
  )
}

export default Home
