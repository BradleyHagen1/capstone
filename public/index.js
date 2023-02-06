const baseUrl = "http://localhost:5678";

const activityDisplay = document.querySelector("#activityDisplay");

const addNewActivity = document.querySelector("#addActivity");

const cardArray = [];


const createActivityCard = (activity) => {
  const newActivityCard = document.createElement("section");
  newActivityCard.classList.add("activity-card");

  newActivityCard.innerHTML = `
      <div style="visibility: hidden" id="activity${activity.id}">
        <img class='activity-picture' alt='activity picture' src= ${activity.picture}/>
        <p>${activity.name}</p>

        <br>

        <button onclick="deleteActivity(${activity.id})">Delete</button> 
        <br>
        <br>
      </div>
    `;
    newActivityCard.visiblity = false;
    newActivityCard.id = activity.id;
    console.log(newActivityCard)
    cardArray.push(newActivityCard);
  activityDisplay.appendChild(newActivityCard);
  
};

const activityDisplayAll = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i].visibility= false;
    createActivityCard(arr[i]);
  }
};

const getAllActivity = () => {
  axios
    .get(`${baseUrl}/activity`)
    .then((response) => {
    
      activityDisplayAll(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteActivity = (id) => {
  let el =  document.getElementById(`activity${id}`);
  el.style.visibility = 'hidden';
  el.parentNode.removeChild(el);

};

const addActivity = () => {

  activityDisplay.innerHTML = "";

  const name = document.querySelector("#activityName");
  const picture = document.querySelector("#activityPicture");

  let bodyObj = {
    name: name.value,
    url: picture.value,
  };

  axios
    .post(`${baseUrl}/activity`, bodyObj)
    .then((response) => {
      
      activityDisplayAll(response.data);

      name.value = "";
      picture.value = "";
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateActivity = (id, type) => {
  
    let bodyObj = {
    type: type
  };

  axios
    .put(`${baseUrl}/activity/${id}`, bodyObj)
    .then((response) => {
    
      activityDisplay.innerHTML = ``;
      activityDisplayAll(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};



function duckButton() {
  
  let count = 0;
  cardArray.forEach(card => {
    if (!card.visiblity && count < 1){
        card.visiblity = true; 
       let el =  document.getElementById(`activity${card.id}`);
       el.style.visibility = 'visible';
        count++;
    }
  });
 
}


duckBtn.addEventListener("click", duckButton);

addNewActivity.addEventListener("click", addActivity);

getAllActivity();
