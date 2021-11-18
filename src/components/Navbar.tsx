import React from 'react'
import Link from 'next/link'
import Search from '@/components/Search'
import styles from '@/styles/Navbar.module.css'

export default function Navbar() {
  return (
    <div>
      <Search />
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li className={styles.li}>
          <Link href="/blogs">
            <a>Blogs</a>
          </Link>
        </li>
        <li className={styles.li}>
          <Link href="/blogs/add">
            <a>Add Blog</a>
          </Link>
        </li>
      </ul>
      <hr className={styles.hr} />
    </div>
  )
}
