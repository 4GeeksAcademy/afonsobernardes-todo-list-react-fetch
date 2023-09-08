import React, { useState } from "react";

//Create and return a list item.
const ListItem = (props) => {

	return (
		<li className="container d-flex justify-content-between">
			{props.text} <span><i className="fa fa-trash" onClick={props.deleteItem} data-remove-id={props.itemIndex}></i></span> 
		</li>
	)};

export default ListItem;