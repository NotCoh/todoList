function addTodo () {
    if (document.getElementById("input").value.length!=0){
        let inputText = document.getElementById("input").value;
        const newTodo = document.createElement('div');
        newTodo.className="newTodoElement";
        newTodo.id = Date.now();
        newTodo.insertAdjacentHTML('beforeend',`<span class="newTodoElement__text">${inputText}</span>`);
        newTodo.insertAdjacentHTML('beforeend',`<div onclick="removeTodo(this.closest('.newTodoElement').id)" class="removeButton">&#x274C;</div>`);
        
        console.log(newTodo)
        document.getElementsByClassName('active-todos')[0].appendChild(newTodo);
        document.getElementById("input").value="";


    }
}
function removeTodo(id) {
    document.getElementById(id).firstChild.style.textDecoration ="line-through"
    document.getElementById(id).lastChild.innerHTML ="&#9989;"
    setTimeout(()=>{document.getElementById(id).remove()} ,700);
    return
    
  }