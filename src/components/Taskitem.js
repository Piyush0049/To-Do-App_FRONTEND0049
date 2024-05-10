// Taskitem.jsx
import React from 'react';

const Taskitem = (props) => {
  return (
    <div className='col-md-3'>
      <div className="card my-3" style={{ width: "240px" }}>
        <div className="card-body" >
          <span className="badge rounded-pill text-bg-warning" style={{ position: "relative", left: "190px", bottom: "27px", fontSize: "0.8rem", width: "70px" }}>{props.tag}</span>
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
          <i className="fa-solid fa-pen-to-square mx-2" style={{ cursor: "pointer" }} onClick={() => props.edit(props._id)}  ></i>
          <i className="fa-solid fa-trash-can mx-2" style={{ cursor: "pointer" }} onClick={props.del}></i>
        </div>
      </div>
    </div>
  );
}

export default Taskitem;
