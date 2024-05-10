import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { bserver } from '../App';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Taskitem from './Taskitem';
import { context } from '..';
import { useContext } from 'react';

const Addtask = () => {
  const reloadPage = () => {
    window.location.reload(false);
  };
  const { isauthenticated, setisloading } = useContext(context);
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: "", description: "", tag: "" });
  const [disptask, setdisptask] = useState([]);
  const [editform, setEditForm] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null); // State to hold the ID of the task being edited

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  }

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const { title, description, tag } = task;
      const { data } = await axios.post(`${bserver}/task/createtask`, {
        title, description, tag
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      toast.success(data.message);
      console.log(data);
      setTask({ title: "", description: "", tag: "" });
      handleget();
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message)
    }
  };

  const handleget = async () => {
    try {
      const { title, description, tag } = task;
      const { data } = await axios.post(`${bserver}/task/gettask`, {
        title, description, tag
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      toast.success(data.message);
      console.log(data);
      setdisptask(data.tasks);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message)
    }
  };

  const handleDelete = async (_id) => {
    const confirm = window.confirm("Are you sure want to delete task");
    if (confirm) {
      try {
        setisloading(true);
        let { data } = await axios.delete(`${bserver}/task/${_id}`, {
          withCredentials: true,
        });
        toast.success(data.message);
        setisloading(false);
        handleget();
      } catch (error) {
        toast.error(error.response.data.message);
        setisloading(false);
      }
    }
  };

  useEffect(() => {
    handleget();
  }, []);

  const gettaskdetail = () => {
    return task;
  }

  const taskdet = gettaskdetail();
  const [etaskData, setTaskData] = useState({ etitle: task.title, edescription: task.description, etag: task.tag });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prevData => ({ ...prevData, [name]: value }));
  };

  const queryedit = (_id) => {
    setEditForm(true);
    setEditTaskId(_id); // Set the ID of the task being edited
    // Find the task being edited
    const editedTask = disptask.find(task => task._id === _id);
    // Set etaskData with the values of the task being edited
    setTaskData({ etitle: editedTask.title, edescription: editedTask.description, etag: editedTask.tag });
  }

  const handleclose = (e) => {
    e.preventDefault();
    setEditForm(false);
    setEditTaskId(null); // Reset the task ID when closing the form
    navigate("/addtask");
  };

  const updatetask = async (_id) => {
    try {
      const { etitle, edescription, etag } = etaskData;
      setisloading(true);
      let { data } = await axios.patch(`${bserver}/task/${_id}`, { title: etitle, description: edescription, tag: etag }, {
        withCredentials: true,
      });
      toast.success(data.message);
      setisloading(false);
      handleget();
      reloadPage();
      navigate("/addtask");
    } catch (error) {
      toast.error(error.response.data.message);
      setisloading(false);
    }
  };

  return (
    <>
      {editform &&
        disptask.map((element, index) => {
          const { _id } = element;
          return (
            <div className="container" key={index}>
              {editTaskId === _id && ( // Only render the edit form if the ID matches
                <>
                  <h1 className='my-5 my-5'>Edit your "Task" now : </h1>
                  <form>
                    <div className="mb-3 my-2">
                      <label className="my-3" htmlFor="title">New title:</label>
                      <input type="text" className="form-control" id="etitle" name="etitle" value={etaskData.etitle} onChange={handleChange} />
                    </div>
                    <div className="mb-3 my-2">
                      <label className="my-3" htmlFor="description">New description:</label>
                      <input type="text" className="form-control" id="edescription" name="edescription" value={etaskData.edescription} onChange={handleChange} />
                    </div>
                    <div className="mb-3 my-2">
                      <label className="my-3" htmlFor="tag">New tag:</label>
                      <input type="text" className="form-control" id="etag" name="etag" value={etaskData.etag} onChange={handleChange} />
                    </div>
                    <button type="button" className="btn btn-primary mx-2" onClick={() => { updatetask(_id) }} disabled={etaskData.etitle.length === 0 || etaskData.edescription.length === 0 || etaskData.etag.length === 0}>Update Task</button>
                    <button type="button" className="btn btn-secondary mx-2" onClick={handleclose}>Close</button>
                  </form>
                </>
              )}
            </div>
          );
        })}
      {!editform && (
        <div>
          <h1 className='my-5'>Create your "Task" now : </h1>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Title : </label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="title" value={task.title} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Description : </label>
              <input type="text" className="form-control" id="exampleInputPassword1" value={task.description} name="description" onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Tag : </label>
              <input type="text" className="form-control" id="exampleInputPassword1" value={task.tag} name="tag" onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-success" onClick={handleAdd} disabled={task.title.length === 0 || task.description.length === 0 || task.tag.length === 0}>Add Task</button>
          </form>
          <h2 className='my-5'>Hey User! Here are your tasks that you need to complete :</h2>
          <div className="row my-3">
            {isauthenticated ? (
              disptask.length > 0 ? (
                disptask.map((element, index) => {
                  const { title, description, tag, _id } = element;
                  return (
                    <Taskitem
                      title={title}
                      description={description}
                      tag={tag}
                      key={index}
                      del={() => { handleDelete(_id) }}
                      edit={() => { queryedit(_id) }}
                      _id={_id} // Pass the _id to Taskitem
                    />
                  );
                })
              ) : (
                <h4>No tasks to display!</h4>
              )
            ) : (
              <h4>You need to log in to view tasks.</h4>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Addtask;
