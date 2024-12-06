var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPass = document.getElementById("signupPassword");
var signupBtn = document.getElementById("signupBtn");
var signinLink = document.getElementById("signinLink");
var signupDiv = document.getElementById("signupDiv");

var signinDiv = document.getElementById("signinDiv");
var signinBtn = document.getElementById("signinBtn");
var signinEmail = document.getElementById("signinEmail");
var signinPass = document.getElementById("signinPassword");
var signupLink = document.getElementById("signupLink");

var nav = document.getElementById("nav");
var welcome = document.getElementById("welcome");

var users;
var curuntUser;
var check = 1;




if (localStorage.getItem("users") == null) {
  users = [];
  check = 0
} else {
  users = JSON.parse(localStorage.getItem("users"));
}

if (localStorage.getItem("curuntUser") == null) {
  curuntUser = [];
  signupDiv.classList.add("d-none")
  signinDiv.classList.remove("d-none")
  nav.classList.add("d-none")
  welcome.classList.add("d-none")
} else {
  curuntUser = JSON.parse(localStorage.getItem("curuntUser"));

  signinDiv.classList.add("d-none")
  signupDiv.classList.add("d-none")
  nav.classList.remove("d-none")
  welcome.classList.remove("d-none")
        
  sayWelcome()
}


signupBtn.addEventListener("click", function test() {
  signup();
});

signinBtn.addEventListener("click", function test() {
  login();
});

signinLink.addEventListener("click", function test() {
  signupDiv.classList.add("d-none")
  signinDiv.classList.remove("d-none")
  nav.classList.add("d-none")
  welcome.classList.add("d-none")
});

signupLink.addEventListener("click", function test() {
  signinDiv.classList.add("d-none")
  signupDiv.classList.remove("d-none")
  nav.classList.add("d-none")
  welcome.classList.add("d-none")
});

document.getElementById("Logout").addEventListener("click", function test() {

  signupDiv.classList.add("d-none")
  signinDiv.classList.remove("d-none")
  nav.classList.add("d-none")
  welcome.classList.add("d-none")

  Logout()
});




function signup() {

  if(signupName.classList.contains("valid")&& signupEmail.classList.contains("valid")&& signupPass.classList.contains("valid"))
  {
    for (var i = 0; i < users.length; i++) {
      if (signupEmail.value == users[i].email) {
        document.getElementById("signupMessage").innerHTML = `<span class="text-danger m-3"> email already exists </span>`;
        check = 1 ;   
        break;     
      }
      else{
        check = 0 ;
      }
    }
    if (check == 0) {
      var newUser = {
      name: signupName.value,
      email: signupEmail.value,
      password: signupPass.value,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      document.getElementById("signupMessage").innerHTML = `<span class="text-success m-3">Success</span>`;

      clear();
    }
    
  }
  else{
    document.getElementById("signupMessage").innerHTML = `<span class="text-danger m-3"> name must contain at least 3 characters and email must contain at least 3 characters then @gmail.com and password must contain at least 4 characters</span>`;
  }

  
}

function clear() {
  signupName.value = null;
  signupEmail.value = null;
  signupPass.value = null;

  signinEmail.value = null;
  signinPass.value = null;

  signupName.classList.remove("valid");
  signupEmail.classList.remove("valid");
  signupPass.classList.remove("valid");

  check = 1;
}

function validation(element) {

  var regex = {
    signupName: /^\w{3,}(\s+\w+)*$/ ,
    signupEmail:/^\w{3,}@gmail\.com$/ ,
    signupPassword:/^\w{4,}$/ ,
  };

  if (regex[element.id].test(element.value) == true ) {
    element.classList.add("valid")
    element.classList.remove("invalid")
  } else {
    element.classList.add("invalid")
    element.classList.remove("valid")
  }
  
}

function login() {
  for (var i = 0; i < users.length; i++) {
    if (signinEmail.value == users[i].email) {
      if(signinPass.value == users[i].password){

        var user = {
          name: users[i].name,
          email: users[i].email,
          password: users[i].password,
        };
    
        curuntUser.push(user);
        localStorage.setItem("curuntUser", JSON.stringify(curuntUser));

        signinDiv.classList.add("d-none")
        signupDiv.classList.add("d-none")
        nav.classList.remove("d-none")
        welcome.classList.remove("d-none")

        
        sayWelcome()
        clear()
      }
      else{
        document.getElementById("signinMessage").innerHTML = `<span class="text-danger m-3"> incorrect password </span>`;
      }
      break;
    }
  }
  if(i == users.length){
    document.getElementById("signinMessage").innerHTML = `<span class="text-danger m-3"> email not found </span>`;
  }
}

function sayWelcome() {
  document.getElementById("username").innerHTML = `welcome ${curuntUser[0].name}`;
}

function Logout() {
  localStorage.removeItem("curuntUser");
}