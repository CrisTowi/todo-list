// Libraries
import axios from "axios";

// Creates an axios instance with default base URL
const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api/",
});

// Set the headers as JSON by default
http.defaults.headers.post["Content-Type"] = "application/json";
// Enable the credentials sharing to ensure auth logic works
http.defaults.withCredentials = true;

export default http;
