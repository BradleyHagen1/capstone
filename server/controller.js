let activity = require("./db.json");

let globalId = 7;

module.exports = {
  getActivity: (request, response) => {
    
    response.status(200).send(activity);
  },

  addActivity: (request, response) => {
    const { name, url } = request.body;

    let newActivity = {
      id: globalId,
      name: name,
      picture: url,
      vote: 0,
    };

    activity.push(newActivity);

    globalId++;

    response.status(200).send(activity);
  },

  deleteActivity: (request, response) => {
    const index = activity.findIndex((el) => el.id === +request.params.id);

    activity.splice(index, 1);

    response.status(200).send(activity);
  },

  updateActivity: (request, response) => {
    const index = activity.findIndex((el) => el.id === +request.params.id);

    const { type } = request.body;

    if (type === "upvote") {
      activity[index].votes++;
    } else if (type === "downvote") {
      activity[index].votes--;
    }

    response.status(200).send(activity);
  },
};
