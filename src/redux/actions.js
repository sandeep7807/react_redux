import { GET_CHARACTERS, GET_FILMS, ERROR_CHARACTER, ERROR_FILMS } from "./actionTypes";
import { sendRequest, sendMultipleRequest } from "../services/sendRequest";

export const getCharacters = () => (dispatch) => {
  sendRequest('people/').then((data) => {
    dispatch({ type: GET_CHARACTERS, payload: data?.results ? data.results : [] });
  }).catch(err => {
    console.error("Error: ", err)
    dispatch({ type: ERROR_CHARACTER, payload: err });
  })
}
export const getFilms = (value) => (dispatch) => {
  if (value?.films) {
    sendMultipleRequest(value?.films).then((data) => {
      dispatch({ type: GET_FILMS, payload: data });
    }).catch(err => {
      console.error("Error: ", err);
      dispatch({ type: ERROR_FILMS, payload: err });
    })
  } else {
    dispatch({ type: GET_FILMS, payload: [] });
  }
}

