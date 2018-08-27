import axios from 'axios';

const baseURL = "https://agile-gallery.herokuapp.com/api/v1/gallery";

const post = (data, onComplete, onError) => {
  const url = baseURL + "/create/";

  axios.post(url, {
    ...data
  })
    .then(onComplete? onComplete : (response) => console.log(response))
    .catch(onError? onError : (error) => console.log(error));
};

const get = (id, onComplete, onError) => {
  const url = baseURL + "/user/" + id;

  axios.get(url)
    .then(onComplete? onComplete : (response) => console.log(response))
    .catch(onError? onError : (error) => console.log(error));
};

const User = {
  post,
  get
};

export default User;