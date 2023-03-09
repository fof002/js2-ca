import { API_BASE_URL } from "./base-URL.js";

const url = API_BASE_URL + "social/posts";

const getPosts = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const getData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, getData);
    const json = await response.json();
    console.log(json);
    for (let i = 0; i < json.length; i++) {
      console.log(json[i].title);
    }
  } catch (error) {
    console.log(error);
  }
};
getPosts();
