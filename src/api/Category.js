import axios from 'axios';

const baseURL = "http://agile-gallery.herokuapp.com/api/v1/gallery";

const getAll = (onComplete, onError) => {
  const url = baseURL + "/categories/";

  axios.get(url)
    .then(onComplete ? onComplete : (response) => console.log(response))
    .catch(onError ? onError : (error) => console.log(error));
};

const Category = {
  getAll
};

export default Category;