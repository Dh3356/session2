const formEl = document.querySelector("#signupForm");
const idEl = document.querySelector("#signupId");
const passwordEl = document.querySelector("#signupPassword");

const isUserExist = (newUserId) => {
    const users = localStorage.getItem('userList');
    if(!users){
        return false;
    }

    const convertedUsers = JSON.parse(users);
    const getExistUsers = convertedUsers.find(user => user.id === newUserId);

    return getExistUsers ? true : false;//!!getExistUsers
};

const registerUser = (userInfo) => {
    const currentUsers = JSON.parse(localStorage.getItem('userList'));

    if(!currentUsers){
        const newUserList = [];
        newUserList.push({
            id: userInfo.id,
            password: userInfo.password
        });

        localStorage.setItem('userList', JSON.stringify(newUserList));
    }
    else{
        const updatedUsers = currentUsers.concat({
            id: userInfo.id,
            password: userInfo.password
        });//이걸 쓰면 원복 객체를 복사한 후 거기에 추가하므로 원본 객체를 바꾸지 않는다

        localStorage.setItem('userList', JSON.stringify(updatedUsers));
    }
};

const init = () => {
    //일급 객체
    formEl.addEventListener('submit', (e) => {
        e.preventDefault();
        const idValue = idEl.value;
        const passwordValue = passwordEl.value;

        //이미 존재하는 유저일 때
        if(isUserExist(idValue)){
            alert(`${idValue} 유저는 이미 존재합니다!`);
            idEl.value = "";
            passwordEl.value = "";
            return;
        }

        //회원가입이 가능할 때(존재하지 않는 유저라서)
        registerUser({id: idValue, password: passwordValue});
        alert('회원가입 완료!');
        location.href = './signin.html';
    });
};

document.addEventListener("DOMContentLoaded", init);//굳이 init을 하는 이유는 어디서 시작하고 어떤 흐름으로 가는지 알기 위함이다.