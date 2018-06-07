import { createStore as reduxCreateStore } from "redux";
import _ from "lodash";

const reducer = (state, action) => {
  if (action.type === `INCREMENT`) {
    return Object.assign({}, state, {
      count: state.count + 1
    });
  }


  if (action.type === `PLAY_NEW_AUDIO`) {
    return Object.assign({}, state, {
      AudioPlaying: true,
      AudioPaused: false,
      AudioPlayerFile: action.file,
      AudioPlayerTitle: action.title,
      AudioPlayerImageURL: action.image,
      AudioPlayerPersonRank: action.rank
    });
  }

  if ( action.type === `PAUSE_AUDIO` ) {
    return Object.assign({}, state, {
      AudioPaused: true,
      AudioPlaying: false
    })
  }

  if ( action.type === `RESUME_AUDIO` ) {
    return Object.assign({}, state, {
      AudioPaused: false,
      AudioPlaying: true
    })
  }

  if ( action.type === `SET_ACTIVE_INDEX` ) {
    return Object.assign({}, state, {
      activeIndex: action.idx,
    })
  }

  return state;
};


const initialState = {
  count: 0,
  AudioPlayerFile: false,
  AudioPlaying: false,
  AudioPaused: false,
  AudioPlayerImageURL: '',
  AudioPlayerTitle: 'Test Track Title',
  AudioPlayerPersonRank: '',
  activeIndex: null,
};

// https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/Swing_Jazz_Drum.mp3
// 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3

const createStore = () =>
  reduxCreateStore(
    reducer,
    initialState,
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
export default createStore;
