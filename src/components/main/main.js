import React from "react";

export default function Main({ mycount, setMycount }) {
  return (
    <div>
      <h1>hi iam main App</h1>
      <div className="d-flex align-items-center justify-content-center gap-5">
        <button
          className="btn btn-danger"
          onClick={() => {
            if (mycount > 0) {
              setMycount(mycount - 1);
            }
          }}
        >
          -
        </button>
        {mycount}
        <button
          className="btn btn-success"
          onClick={() => {
            setMycount(mycount + 1);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
