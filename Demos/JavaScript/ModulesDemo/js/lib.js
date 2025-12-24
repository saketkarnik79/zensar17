function display(message){
	const el = document.createElement('div');
	el.innerText=message;
	document.body.appendChild(el);
}

export { display };