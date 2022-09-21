//const ile değişkenler sabit olarak eklendi
let user=prompt("lütfen adınızı giriniz")
let greeting=document.querySelector("#greeting")
greeting.innerHTML=`${greeting.innerHTML} <small>${user}</small>`
const form = document.getElementById("form");
const textInput = document.getElementById("textInput");
const dateInput = document.getElementById("dateInput");
const textarea = document.getElementById("textarea");
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");
const add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => { //forma ekleme yapılıp yapılmadığını kontrol ediyor
  if (textInput.value === "") {
    console.log("Başarısız");
    msg.innerHTML = "Boş Ekleme Yapamazsınız";
  } else {
    console.log("Başarılı");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
    confirm("Eklemek İstediğine Emin Misin?")

  }
};

let data = [{}];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));  //javascript object olan veriyi string formatına dönüştürüyor.

  console.log(data);
  createTasks();
};

let createTasks = () => { // ekleme işlemini bu kısım yapıyor.
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="far fa-edit" style="font-size:28px;color:green"></i> 
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt" style="font-size:28px;color:red"></i>
          </span> <i class="fa-solid fa-file-pen"></i>
        </div>
    `); 
    

    
    
  });
  

  resetForm(); // ekleme yapıldığı zaman formun temiz olarak gelmesini sağlıyor
 
};

let deleteTask = (e) => { //silme işlemini yapıyor
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement; //düzenleme işlemini yapıyor

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

let resetForm = () => { //formun içerisindeki inputları boş hale getiriyor
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

(() => {  
  data = JSON.parse(localStorage.getItem("data")) || [] //string formatında olan veriyi object formatına dönüştürüyor
  console.log(data);
  createTasks();
})();


let list = document.querySelector('div'); //seçili olan öğede işaretleme yapıyor
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'span') {
    ev.target.classList.toggle('checked');
  }
}, false);
















