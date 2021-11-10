import React, { FC } from 'react'
// import Link from 'next/link'
// import { FaRegHeart, FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
// import Tooltip from 'rc-tooltip'
import Modal from '@/components/Modal'
import styles from '@/styles/BlogItem.module.css'

interface ModalProps {
  id: number
  title: string
  setShowDeleteModal: any
}

const DeleteModal: FC<ModalProps> = ({
  id,
  title,
  setShowDeleteModal,
}): JSX.Element => {
  const url = `${process.env.NEXT_PUBLIC_API}/blog/delete`
  // const DeleteModal = (boom) => {
  // const { id, title, setShowDeleteModal } = boom
  console.log('%c bam ', 'background: red; color: white')

  const handleDelete = () => {
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          id,
        },
      }),
    })

    setShowDeleteModal(false)
  }

  return (
    <div>
      <Modal show="true" title={null} onClose={() => setShowDeleteModal(false)}>
        <div className={styles.deleteModal}>
          <h2>Are you sure you want to delete</h2>
          <h3>&quot;{title}&quot;&nbsp;&nbsp;?</h3>
          <div className={styles.buttonContainer}>
            <button className="btn" type="button" onClick={handleDelete}>
              Delete
            </button>
            <button
              className={`btn ${styles.cancelButton}`}
              type="button"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default DeleteModal
