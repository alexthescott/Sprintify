import React from "react"

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
}

function Modal({ children, isOpen }: ModalProps) {
  return isOpen ? (
    <div
      className="animate-slide-in-from-below flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      onClick={close}
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl shadow-md">{children}</div>
    </div>
  ) : null
}

export default Modal
