import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import Link from 'next/link'

const IndexPage = () => {
  const [session, loading] = useSession()

  if (loading) {
    return <div>Loading...</div>
  }

  if (session) {
    console.log('%c session ', 'background: black; color: white', session)

    return (
      <div className="container">
        Hello, {session.user.name ?? session.user.email}
        <br />
        <br />
        <button type="button" className="btn" onClick={() => signOut()}>
          Sign out
        </button>
        <br />
        <br />
        <Link href="/blogs">
          <a>Blogs</a>
        </Link>
      </div>
    )
  }

  return (
    <div className="container">
      You are not logged in
      <br />
      <br />
      <button type="button" className="btn" onClick={() => signIn()}>
        Sign in
      </button>
      <br />
      <br />
      <Link href="/blogs">
        <a href="/#">Blogs</a>
      </Link>
    </div>
  )
}

export default IndexPage
