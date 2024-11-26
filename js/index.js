var namee = document.getElementById("Name");
var url = document.getElementById("URL");
var sub = document.getElementById("submitBtn")


var Bookmarks;

if (localStorage.getItem("Bookmarks") == null) {
  Bookmarks = [];
} else {
  Bookmarks = JSON.parse(localStorage.getItem("Bookmarks"));
  display();
}

sub.addEventListener("click",function test(){ addBookmark() })

function addBookmark() {
  if(namee.classList.contains("is-valid")&& url.classList.contains("is-valid"))
  {
    var Bookmark = {
    bookmarkName: namee.value,
    bookmarkUrl: url.value,
    };

    Bookmarks.push(Bookmark);
    localStorage.setItem("Bookmarks", JSON.stringify(Bookmarks));
    display();
    clear();
  }
  else{
    Swal.fire({
        icon: "error",
        title: "Site Name or Url is not valid, Please follow the rules below :",
        text: "Site name must contain at least 3 characters and Site URL must be a valid one",
      });
  }
  
}

function clear() {
  namee.value = null;
  url.value = null;
  namee.classList.remove("is-valid");
  url.classList.remove("is-valid");
}

function display() {
  var shanta = "";
  for (var i = 0; i < Bookmarks.length; i++) {
    shanta += `
              <tr>
                <td>${i + 1}</td>
                <td>${Bookmarks[i].bookmarkName}</td>              
                <td>
                  <button onclick="window.open('${Bookmarks[i].bookmarkUrl}','_blank')" class="btn visit" id="visitBtn">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button onclick="deleteBookmark(${i})" class="btn delete pe-2">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
            `;
  }
  document.getElementById("tableContent").innerHTML = shanta;
}

function deleteBookmark(index) {
  Bookmarks.splice(index, 1);
  display();
  localStorage.setItem("Bookmarks", JSON.stringify(Bookmarks));
}

function validation(element) {

  var regex = {
    Name:  /^\w{3,}(\s+\w+)*$/,
    URL : /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/,
  };
  
  if (regex[element.id].test(element.value) == true ) {
    element.classList.add("is-valid")
    element.classList.remove("is-invalid")
  } else {
    element.classList.add("is-invalid")
    element.classList.remove("is-valid")
  }
}