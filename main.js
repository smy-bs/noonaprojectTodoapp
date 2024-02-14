// 유저가 값을 입력한다.
// +버튼을 클릭하면, 할일이 추가된다.
// delete버튼을 누르면 할일이 삭제된다.

// check버튼을 누르면 할일이 끝나면서 밑줄이 간다.
//1.check버튼을 클릭하는 순간 true fqlse
//2.true이면 끝난걸로 간주하고 밑줄 보여주기
//3.flase이면 안끝난걸로 간주하고 그대로

// 진행중, 끝남, 아이템만, 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []; // 할일을 추가해줄 array
addButton.addEventListener("click",addTask);

function addTask(){
  //let taskContent = taskInput.value;  유저가 입력한 값을 받아온다 그런데 할일이 끝났는지 안끝났는지 타입에 대한 정보는 알수없어서 객체를 만들어준다. 
  let task = {
    id:randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete:false,
  }
  //taskList.push(taskContent); 이제 객체를 만들었으니 값만 넣어주는 변수는 필요가 없음
  taskList.push(task);
  console.log(task);
  render();
  }
 
function render(){
  let resultHTML =''
  for(let i = 0; i<taskList.length; i++ ){
  if(taskList[i].isComplete == true){
    resultHTML =+ `<div class="task">
    <div class="task-done"><span>${taskList[i].taskContent}</span></div>
   
    <div>
       <button onclick ="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check"></i></button>
       <button onclick="deleteTask()"><i class="fa-solid fa-trash"></i></button>
   </div>
   
   </div>
    `;
  }else{
    resultHTML += `<div class="task">
    <div>${taskList[i].taskContent}</div>
   
    <div>
       <button onclick ="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check"></i></button>
       <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash"></i></button>
   </div>
   
   </div>
    `;
  }
    
}
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
for(let i = 0; i< taskList.length; i++){
  if(taskList[i].id == id){//taskList의 i 번째있는 아이템의 아이디가 매개변수로 받은 이 아이디와 같다면
    taskList[i].isComplete = !taskList[i].isComplete; //!는 not의 의미로 현재값의 반대값을 가져오니 스위치처럼 사용한다.
  break;
  }// 아이템하나 찾고나면 더이상 찾을 이유가 없으니 종료}
}
render();
}

function deleteTask(){
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}
//버튼을 클릭했을때 함수가 바로 실행되게 하려면 onclick이벤트를 실행할수있다.
//그리고 함수는 내가 어떤 아이템을 선택했는지 모름 그래서 객체에 아이디를 만들어줘야함
function randomIDGenerate(){
  return '_' + Math.random().toString(36).substr(2.9);
}