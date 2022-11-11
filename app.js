import {storeQuestions} from './questions.js'

let questions           = storeQuestions;
let elQuestionScreen    = document.getElementById("questionscreen");
let elAnswerscreen      = document.getElementById("answerscreen");
let elWelcomeScreen     = document.getElementById("welcomescreen");
let elwelcomeError      = document.getElementById("welcomeError");
let elWelcomeBtn        = document.getElementById("welcome_btn");
let elNumberOfQuestions = document.getElementById("numberOfQuestions");
let elUserNameView      = document.getElementById("userNameView");
let elshowAnswersUser   = document.getElementById("showAnswersUser");
let valUserName         = "";
let todoLosUsuario      = new Object();         


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * State
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const state = {    
  index:null
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * State User
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const stateUser = {
  user:'',
  answers:[]
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * State All Users
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const stateAllUsers = {
  users:[]  
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *  Renderiza
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const render = () => {
  elQuestionScreen.innerHTML = "";  
  elQuestionScreen.append(getCard(questions,state.index,enterAnswer))
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Setea
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const setState = (obj) => { 
  for (let key in obj) {
      if (state.hasOwnProperty(key)) {
          state[key] = obj[key]
      }
  }
  localStorage.setItem("index",state.index);
  render()
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Setea User
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const setStateUser = (obj) => { 
  for (let key in obj) {
      if (stateUser.hasOwnProperty(key)) {
        stateUser[key] = obj[key]
      }
  }  
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Setea All User
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const setStateAllUsers = (obj) => { 
  for (let key in obj) {
      if (stateAllUsers.hasOwnProperty(key)) {
        stateAllUsers[key] = obj[key]
      }
  }  
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *Función para obtener una COPIA del estado
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const getState     = () => JSON.parse(JSON.stringify(state))
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *Función para obtener una COPIA del usuario
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const getStateUser = () => JSON.parse(JSON.stringify(stateUser))
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *Función para obtener una COPIA de todos los usuarios
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
 const getStateAllUsers = () => JSON.parse(JSON.stringify(stateAllUsers));

 
const getCard = (questions, index,func,index_resp=null,p_user=null) =>{

  let es_admin              = localStorage.getItem("admin");
  es_admin                  = (es_admin == null)? 0 : es_admin;

  let container             = document.createElement("div");
  container.classList.add("card")
  let questionNumber        = document.createElement("h3");
  let num_tot               = questions.length;
  let num_act               = parseInt(index);
  if(es_admin){
    let close                 = document.createElement("div");
    let close_span            = document.createElement("span");
    close.classList.add("delete_question"); 
    close_span.innerHTML  = "X";
    close_span.title      = "Eliminar esta respuesta";
    close_span.addEventListener("click",function(){deleteAnswer(index,p_user)});
    close.append(close_span);
    container.append(close);
  }
  questionNumber.textContent= `Pregunta ${num_act + 1}/${num_tot}`;
  let title                 = questions[index][0]; //titulo
  let questionTitle         = document.createElement("h4");
  questionTitle.textContent = title;
  let questionAnswers       = document.createElement("ul");
  questionAnswers.classList.add("question__answer");

  questions[index][1].forEach((answer, index) => {
    let elAnswer = document.createElement("li");
    let className= (index_resp == index+1) ? "answer_resp" : "answer";
    
    elAnswer.classList.add(className);        
    
    elAnswer.textContent    = answer;
    elAnswer.id             = index + 1;
    elAnswer.addEventListener("click", func);
    questionAnswers.append(elAnswer);
  });
  
  container.append(questionNumber);
  container.append(questionTitle);
  container.append(questionAnswers);

  return container;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* Eliminar respuesta de una pregunta
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
export const deleteAnswer = (p_index,p_user) =>{
let obtieneTodosLosUsuarios = JSON.parse(localStorage.getItem("todosLosUsuarios"));
let stateUser               = getStateUser();
for(let i in obtieneTodosLosUsuarios){
  if(i == p_user){      
    for (let l in obtieneTodosLosUsuarios[i]){
      if(l == p_index){          
        delete obtieneTodosLosUsuarios[i][l];   
      }
    }
  }    
}

stateUser["answers"].forEach((valor,index)=>{
  if(p_index == index){
    delete stateUser["answers"][index];   
  }
})
setStateUser(stateUser)

localStorage.setItem("todosLosUsuarios",JSON.stringify(obtieneTodosLosUsuarios))

showAnswers();
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const enterAnswer = (event) => {

  let selectedAnswer = event.target.id;
  let index_act      = state.index;     //pregunta actual, siendo la primera index=0
  let aum            = 1;

  let listAnswer     = getStateUser();
  let user           = localStorage.getItem("user");
  listAnswer.answers.push([index_act,selectedAnswer])
  setStateUser(listAnswer)
  
  listAnswer          = getStateUser();
  todoLosUsuario[listAnswer.user] = listAnswer.answers
  let obtieneTodosLosUsuarios     = localStorage.getItem("todosLosUsuarios");

  if(obtieneTodosLosUsuarios == null){
    localStorage.setItem("todosLosUsuarios",JSON.stringify(todoLosUsuario));    
  }
  else{ 
    obtieneTodosLosUsuarios = JSON.parse(obtieneTodosLosUsuarios);

    let existe = false;
    for(let i in obtieneTodosLosUsuarios){
      if(user == i){
        obtieneTodosLosUsuarios[i] = listAnswer.answers;
        existe = true;
      }
    }

    if(!existe){
      obtieneTodosLosUsuarios[user] = listAnswer.answers;
    }
    localStorage.setItem("todosLosUsuarios",JSON.stringify(obtieneTodosLosUsuarios));    
  }
  if(
      (
        (index_act == 0 ||
         index_act == 3 ||
         index_act == 6 ||
         index_act == 9
        ) 
        &&
        selectedAnswer == 2
      ) 
      ||
      index_act == 1 ||
      index_act == 4 ||
      index_act == 7 ||
      index_act == 10
    ) {
      aum = 2;
      //aum = 1;
  } 
  
  if(state.index + aum < questions.length){//si aun queda preguntas por responder
    setState({
      index: (state.index + aum)
    })    
   btnStart();
  }
  else{//cuando finaliza todo
    finalizaEncuesta();
  }
};
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const inicio = () =>{
    elwelcomeError.style.display  = "block";
    elWelcomeScreen.style.display = "block";
    elAnswerscreen.style.display  = "block";
    elQuestionScreen.style.display= "none";
    elUserNameView.style.display  = "none";    
    elwelcomeError.style.display  = "none";
    elUserNameView.innerHTML      = "";
    elwelcomeError.innerHTML      = "";
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Ver las respuesta 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const showAnswers = () => {
  
  elQuestionScreen.innerHTML = "";
  let es_admin        = localStorage.getItem("admin");
      es_admin        = (es_admin == null)? 0 : es_admin;

  let eltitle         = document.createElement("h1");  
  let eluser          = document.createElement("div");
  let users           = getStateUser();
  let nom_user        = users.user;
  let arrUsers        = Object.entries(users);//convertimos el objeto en un array

  if(es_admin){
    eltitle.textContent = "Visualización de Respuestas";
    eluser.innerHTML    = "<strong>Usuario: </strong>"+nom_user;
    eluser.classList.add("nom_user")
    elQuestionScreen.append(eltitle);
  }
  elQuestionScreen.append(eluser);
  
  questions.forEach((question, index) => {
    
    let resp = (arrUsers[1][1][index]===null || arrUsers[1][1][index] === undefined)? null : arrUsers[1][1][index][1];
    resp = parseInt(resp)
    elQuestionScreen.append(getCard(questions,index,null,resp,nom_user))
    
  });
  
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Finaliza la encuesta
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const finalizaEncuesta = () =>{
  let eltitle         = document.createElement("h3");
  eltitle.textContent = "Gracias por responder";
  eltitle.classList.add("title2");
  let btnShow         = document.createElement("button");
  btnShow.addEventListener("click", showAnswers);
  btnShow.innerHTML       ='Ver mis Respuestas';
  btnShow.classList.add("btn_ingresar");
  elQuestionScreen.innerHTML = "";
  elQuestionScreen.append(eltitle);  
  btnStart();
  elQuestionScreen.append(btnShow);

  localStorage.removeItem("index"); //quitamos esta bandera  
  localStorage.removeItem("user");
};
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const seeFirstQuestion = () => {
  let okUser  = true;
  valUserName = document.getElementById("username").value;
  if(!valUserName.length) valUserName = "Anónimo";

  let obtieneTodosLosUsuarios    = localStorage.getItem("todosLosUsuarios");

  if(obtieneTodosLosUsuarios != null){    
    obtieneTodosLosUsuarios = Object.keys(JSON.parse(obtieneTodosLosUsuarios));    
    for(let i in obtieneTodosLosUsuarios){
      if(valUserName == obtieneTodosLosUsuarios[i]){
        okUser = false;
      }
    }    
  }

  if(okUser){
    localStorage.removeItem("admin");
    elwelcomeError.style.display  = "none";
    elWelcomeScreen.style.display = "none";
    elAnswerscreen.style.display  = "none";
    elQuestionScreen.style.display= "block";
    elUserNameView.style.display  = "block";
    elUserNameView.innerHTML      = "<span><strong>Usuario:</strong> " +valUserName +"</span>"
    
    let index = 0;//localStorage.getItem("index");                                                =>   DESCOMENTAR
    index     = (index==null)? 0 : index;
    localStorage.setItem("user",valUserName);
    //Estableciendo valores por defecto al State    
    setStateUser({user: valUserName,answers:[]})
    setState({index: index})
    btnStart();    
  }
  else{
    elwelcomeError.style.display = "block";
    elwelcomeError.innerHTML="<h4>Error: el usuario <i class='userNameAnserwers'>" +valUserName+" </i> ya existe</h4>";
  }
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const btnStart = () => {
  let btnStart         = document.createElement("button");
  btnStart.addEventListener("click", inicio);
  btnStart.innerHTML       ='Volver';
  btnStart.classList.add("btn_volver");
  elQuestionScreen.append(btnStart);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const seeAnswersUser = () => {
  elwelcomeError.style.display  = "none";
  elWelcomeScreen.style.display = "none";
  elAnswerscreen.style.display  = "none";
  elQuestionScreen.style.display= "block";
  elUserNameView.style.display  = "block";
  elQuestionScreen.innerHTML    ="";
  elUserNameView.innerHTML      = "Admin";
  let eltitle                   = document.createElement("h1");
  eltitle.textContent           = "Ingreso de Administrador";

  let btnAdmin                  = document.createElement("button");
  btnAdmin.addEventListener("click", logAdmin);
  btnAdmin.innerHTML            ='Ingresar';
  btnAdmin.classList.add("btn_ingresar");
  let divCampo                  = document.createElement("div");
  divCampo.classList.add("password");
  
  let campo                   = document.createElement("input")
  campo.type                  = "password"
  campo.id                    = "txt_pass";
  campo.placeholder           = "Ingrese su clave";

  divCampo.append(campo);
  elQuestionScreen.append(eltitle);
  elQuestionScreen.append(divCampo);
  btnStart();
  elQuestionScreen.append(btnAdmin);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const logAdmin = () => {
  let elpass                = document.getElementById("txt_pass");
  if(elpass.value != ''){
    let pass_admin  = localStorage.getItem("pass");
    if(elpass.value == pass_admin){
      fn_showUsers();
      localStorage.setItem("admin",1);
    }
    else{
      elwelcomeError.style.display  = "block";
      elwelcomeError.innerHTML      = "Clave no válida.";
      elpass.value                  = "";
      elpass.focus
    }
  }
  else{
    elwelcomeError.style.display  = "block";
    elwelcomeError.innerHTML      = "Debe ingresar una clave para continuar.";
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const fn_showUsers = () => {
  elQuestionScreen.innerHTML="";
  elwelcomeError.style.display  = "none";
  elwelcomeError.innerHTML      = "";
  let eltitle         = document.createElement("h1");
  eltitle.textContent = "Usuarios Registrados en Sistema";
  elQuestionScreen.append(eltitle);

  let obtieneTodosLosUsuarios     = localStorage.getItem("todosLosUsuarios");

  if(obtieneTodosLosUsuarios != null){
    let htmlUser = "";
    obtieneTodosLosUsuarios = Object.keys(JSON.parse(obtieneTodosLosUsuarios));     
    let elul         = document.createElement("div");
    for(let i in obtieneTodosLosUsuarios){

      let elli1           = document.createElement("div");
      let elli2           = document.createElement("div");
      let elspan1         = document.createElement("span");
      elspan1.id          = "show";
      elspan1.textContent = "Ver";
      elspan1.title       = "Ver encuesta"; 

      let elspan2       = document.createElement("span");
      elspan2.id ="delete";
      elspan2.textContent ="X";
      elspan2.title = "Eliminar usuario";
      elli1.textContent = obtieneTodosLosUsuarios[i]
      elli1.classList.add("users_list");
      elli1.setAttribute("var1",obtieneTodosLosUsuarios[i])
      elspan1.addEventListener("click", function(){seeAnswerUserByAdmin(obtieneTodosLosUsuarios[i])});
      elspan2.addEventListener("click", function(){deleteUserByAdmin(obtieneTodosLosUsuarios[i])});
      elli2.append(elspan1)
      elli2.append(elspan2)
      elli1.append(elli2)
      elul.append(elli1)      
    } 
    elQuestionScreen.append(elul);
  }
  else{
    elwelcomeError.innerHTML = "No hay usuarios registrados";
    elwelcomeError.style.display  = "block";    
  } 
  btnStart(); 
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const deleteUserByAdmin = (p_user) => {
  let obtieneTodosLosUsuarios = JSON.parse(localStorage.getItem("todosLosUsuarios"));

  for(let i in obtieneTodosLosUsuarios){
    if(i == p_user){
      delete obtieneTodosLosUsuarios[i];      
    }
  }
  localStorage.setItem("todosLosUsuarios",JSON.stringify(obtieneTodosLosUsuarios))
  fn_showUsers();
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const seeAnswerUserByAdmin = (p_user) => {
  let obtieneTodosLosUsuarios = JSON.parse(localStorage.getItem("todosLosUsuarios"));
  let arr     = [];
  let existe  = false;

  for(let i in obtieneTodosLosUsuarios){
    if(i == p_user){
      existe = true;
      for (let l in obtieneTodosLosUsuarios[i]){
        arr[l] = obtieneTodosLosUsuarios[i][l]
      }
    }    
  }
  if(existe){
    setStateUser({'user':p_user, 'answers':arr})
    showAnswers();
    btnStart();
  }
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const checkUser = () =>{
  let valUserName = localStorage.getItem("user")
  let index       = localStorage.getItem("index")

  if(index != null && valUserName != null ){// hay un usuario contestando la encuesta


    elwelcomeError.style.display  = "none";
    elWelcomeScreen.style.display = "none";
    elAnswerscreen.style.display  = "none";
    elQuestionScreen.style.display= "block";
    elUserNameView.style.display  = "block";
    elUserNameView.innerHTML      = "<span><strong>Usuario:</strong> " +valUserName +"</span>"

    setStateUser({user: valUserName})
    setState({index: parseInt(index)})
    btnStart();                       
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/*
localStorage.removeItem("index");
localStorage.removeItem("stateUser");
localStorage.removeItem("usuarios");
localStorage.removeItem("user");
localStorage.removeItem("todosLosUsuarios"); 
*/
elWelcomeBtn.addEventListener("click", seeFirstQuestion);
elNumberOfQuestions.innerHTML = questions.length
elshowAnswersUser.addEventListener("click", seeAnswersUser);
localStorage.setItem("pass","admin");
checkUser();