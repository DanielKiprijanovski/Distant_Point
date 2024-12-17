import React, { useState } from "react";

// This component provides a modal to add a new task with a title and description.
// It includes a form for task input and buttons to save or cancel the task creation.
const AddTask = ({ handleAddItem, setIsOpen }) => {
    const [newTask, setNewTask] = useState({ title: "", description: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    const handleSubmit = () => {
        if (!newTask.title || !newTask.description) {
            alert("Both Title and Description are required!");
            return;
        }else{
            handleAddItem(newTask);
            setIsOpen(false); 
        }
     
    };

    return (
        <div
            style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                zIndex: 1000,
                width: "400px",
            }}
        >
            <h2>Add New Task</h2>
            <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Title</label>
                <input
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                    }}
                />
            </div>
            <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Description</label>
                <textarea
                    name="description"
                    value={newTask.description}
                    onChange={handleInputChange}
                    style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        resize: "none",
                    }}
                ></textarea>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                    onClick={handleSubmit}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "green",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Save
                </button>
                <button
                    onClick={() => setIsOpen(false)}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default AddTask;
