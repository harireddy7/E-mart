import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  const [show, setShow] = useState(true);
  const closeAlert = () => setShow(!show);
  return (
    <Alert
      show={show}
      variant={variant}
      transition
      dismissible
      className="px-3 py-1 rounded"
      onClose={closeAlert}
      id="alert-msg"
    >
      {children}
    </Alert>
  );
};

export default Message;
