const todoContainerEl = document.querySelector("#todoContainer");
const todoInputEl = document.querySelector("#todoInput");
const todoButtonEl = document.querySelector("#todoBtn");
const logoutButtonEl = document.querySelector("#logoutButton");

const isLogin = () => {
    const loginedUser = localStorage.getItem('login');
    if(!loginedUser){
        alert("로그인이 필요합니다!");
        location.href = "./signin.html";
    }
};

const readTodo = () => {
    todoContainerEl.innerHTML = "";
    const todos = JSON.parse(localStorage.getItem('todos')).reverse();

    todos.forEach(todo => {
        const divEl = document.createElement("div");
        const completeEl = document.createElement("input");
        const userEl = document.createElement("p");
        const deleteEl = document.createElement("button");
        const contentEl = document.createElement('label');

        divEl.className = 'todoItem';//css에서 속성 적용 가능

        completeEl.type = 'checkbox';
        completeEl.className = 'checkbox';
        completeEl.id = todo.id;

        completeEl.checked = todo.complete;//완료 유뮤에 따라 기본적으로 표시가 될지 말지 정한다
        completeEl.addEventListener('click', () => {
            updateComplete(todo.id, completeEl.checked);
        });

        deleteEl.type = 'button';
        deleteEl.textContent = "X";
        deleteEl.className = 'deleteButton';
        deleteEl.addEventListener("click", () => deleteTodo(todo.id));

        contentEl.textContent = todo.content;
        contentEl.htmlFor = todo.id;//htmlFor는 텍스트를 체크하기만 해도 체크박스가 체크되게 하기 위함이다

        userEl.textContent = todo.user;

        divEl.append(completeEl, contentEl, userEl, deleteEl);
        todoContainerEl.append(divEl);
    });
};

const updateComplete = (id, checked) => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const newTodos = todos.map(todo => {
        todo.complete = todo.id === id ? checked : todo.complete;
        return todo;
    });

    localStorage.setItem('todos', JSON.stringify(newTodos));
    readTodo();
};

const createTodo = () => {
    const todoText = todoInputEl.value;
    const todos = JSON.parse(localStorage.getItem('todos'));

    const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    const newTodo = {
        id: newId,
        complete: false,
        content: todoText,
        user: localStorage.getItem('login')
    };
    todos.push(newTodo);

    localStorage.setItem('todos', JSON.stringify(todos));
    todoInputEl.value = "";

    readTodo();
};

const deleteTodo = (deleteId) => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const filteredTodos = todos.filter(todo => todo.id !== deleteId);

    localStorage.setItem('todos', JSON.stringify(filteredTodos));

    readTodo();
};

const logout = () => {
    localStorage.removeItem('login');
    alert('로그아웃!');
    location.href = "./signin.html";
};

const init = () => {
    isLogin();

    if(!localStorage.getItem('todos')){
        localStorage.setItem('todos', JSON.stringify([]));
    }

    readTodo();

    todoButtonEl.addEventListener('click', createTodo);
    logoutButtonEl.addEventListener('click', logout);
};

document.addEventListener('DOMContentLoaded', init);