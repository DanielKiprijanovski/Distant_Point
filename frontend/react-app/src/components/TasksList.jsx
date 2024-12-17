import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AddTask from "./AddTask.jsx";

// The TasksList component is responsible for displaying, managing, and interacting with a list of tasks.
// It supports features like searching, editing, deleting, changing task status, adding new tasks, and paginating through the list of tasks.
const TasksList = () => {
    const [tasks, setTasks] = useState({
        items: [],
        pageIndex: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
    });

    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [search, setSearch] = useState("");

    const [reload, setReload] = useState(true);
    const [edit, setEdit] = useState(false);
    const [editObject, setEditObject] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    function loadPage(newPageIndex) {
        setPageIndex(newPageIndex);
        setReload(true);
    }

    function handleSearch(value) {
        setSearch(value ? value : '');
        setPageIndex(1);
        setReload(true);
    }

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
                            params: {
                                search,
                                pageIndex: pageIndex.toString(),
                                pageSize: pageSize.toString(),
                            }
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
    }, [reload, pageIndex, pageSize, search]);

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

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        try {
            await Axios.delete(
                `https://localhost:7256/api/taskitems/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setReload(true);
            setPageIndex(1);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    const handleAddItem = async (item) => {
        if (!item) {
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
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {/* Search bar */}
                <div style={{ marginBottom: "20px", width: "100%", maxWidth: "400px" }}>
                    <input
                        type="text"
                        value={search}
                        onChange={e => handleSearch(e.target.value)}
                        placeholder="Search tasks..."
                        style={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "1rem",
                            borderRadius: "10px",
                            border: "1px solid #ccc",
                            outline: "none",
                            marginBottom: "20px",
                        }}
                    />
                </div>

                {/* Tasks List */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
                    {tasks.items.length > 0 ? (
                        tasks.items.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    width: "250px",
                                    height: "350px",
                                    border: "1px solid #ccc",
                                    borderRadius: "12px",
                                    backgroundColor: "#f0f8ff",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                    padding: "15px",
                                    textAlign: "center",
                                }}
                            >
                                <div
                                    style={{ fontSize: "1.5rem", fontWeight: "bold", cursor: "pointer" }}
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
                                            style={{
                                                width: "100%",
                                                padding: "5px",
                                                fontSize: "1rem",
                                                border: "1px solid #ccc",
                                                borderRadius: "5px",
                                                marginBottom: "10px",
                                            }}
                                        />
                                    ) : (
                                        item.title
                                    )}
                                </div>
                                <div
                                    style={{
                                        fontSize: "1rem",
                                        padding: "10px",
                                        cursor: "pointer",
                                    }}
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
                                            style={{
                                                width: "100%",
                                                padding: "5px",
                                                fontSize: "1rem",
                                                border: "1px solid #ccc",
                                                borderRadius: "5px",
                                            }}
                                        />
                                    ) : (
                                        item.description
                                    )}
                                </div>

                                {/* Buttons: Save, Status, Delete */}
                                {edit && editObject?.id === item.id ? (
                                    <div
                                        onClick={handleSaveEdit}
                                        style={{
                                            padding: "8px",
                                            marginTop: "10px",
                                            borderRadius: "5px",
                                            backgroundColor: "black",
                                            color: "lightgrey",
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Save
                                    </div>
                                ) : (
                                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                                        <div
                                            onClick={() => handleChangeStatus(item.id, item)}
                                            style={{
                                                padding: "8px",
                                                backgroundColor: item.isCompleted ? "green" : "orange",
                                                color: "white",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                                width: "45%",
                                            }}
                                        >
                                            {item.isCompleted ? "Completed" : "In progress"}
                                        </div>
                                        <div
                                            onClick={() => handleDelete(item.id)}
                                            style={{
                                                padding: "8px",
                                                backgroundColor: "red",
                                                color: "white",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                                width: "45%",
                                            }}
                                        >
                                            Delete
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div
                            style={{
                                fontSize: "1rem",
                                color: "#888",
                                fontStyle: "italic",
                                cursor: "pointer",
                            }}
                            onClick={() => setIsOpen(true)}
                        >
                            No Tasks found. Add a new task.
                        </div>
                    )}
                </div>

                {/* Add Task Button */}
                <div
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#28a745",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginTop: "20px",
                    }}
                    onClick={() => setIsOpen(true)}
                >
                    Add Task
                </div>

                {/* Pagination */}
                <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
                    <button
                        onClick={() => loadPage(pageIndex - 1)}
                        disabled={!tasks.hasPreviousPage}
                        style={{
                            padding: "8px 15px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => loadPage(pageIndex + 1)}
                        disabled={!tasks.hasNextPage}
                        style={{
                            padding: "8px 15px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>

            {isOpen && <AddTask handleAddItem={handleAddItem} setIsOpen={setIsOpen} />}
        </>
    );
};

export default TasksList;
