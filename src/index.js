let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", getToys);

function getToys() {
  fetch("http://127.0.0.1:3000/toys")
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      const toysList = document.getElementById("toy-collection");
      data.forEach((item) => {
        const div = document.createElement("div");
        const h2 = document.createElement("h2");
        const img = document.createElement("img");
        const p = document.createElement("p");
        const button = document.createElement("button");

        
        toysList.appendChild(div);
        div.className = "card";
        div.appendChild(h2);
        h2.innerText = item.name;
        div.appendChild(img);
        img.setAttribute("src", `${item.image}`);
        img.className = "toy-avatar";
        div.appendChild(p);
        p.innerText = `${item.likes} Likes`
        div.appendChild(button);
        button.className = "like-btn";
        button.innerText = "Like ❤️";

        button.addEventListener("click", likeCount);
        function likeCount () {
          item.likes += 1
          p.innerText = `${item.likes} Likes`
          fetch(`http://localhost:3000/toys/${item.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(item.likes)
          })
          .then(response => response.json())
          .then(data => console.log(data))
        }


      });
    });
}




const form = document.querySelector(".add-toy-form");
const inputName = document.querySelector("#input-name")
const inputUrl = document.querySelector("#input-url")
//console.log(form)
form.addEventListener("submit", createToy);

function createToy(){
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": `${inputName.value}`,
      "image": `${inputUrl.value}`,
      "likes": 0
    })
  })
}

