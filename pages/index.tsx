import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import Navbar from '@/components/Navbar'

const IndexPage = () => {
  const [session, loading] = useSession()

  console.log(
    '%c process.env.GITHUBID ',
    'background: red; color: white',
    process.env.GITHUBID
  )

  if (loading) {
    return (
      <div className="container">
        <Navbar />
        <div>Loading...</div>
      </div>
    )
  }

  if (session) {
    console.log('%c session ', 'background: black; color: white', session)

    return (
      <div className="container">
        <Navbar />
        <div>
          Hello, {session.user.name ?? session.user.email}
          <br />
          <br />
          <button type="button" className="btn" onClick={() => signOut()}>
            Sign out
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <br />
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
    </div>
  )
}

export default IndexPage
