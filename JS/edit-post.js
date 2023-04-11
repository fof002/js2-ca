import { API_BASE_URL } from "./base-URL.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const queryId = params.get("id");
console.log(queryId);
const postContainer = document.querySelector("#post-container");
let postData = {};
const url =
  API_BASE_URL +
  `social/posts/${queryId}?_author=true&_comments=true&_reactions=true`;

async function getPost() {
  try {
    const token = localStorage.getItem("accessToken");
    const sendData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, sendData);
    const json = await response.json();
    const {
      title,
      body,
      updated,
      author: { name },
    } = json;
    postContainer.innerHTML = `<div class="card col-12 col-lg-5 border-0 bg-transparent pb-4 box-shadow-custom pt-3">
          <div class="card-body px-0">
            <input id="title" type="text" value="${title}">
            </input>
            <p class="fs-6 fst-italic"><a href="profile.html?name=${name}">${name}</a></p>
            <p class="fs-6 fst-italic">${updated}</p>
            <textarea id="body">${body}</textarea><br>
            <div class="btn-group mt-2">
            <a id="edit-post-button" class="btn btn-primary">Save</a>
            </div>          
          </div>
        </div>`;
  } catch (error) {
    console.log(error);
  }
}
getPost();

//------------------------Edit post eventlistener

document.addEventListener("click", (event) => {
  if (event.target.matches("#edit-post-button")) {
    const postTitle = document.querySelector("#title");
    const postBody = document.querySelector("#body");
    postData = {
      title: postTitle.value.trim(),
      body: postBody.value,
    };
    editPost(postData);
  }
});

async function editPost(userInput) {
  try {
    const token = localStorage.getItem("accessToken");
    const sendData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userInput),
    };
    const response = await fetch(url, sendData);
    const json = await response.json();
    location.assign(`feed.html`);
  } catch (error) {
    console.log(error);
  }
}
