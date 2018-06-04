import { createStore as reduxCreateStore } from "redux";
import _ from "lodash";

const reducer = (state, action) => {
  if (action.type === `INCREMENT`) {
    return Object.assign({}, state, {
      count: state.count + 1
    });
  }

  if (action.type === `TOGGLE_PLAY`) {
    return Object.assign({}, state, {
      AudioPlaying: !state.AudioPlaying
    });
  }

  if (action.type === `SET_AUDIO`) {
    return Object.assign({}, state, {
      AudioPlayerFile: action.file,
      AudioPlayerTitle: action.title,
      AudioPlayerImageURL: action.image,
      AudioPlayerPersonRank: action.rank
    });
  }



  return state;
};


const initialState = {
  count: 0,
  AudioPlayerFile: false,
  AudioPlaying: false ,
  AudioPlayerImageURL: '',
  AudioPlayerTitle: 'Test Track Title',
  AudioPlayerPersonRank: '',
};

// https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/Swing_Jazz_Drum.mp3
// 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3

const createStore = () =>
  reduxCreateStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
export default createStore;
