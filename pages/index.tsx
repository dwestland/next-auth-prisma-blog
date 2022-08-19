import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import Image from 'next/image'
import Layout from '@/components/Layout'

const HomePage = () => {
  const [session, loading] = useSession()

  if (session) {
    console.log('%c session ', 'background: blue; color: white', session)
  }
  return (
    <Layout title="Document" description="Document description">
      {session && (
        <div className="container">
          <div>
            Hello, {session.user.name ?? session.user.email}
            <br />
            <br />
            <button type="button" className="btn" onClick={() => signOut()}>
              Sign out
            </button>
          </div>
        </div>
      )}
      {!session && (
        <div>
          You are not logged in
          <br />
          <br />
          <button type="button" className="btn" onClick={() => signIn()}>
            Sign in
          </button>
          <p>Or</p>
          <button
            type="button"
            className="btn button-as-link"
            onClick={() => signIn()}
          >
            Sign up
          </button>
        </div>
      )}

      <main>
        <section>
          <h1>Welcome to App</h1>
          <h3>Section</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
            obcaecati quam commodi perspiciatis aut sequi, corporis numquam
            reiciendis necessitatibus eligendi deserunt voluptatem iste ea
            delectus magnam. Excepturi, esse suscipit facere dolore deleniti
            temporibus odit inventore, beatae possimus quae placeat quasi
          </p>
          <Image src="/images/ibm.jpg" width={600} height={400} alt="ENIAC" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
            obcaecati quam commodi perspiciatis aut sequi, corporis numquam
            reiciendis necessitatibus eligendi deserunt voluptatem iste ea
            delectus magnam. Excepturi, esse suscipit facere dolore deleniti
            temporibus odit inventore, beatae possimus quae placeat quasi
          </p>
        </section>
      </main>
    </Layout>
  )
}

export default HomePage
