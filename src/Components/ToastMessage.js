import React, { useState, forwardRef, useImperativeHandle} from "react";

const ReactToast = (props, ref) => {
  const [show, setShow] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useImperativeHandle(ref, () => ({
    showToast(msg = "") {
      console.log("Toast message:", msg);
      setToastMsg(msg);
      setShow(true);
      setTimeout(() => setShow(false), 3000); 
    },
  }));

  return (
    <div className={`react-toast ${show ? "show" : ""}`}>
      {toastMsg}
    </div>
  );
};

export default forwardRef(ReactToast);


