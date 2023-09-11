import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";

const ToDoList = () => {

	const user = "afonso-bernardes"
	const [inputValue, setInputValue] = useState("");
	const [tasks, setTasks] = useState([])

	async function enterInput(event) {
		if (event.key === "Enter" && inputValue) {
			setTasks([...tasks, {"done": false, "id": currentTasks.length, "label": inputValue}])
			setInputValue("")
		};
	};

	const deleteItem = (event) => {
		let position = parseInt(event.target.getAttribute("data-remove-id"));
		setTasks(tasks.filter((element) => element["id"] !== position))
	};

	useEffect(() => {
		const fetchTaskList = async () => {
			/* Fetch user's list of task. Translate and return response in json format. */
			const response = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`)
			const taskItemsJson = await response.json();
			setTasks(taskItemsJson); /* Should return something like [{objTask1} , {objTask2}, etc.] */
		};

		fetchTaskList();
	}, [])

	return (
		<div className="container-fluid vh-100 bg-dark d-flex justify-content-center">
			<div className="todo-wrapper container bg-white m-auto p-5 w-50">

				<h1 className="todo-header text-center">To do List</h1>
				<input id="addToDo" type="text" placeholder="Add to do here" onKeyDown={enterInput} onChange={(event) => setInputValue(event.target.value)} value={inputValue} />

				<ul className="todo-list my-3">
					{tasks.map((element) => {
						return <ListItem text={element["label"]} deleteItem={deleteItem} itemIndex={element["id"]}/>
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