import React, {useRef} from 'react';

const Info = ({color, msg, setStatus}) => {
  const infoContainer = useRef(null);
  if(!color && !msg) return null;

  setTimeout(() => {
    infoContainer.current && (infoContainer.current.style.display = 'none');
    setStatus({color: null, msg: null});
  }, 5000);

  return <div ref={infoContainer} className={`info p-4 ${color}`}>{msg}</div>;
}

export default Info;
