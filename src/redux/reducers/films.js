import { GET_CHARACTERS, GET_FILMS, ERROR_CHARACTER, ERROR_FILMS } from "../actionTypes";

const initialState = {
  data: [],
  filmsData: [],
  error:null,
  filmsError:null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CHARACTERS: {
      return {
        ...state,
        data: action.payload
      };
    }
    case GET_FILMS: {
      return {
        ...state,
        filmsData: action.payload
      };
    }
    case ERROR_CHARACTER: {
      return {
        ...state,
        error: action.payload
      };
    }
    case ERROR_FILMS: {
      return {
        ...state,
        filmsError: action.payload
      };
    }
    default:
      return state;
  }
}
