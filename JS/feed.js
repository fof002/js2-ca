import { API_BASE_URL } from "./base-URL.js";

const url =
  API_BASE_URL + "social/posts?_author=true&_comments=true&_reactions=true";
const urlCreatePost = API_BASE_URL + "social/posts";
const postContainer = document.querySelector("#post-container");
const postContent = document.querySelector("#blog-post");
const postTitle = document.querySelector("#post-title");
const search = document.querySelector("#search");
const filter = document.querySelector("#flexSwitchCheckDefault");
let deleteButton = "";
let viewButton = "";
let postData = {};
let json = {};

//-----------------Get posts for feed
const getPosts = async () => {
  try {
    postContainer.innerHTML = `<div class="spinner-border text-primary" role="status">
    <span class="sr-only"></span>
  </div>`;
    const token = localStorage.getItem("accessToken");
    const getData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, getData);
    json = await response.json();
    console.log(json);
    postContainer.innerHTML = "";
    for (let i = 0; i < 20; i++) {
      deleteButton = "";
      const {
        title,
        body,
        updated,
        id,
        author: { name },
      } = json[i];
      console.log(localStorage.getItem("user"));
      if (localStorage.getItem("user") === name) {
        deleteButton = `<a id=${id}" class="btn btn-primary delete-button">Delete</a>
        `;
        viewButton = `<a href="edit-post.html?id=${id}" class="btn btn-primary delete-button">Edit</a>
        `;
      } else {
        viewButton = `<a href="post.html?id=${id}" class="btn btn-primary">View</a>
`;
      }
      postContainer.innerHTML += `<div class="card col-12 col-lg-5 border-0 bg-transparent pb-4 box-shadow-custom pt-3">
      <div class="card-body px-0">
        <h5 id="title-${id}" class="card-title">
          ${title}
        </h5>
        <p class="fs-6 fst-italic"><a href="profile.html?name=${name}">${name}</a></p>
        <p class="fs-6 fst-italic">${updated}</p>
        <p class="card-text" id="body-${id}>
          ${body}
        </p>
        <div class="btn-group">
          <a href="profile.html?name=${name}" class="btn btn-primary">Profile</a>
          ${viewButton}
          ${deleteButton}
        </div>
      </div>
    </div>`;
    }
  } catch (error) {
    console.log(error);
  }
};
getPosts();

//----------------------------------------------

//----------------------create blog post

document.addEventListener("click", (event) => {
  if (event.target.matches("#create-post-button")) {
    getPostInput();
    sendPostData(postData);
  }
});

async function sendPostData(userInput) {
  try {
    const token = localStorage.getItem("accessToken");
    const sendData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userInput),
    };
    const response = await fetch(urlCreatePost, sendData);
    const json = await response.json();
    if (json.title) {
      postTitle.value = "";
      postContent.value = "";
      location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}

const getPostInput = () => {
  postData = {
    title: postTitle.value.trim(),
    body: postContent.value,
  };
};
//--------------------------search function
search.addEventListener("keydown", () => {
  if (search.value.length > 1) {
    postContainer.innerHTML = "";
    const filteredResults = json.filter((post) => {
      if (
        post.title.toLowerCase().includes(search.value.toLowerCase()) ||
        post.body.toLowerCase().includes(search.value.toLowerCase())
      ) {
        return true;
      }
    });
    filteredResults.forEach((post) => {
      const {
        title,
        body,
        updated,
        id,
        author: { name },
      } = post;
      postContainer.innerHTML += `<div class="card col-12 col-lg-5 border-0 bg-transparent pb-4 box-shadow-custom pt-3">
  
        <div class="card-body px-0">
          <h5 class="card-title">
            ${title}
          </h5>
          <p class="fs-6 fst-italic"><a href="profile.html/?name=${name}">${name}</a></p>
          <p class="fs-6 fst-italic">${updated}</p>
          <p class="card-text">
            ${body}
          </p>
          <div class="btn-group">
            <a href="profile.html/?name=${name}" class="btn btn-primary">Profile</a>
            <a href="post.html?id=${id}" class="btn btn-primary">View</a>
          </div>
        </div>
      </div>`;
    });
  }
});
//--------------------------------------------
//--------------------------------------delete button
document.addEventListener("click", (event) => {
  if (event.target.matches(".delete-button")) {
    const buttonId = parseFloat(event.target.id);
    const urlDeletePost = API_BASE_URL + `social/posts/${buttonId}`;
    deletePost(urlDeletePost);
  }
});

async function deletePost(urlParamDelete) {
  try {
    const token = localStorage.getItem("accessToken");
    const sendData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(urlParamDelete, sendData);
    const json = await response.json();
    console.log(json);
    getPosts();
  } catch (error) {
    console.log(error);
  }
}

//--------------------filter feed on click
filter.addEventListener("click", () => {
  if (!filter.classList.contains("active-filter")) {
    filter.classList.add("active-filter");
    postContainer.innerHTML = "";
    const filteredResults = json.filter((post) => {
      if (post.author.name === localStorage.getItem("user")) {
        return true;
      }
    });
    filteredResults.forEach((post) => {
      const {
        title,
        body,
        updated,
        id,
        author: { name },
      } = post;
      deleteButton = `<a id=${id}" class="btn btn-primary delete-button">Delete</a>
      `;
      viewButton = `<a href="edit-post.html?id=${id}" class="btn btn-primary delete-button">Edit</a>
      `;
      postContainer.innerHTML += `<div class="card col-12 col-lg-5 border-0 bg-transparent pb-4 box-shadow-custom pt-3">
      <div class="card-body px-0">
        <h5 id="title-${id}" class="card-title">
          ${title}
        </h5>
        <p class="fs-6 fst-italic"><a href="profile.html?name=${name}">${name}</a></p>
        <p class="fs-6 fst-italic">${updated}</p>
        <p class="card-text" id="body-${id}>
          ${body}
        </p>
        <div class="btn-group">
          <a href="profile.html?name=${name}" class="btn btn-primary">Profile</a>
          ${viewButton}
          ${deleteButton}
        </div>
      </div>
    </div>`;
    });
  } else {
    filter.classList.remove("active-filter");
    getPosts();
  }
});
