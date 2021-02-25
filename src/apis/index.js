import axios from "axios";

export function getImages(params) {
  return axios({
    url: `https://api.unsplash.com/photos/`,
    method: "get",
    headers: {
      Authorization: "Client-ID xuZz3lcpmAw0_ZvZJ2f612JxfrYnnL2pQN6hdjEMboE",
    },
    params,
  });
}

export function searchImages(params) {
  return axios({
    url: `https://api.unsplash.com/search/photos/`,
    method: "get",
    headers: {
      Authorization: "Client-ID xuZz3lcpmAw0_ZvZJ2f612JxfrYnnL2pQN6hdjEMboE",
    },
    params,
  });
}