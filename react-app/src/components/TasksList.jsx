import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AddTask from "./AddTask.jsx";

const TasksList = () => {
    const [tasks, setTasks] = useState([]);
    const [reload, setReload] = useState(true);
    const [edit, setEdit] = useState(false);
    const [editObject, setEditObject] = useState(null);
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (reload) {
            const getItems = async () => {
                const token = localStorage.getItem("token");
                if (!token) {
                    Navigate("/login");
                } else {
                    try {
                        const response = await Axios.get("https://localhost:7256/api/taskitems", {
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        setReload(false);
                        setTasks(response.data);
                    } catch (error) {
                        console.error("Error fetching tasks:", error);
                    }
                }
            };
            void getItems();
        }
    }, [reload]);

    const handleChangeStatus = async (id, task) => {
        const token = localStorage.getItem("token");
        const tempTask = { ...task, isCompleted: !task.isCompleted };
        try {
            await Axios.put(
                `https://localhost:7256/api/taskitems/${id}`,
                tempTask,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setReload(true);
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleInput = (value, name) => {
        const tempObject = { ...editObject, [name]: value };
        setEditObject(tempObject);
    };

    const handleSaveEdit = async () => {
        const token = localStorage.getItem("token");
        try {
            await Axios.put(
                `https://localhost:7256/api/taskitems/${editObject.id}`,
                editObject,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setReload(true);
            setEdit(false);
        } catch (error) {
            console.error("Error saving edited task:", error);
        }
    };

    const handleDelete =async(id) =>{
        const token = localStorage.getItem("token");
        try {
            await Axios.delete(
                `https://localhost:7256/api/taskitems/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setReload(true);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    const handleAddItem =async(item)=>{
        if(!item){
            return console.error("cannot create item")
        }
        const token = localStorage.getItem("token");
        try {
            await Axios.post(
                `https://localhost:7256/api/taskitems`,
                item,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setReload(true);
            setEdit(false);
        } catch (error) {
            console.error("Error creating item:", error);
        }
    }


 
    return (
        <>
        <div style={{ display: "flex", gap: "20px" }}>
            {tasks.length > 0 ? (
                            <>{
                tasks.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            width: "20vw",
                            height: "30vh",
                            border: "0.5px solid grey",
                            backgroundColor: 'lightBlue',
                            borderRadius: "25px",
                        }}
                    >
                        <div
                            style={{ textAlign: 'center', fontSize: "2rem" }}
                            onDoubleClick={() => {
                                setEdit(true);
                                setEditObject(item);
                            }}
                        >
                            {edit && editObject?.id === item.id ? (
                                <input
                                    type="text"
                                    value={editObject.title}
                                    name="title"
                                    onChange={(e) => handleInput(e.target.value, e.target.name)}
                                />
                            ) : (
                                item.title
                            )}
                        </div>
                        <div
                            style={{ textAlign: 'justify', fontSize: "1rem", padding: "10px" }}
                            onDoubleClick={() => {
                                setEdit(true);
                                setEditObject(item);
                            }}
                        >
                            {edit && editObject?.id === item.id ? (
                                <input
                                    type="text"
                                    value={editObject.description}
                                    name="description"
                                    onChange={(e) => handleInput(e.target.value, e.target.name)}
                                />
                            ) : (
                                item.description
                            )}
                        </div>
                        {edit && editObject?.id === item.id ? (
                            <div onClick={handleSaveEdit}
                            style={{
                                width: '40%',
                                margin: "auto",
                                padding: "5px",
                                position: "relative",
                                border: "0.5 solid grey",
                                borderRadius: "5px",
                                background:"black",
                                color: "lightGrey",
                                textAlign:'center'
                            }}>Save</div>
                        ) : (
                            <div style={{display:"flex"}}>
                            <div
                                onClick={() => handleChangeStatus(item.id, item)}
                                style={{
                                    width: '40%',
                                    margin: "auto",
                                    padding: "5px",
                                    position: "relative",
                                    border: "0.5 solid grey",
                                    borderRadius: "5px",
                                    background: `${item.isCompleted ? "green" : "orange"}`,
                                    color: "lightGrey"
                                }}
                            >
                                {item.isCompleted ? "Completed" : "In progress"}
                            </div>
                                 <div
                                 onClick={() => handleDelete(item.id)}
                                 style={{
                                     width: '40%',
                                     margin: "auto",
                                     padding: "5px",
                                     position: "relative",
                                     border: "0.5 solid grey",
                                     borderRadius: "5px",
                                     background:"red",
                                     color: "lightGrey"
                                 }}
                             >
                                {'Delete'}
                             </div>
                             </div>
                        )}
                    </div>
                ))}
                <div        style={{ padding: "5px",
                                     height:"20px",
                                     border: "0.5 solid grey",
                                     borderRadius: "5px",
                                     color:"blue",
                                     backgroundColor:"brown"}}                 onClick={()=>setIsOpen(true)}
                >
                      {" ADD TASK"}
                       </div>
                       </>
            ) : (
                    <div
                        style={{
                            display: "table-cell",
                            padding: "10px",
                            color: "#888",
                            fontStyle: "italic"
                        }}
                        onClick={()=>setIsOpen(true)}
                    >
                        No Tasks found. Add new item
                    </div>
            )}
         
        </div>
       
       {isOpen && <AddTask  handleAddItem={handleAddItem} setIsOpen={setIsOpen}/>}
        </>
    );
};

export default TasksList;
