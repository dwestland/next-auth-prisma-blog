import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import Navbar from '../src/components/Navbar'

const IndexPage = () => {
  const [session, loading] = useSession()

  if (loading) {
    return <div>Loading...</div>
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
      <div>
        You are not logged in
        <br />
        <br />
        <button type="button" className="btn" onClick={() => signIn()}>
          Sign in
        </button>
      </div>
    </div>
  )
}

export default IndexPage
