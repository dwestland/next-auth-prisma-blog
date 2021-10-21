import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import Link from 'next/link'

const IndexPage = () => {
  const [session, loading] = useSession()

  if (loading) {
    return <div>Loading...</div>
  }

  if (session) {
    return (
      <div>
        Hello, {session.user.name ?? session.user.email} <br />
        <button type="button" onClick={() => signOut()}>
          Sign out
        </button>
        <br />
        <br />
        <Link href="/blogs">
          <a href="/#">Blogs</a>
        </Link>
      </div>
    )
  }

  return (
    <div>
      You are not logged in! <br />
      <button type="button" onClick={() => signIn()}>
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
