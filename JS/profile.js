import { API_BASE_URL } from "./base-URL.js";

const main = document.querySelector("#main");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);

let url = "";

//------------------Get profile from query param----------
window.addEventListener("load", () => {
  if (params.get("ownProfile")) {
    url = API_BASE_URL + `social/profiles/${localStorage.getItem("user")}`;
    getprofile(url);
  } else {
    url = API_BASE_URL + `social/profiles/${params.get("name")}`;
    getprofile(url);
  }
});

async function getprofile(paramUrl) {
  try {
    const token = localStorage.getItem("accessToken");
    const sendData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(paramUrl, sendData);
    const json = await response.json();
    document.title = json.name;
    main.innerHTML = ` <div class="container border-bottom border-1 border-black mb-4">
    <div class="row">
      <div class="col-12"><h1>${json.name}</h1></div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="card col-12 col-md-5 border-0 bg-transparent pb-4">
        <div class="card-body px-0">
          <div class="d-flex flex-row align-items-end">
            <h5 class="card-title">${json.name}</h5>
          </div>
          <h5>About me</h5>
          <p class="card-text border-bottom border-1 border-black pb-2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit,
            laborum Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quae, quis.
          </p>
        </div>
      </div>
      
  
      </div>
    </div>
  </div>`;
  } catch (error) {
    console.log(error);
  }
}
