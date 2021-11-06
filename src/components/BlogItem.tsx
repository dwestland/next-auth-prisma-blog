import React, { FC } from 'react'
import Link from 'next/link'
import { FaRegHeart, FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import Tooltip from 'rc-tooltip'
import styles from '@/styles/BlogItem.module.css'
import 'rc-tooltip/assets/bootstrap.css'

interface BlogProps {
  article: {
    id: number
    body: string
    title: string
    author: {
      name: string
      email: string
    }
    _count: {
      blogLike: number
    }
  }
}

const BlogItem: FC<BlogProps> = ({ article }): JSX.Element => {
  const { id, title, author, _count } = article
  const bestName = author.name ?? author.email

  return (
    <div className={styles.blogItem}>
      <div className={styles.row}>
        <span>
          <strong>{title}</strong>
        </span>
        <div className={styles.icons}>
          ID:{id}
          &nbsp;&nbsp;&nbsp;
          <Tooltip
            placement="top"
            trigger={['hover']}
            overlay={<span>Edit</span>}
          >
            <a className={styles.icon}>
              <FaPencilAlt />
            </a>
          </Tooltip>
          &nbsp;&nbsp;&nbsp;
          <Tooltip
            placement="top"
            trigger={['hover']}
            overlay={<span>Delete</span>}
          >
            <a className={styles.icon}>
              <FaTrashAlt />
            </a>
          </Tooltip>
          &nbsp;&nbsp;&nbsp;
          <Tooltip
            placement="top"
            trigger={['hover']}
            overlay={<span>Like</span>}
          >
            <a className={styles.icon}>
              <FaRegHeart />
            </a>
          </Tooltip>
          &nbsp;
          {_count.blogLike}
        </div>
      </div>
      <div className={`${styles.row} ${styles.small}`}>
        <span>By {bestName}</span>
        <Link href={`/detail/${id}`}>
          <a>Blog detail</a>
        </Link>
      </div>
    </div>
  )
}

export default BlogItem
