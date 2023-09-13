import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";

const ToDoList = () => {

	const user = "afonso-bernardes"
	const [inputValue, setInputValue] = useState("");
	const [tasks, setTasks] = useState([])

	async function enterInput(event) {
		if (event.key === "Enter" && inputValue) {
			setTasks([...tasks, {"done": false, "label": inputValue}])
			setInputValue("")
		};
	};

	const deleteItem = (event) => {
		let position = parseInt(event.target.getAttribute("data-remove-id"));
		setTasks(tasks.filter((element, index) => index !== position))
	};

	/* Update database when tasks are changed.*/
	useEffect(() => {
		fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
      		method: "PUT",
      		body: JSON.stringify(tasks),
      		headers: {
        		"Content-Type": "application/json"
      		}
		});
	}, [tasks])

	/* Try to fecth user's task. If user does not exist, creat it; if it already exist, GET the user's tasks and update useState. */
	useEffect(() => {
		const fetchTaskList = async () => {
			/* Fetch user's list of task. Translate and return response in json format. */
			try {
				const response = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`)

				if (!response.ok) {
					alert(`The error status code is ${response.status} ${response.status === 404 ? `: User "${user}" does not exist!` : ""}`)
					throw new Error(`The error status code is ${response.status} ${response.status === 404 ? `: User "${user}" does not exist!` : ""}`);
				}
				const taskItemsJson = await response.json();
				setTasks(taskItemsJson); /* Should return something like [{objTask1} , {objTask2}, etc.] */

			} catch (error) {

				fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
					method: "POST",
					body: JSON.stringify([]),
					headers: {
						"Content-Type": "application/json"
					}
				});
			}
			
		};

		fetchTaskList()

	}, [])

	return (
		<div className="container-fluid vh-100 bg-dark d-flex justify-content-center">
			<div className="todo-wrapper container bg-white m-auto p-5 w-50">

				<h1 className="todo-header text-center">To do List</h1>
				<input id="addToDo" type="text" placeholder="Add to do here" onKeyDown={enterInput} onChange={(event) => setInputValue(event.target.value)} value={inputValue} />

				<ul className="todo-list my-3">
					{tasks.map((element, index) => {
						return <ListItem text={element["label"]} deleteItem={deleteItem} itemIndex={index} />
					})}
				</ul>

				<div className="todo-footer">
					{tasks.length} items left.
				</div>

			</div>
		</div>
	);
};

export default ToDoList;