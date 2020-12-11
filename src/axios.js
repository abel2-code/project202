import axios from "axios";

const instance = axios.create({
  baseURL: "https://translation.googleapis.com/language/translate/v2",
});

export default instance;
