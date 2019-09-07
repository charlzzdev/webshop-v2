import React from 'react';

const Modal = ({ children, open, close }) => {
  const pEvent = open ? 'pointer-events-auto' : 'pointer-events-none';
  return (
    <>
      <div onClick={close} className={`${pEvent} absolute left-0 top-0 w-full h-full`}></div>
      <div className={`modal ${open ? 'opacity-100' : 'opacity-0'} ${pEvent}`} >
        <span onClick={close} className="modal-close" >x</span>
        {children}
      </div>
    </>
  )
}

export default Modal;
