const baseUrl = "http://localhost:5678";

const activityDisplay = document.querySelector("#activityDisplay");

const addNewActivity = document.querySelector("#addActivity");

const createActivityCard = (activity) => {
  const newActivityCard = document.createElement("section");
  newActivityCard.classList.add("activity-card");

  newActivityCard.innerHTML = `
        <img alt='activity picture' src= ${activity.picture}/>
        <p>${activity.name}</p>

        <section>
            <button onclick="updateActivity(${activity.id}, 'downvote')">Down</button>
            Popularity: ${activity.votes}
            <button onclick="updateActivity(${activity.id}, 'upvote')">Up</button>
        </section>

        <br>
        <br>

        <button onclick="deleteActivity(${activity.id})">Delete Me</button> 
        <br>
        <br>
    `;
  activityDisplay.appendChild(newActivityCard);
};

const activityDisplayAll = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    createActivityCard(arr[i]);
  }
};

const getAllActivity = () => {
  axios
    .get(`${baseUrl}/activity`)
    .then((response) => {
      console.log(response.data);
      activityDisplayAll(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteActivity = (id) => {
  axios
    .delete(`${baseUrl}/activity/${id}`)
    .then((response) => {
      console.log(response.data);
      activityDisplay.innerHTML = ``;
      activityDisplayAll(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
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
      console.log(response.data);
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
      console.log(response.data);
      activityDisplay.innerHTML = ``;
      activityDisplayAll(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

addNewActivity.addEventListener("click", addActivity);
getAllActivity();
