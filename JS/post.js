import { API_BASE_URL } from "./base-URL.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const queryId = params.get("id");
console.log(queryId);
const postContainer = document.querySelector("#post-container");

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
            <h5 class="card-title">
              ${title}
            </h5>
            <p class="fs-6 fst-italic"><a href="profile.html?name=${name}">${name}</a></p>
            <p class="fs-6 fst-italic">${updated}</p>
            <p class="card-text">
              ${body}
            </p>
            <div class="btn-group">
              <a href="profile.html?name=${name}" class="btn btn-primary">Profile</a>
            </div>
          </div>
        </div>`;
  } catch (error) {
    console.log(error);
  }
}
getPost();
