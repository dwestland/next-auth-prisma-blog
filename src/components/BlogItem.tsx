import React, { FC, useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import Link from 'next/link'
import { FaHeart, FaRegHeart, FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import Tooltip from 'rc-tooltip'
import ShowMoreText from 'react-show-more-text'
import styles from '@/styles/BlogItem.module.css'
import 'rc-tooltip/assets/bootstrap.css'
import DeleteModal from '@/components/DeleteModal'
import EditModal from '@/components/EditModal'

interface Blog {
  userLikingOwnError: () => void
  article: {
    id: number
    body: string
    title: string
    author: {
      name: string
      email: string
      id: number
    }
    _count: {
      blogLike: number
    }
    blogLike: any
  }
}

const BlogItem: FC<Blog> = ({ article, userLikingOwnError }): JSX.Element => {
  const [session] = useSession()
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [isLikeByUser, setIsLikeByUser] = useState<boolean>(false)

  const { id, title, body, author, _count, blogLike } = article
  const bestName = author.name ?? author.email
  const url = `${process.env.NEXT_PUBLIC_API}/like/add`
  const deleteUrl = `${process.env.NEXT_PUBLIC_API}/like/delete`

  useEffect(() => {
    console.log('%c blogLike ', 'background: green; color: white', blogLike)
    console.log('blogLike')
    if (blogLike.length > 0) {
      setIsLikeByUser(true)
    } else {
      setIsLikeByUser(false)
    }
  }, [blogLike])

  const openDeleteModal = () => {
    setShowDeleteModal(true)
  }

  const openEditModal = () => {
    setShowEditModal(true)
  }

  const createLike = async () => {
    console.log('%c createLike ', 'background: red; color: white')

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          userId: session.id,
          blogId: id,
        },
      }),
    }).catch((error) => console.warn(error))
  }

  const deleteLike = async () => {
    console.log('%c deleteLike ', 'background: red; color: white')
    fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          userId: session.id,
          blogId: id,
        },
      }),
    }).catch((error) => console.warn(error))
  }

  const toggleLike = () => {
    if (author.id === session.id) {
      userLikingOwnError()
      return null
    }

    if (isLikeByUser) {
      // Delete like
      deleteLike()
      console.log(
        '%c isLikeByUser ',
        'background: red; color: white',
        isLikeByUser
      )
    } else {
      createLike()
    }

    return null
  }

  return (
    <div className={styles.blogItem}>
      <div className={styles.row}>
        <span>
          <strong>{title}</strong>
        </span>
        <div className={styles.icons}>
          {/*  TODO - Remove ID */}
          {id}
          {/* Edit Button */}
          <Tooltip
            placement="top"
            trigger={['hover']}
            overlay={<span>Edit</span>}
          >
            <button
              type="button"
              className={styles.iconButton}
              onClick={openEditModal}
            >
              <a className={styles.icon}>
                <FaPencilAlt />
              </a>
            </button>
          </Tooltip>
          &nbsp;&nbsp;
          {/* Delete Button */}
          <Tooltip
            placement="top"
            trigger={['hover']}
            overlay={<span>Delete</span>}
          >
            <button
              type="button"
              className={styles.iconButton}
              onClick={openDeleteModal}
            >
              <a className={styles.icon}>
                <FaTrashAlt />
              </a>
            </button>
          </Tooltip>
          &nbsp;&nbsp;
          {/* Like Button */}
          <Tooltip
            placement="top"
            trigger={['hover']}
            overlay={<span>Like</span>}
          >
            <button
              type="button"
              className={styles.iconButton}
              onClick={toggleLike}
            >
              <a className={styles.icon}>
                {isLikeByUser ? (
                  <FaHeart className={styles.liked} />
                ) : (
                  <FaRegHeart />
                )}
              </a>
            </button>
          </Tooltip>
          {_count.blogLike}
        </div>
      </div>
      <div className={`${styles.row} ${styles.small}`}>
        <span>By {bestName}</span>
        <Link href={`/detail/${id}`}>
          <a>Blog detail</a>
        </Link>
      </div>
      <div className={styles.body}>
        <ShowMoreText
          lines={3}
          more="show more"
          less="show less"
          anchorClass={styles.anchorClass}
          truncatedEndingComponent="... "
        >
          <p>{body}</p>
        </ShowMoreText>
      </div>
      {showDeleteModal && (
        <DeleteModal
          id={id}
          setShowDeleteModal={setShowDeleteModal}
          title={title}
        />
      )}
      {showEditModal && (
        <EditModal
          id={id}
          title={title}
          body={body}
          setShowEditModal={setShowEditModal}
        />
      )}
    </div>
  )
}

export default BlogItem
