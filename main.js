// 유저가 값을 입력한다.
// +버튼을 클릭하면, 할일이 추가된다.
// delete버튼을 누르면 할일이 삭제된다.

// check버튼을 누르면 할일이 끝나면서 밑줄이 간다.
//1.check버튼을 클릭하는 순간 true false
//2.true이면 끝난걸로 간주하고 밑줄 보여주기
//3.false이면 안끝난걸로 간주하고 그대로

// 진행중, 끝남, 아이템만, 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let topUnderline = document.getElementById("under-line");
let taskList = []; // 할일을 추가해줄 array
let mode = 'all';
let filterList = [];
addButton.addEventListener("click",addTask);

//enter
taskInput.addEventListener("keydown", function (event){
  if(event.key === "Enter"){
    addTask(event);  }
});

for(let i =1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event){
    filter (event);
  });
}
//tap underline
tabs.forEach((taskTabs =>
  taskTabs.addEventListener("click",(e) =>tabsIndicator(e))
));
function tabsIndicator(e){
  topUnderline.style.left = e.currentTarget.offsetLeft + "px";
  topUnderline.style.width = e.currentTarget.offsetWidth + "px";
  topUnderline.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}

function addTask(){
  //let taskContent = taskInput.value;  유저가 입력한 값을 받아온다 그런데 할일이 끝났는지 안끝났는지 타입에 대한 정보는 알수없어서 객체를 만들어준다. 
  let task = {
    id:randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete:false,
  };
  //taskList.push(taskContent); 이제 객체를 만들었으니 값만 넣어주는 변수는 필요가 없음
  taskList.push(task);
  console.log(taskList);
  render();
  }
 
function render(){
  //내가 선택한 탭에 따라서 
  //리스트를 달리 보여준다.
  let list=[]
  if(mode == "all"){
 //all = taskList
 list = taskList;
  }else if(mode == "ongoing" || mode == "done" ){
  //ongoing & done = filterList
  list = filterList;
  }


  let resultHTML ='';
  for(let i = 0; i<list.length; i++ ){
  if(list[i].isComplete == true){
    resultHTML += `<div class="task">
    <div class="task-done"><span>${list[i].taskContent}</span></div>
   
    <div>
       <button onclick ="toggleComplete('${list[i].id}')" class="check"><i class="fa-solid fa-check"></i></button>
       <button onclick="deleteTask('${list[i].id}')" class="delete"><i class="fa-solid fa-trash"></i></button>
   </div>
   
   </div>
    `;
  }else{
    resultHTML += `<div class="task">
    <div><span>${list[i].taskContent}</span></div>
   
    <div>
       <button onclick ="toggleComplete('${list[i].id}')" class="check"><i class="fa-solid fa-check"></i></button>
       <button onclick="deleteTask('${list[i].id}')" class="delete"><i class="fa-solid fa-trash"></i></button>
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


// function deleteTask(id){
//   for (let i = 0; i < taskList.length; i++) {
//     if (taskList[i].id == id) {
//       taskList.splice(i, 1);
//       break;
//     }
//   }
//   render();
// }

// 필터된 탭 안에서도 삭제 가능 하도록 수정된 코드
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  // 삭제 후에도 올바른 필터링된 리스트를 유지하기 위해 다시 필터링을 수행하고 render 함수 호출
  filter({ target: { id: mode } });
}

// function filter(event){
//   mode = event.target.id;
//   filterList =[];
//   if(mode === "all"){
// //전체 리스트 보여준다
//  render();
//   }else if(mode === "ongoing"){
//     for(let i = 0; i <taskList.length; i ++){
//       if(taskList[i].isComplete === false){
//         filterList.push(taskList[i])
//       }
//     }
   
//     render();
//   }else if(mode === "done"){
//     for(let i = 0; i <taskList.length; i ++){
//       if(taskList[i].isComplete === true){
//         filterList.push(taskList[i]);
//       }
//     }
//     render();
// }
// }

// 필터 기능 수정된 코드
function filter(event) {
  mode = event.target.id;
  filterList = [];

  // 모드에 따라 올바른 필터링을 수행
  if (mode === "all") {
    filterList = taskList;
  } else if (mode === "ongoing") {
    filterList = taskList.filter(task => !task.isComplete);
  } else if (mode === "done") {
    filterList = taskList.filter(task => task.isComplete);
  }

  // 올바른 필터링이 수행된 리스트를 가지고 render 함수 호출
  render();
}


//버튼을 클릭했을때 함수가 바로 실행되게 하려면 onclick이벤트를 실행할수있다.
//그리고 함수는 내가 어떤 아이템을 선택했는지 모름 그래서 객체에 아이디를 만들어줘야함
function randomIDGenerate(){
  return "_" + Math.random().toString(36).substr(2, 9);
}
