const reducer = (state = [], action = {}) => {
  switch (action.type) {
    case 'ADD_ITEM':
      console.log("ADD_ITEM");
      return state.concat([action.item[0], action.item[1]]);
    case 'RESET_SEARCH':
      console.log("RESET_SEARCH");
      return state = [];
    default:
      return state;
  }
};

export default reducer;

export const getOrderedItems = state => state.slice().sort();
export const getEpisodes = state => {
  console.log("get episode");
  let aux = 2;
  let i = 0, j = 1, inc = 2;
  let episodes = [];
  while (aux <= state.length) {
    if (state[i] === 'EPISODES') {
      let simpleObj = JSON.parse(state[j]);
      if (simpleObj.length === undefined) {
        episodes.push(simpleObj);
      }
      else {
        for (let i = 0; i < simpleObj.length; i++) {
          if (episodes.indexOf(simpleObj[i]) === -1) {
            episodes.push(simpleObj[i]);
          }
        }
      }
      console.log("simpleObj");
      console.log(simpleObj.length);
      console.log(simpleObj);
    }
    i += inc;
    j += inc;
    aux += inc;
  }
  console.log(episodes);
  return episodes;
};

export const getCharacters = state => {
  console.log("get characters")
  let aux = 2;
  let i = 0, j = 1, inc = 2;
  let characters = [];
  while (aux <= state.length) {
    if (state[i] === 'CHARACTERS') {
      let simpleObj = JSON.parse(state[j]);
      if (simpleObj.length === undefined) {
        characters.push(simpleObj);
      }
      else {
        for (let i = 0; i < simpleObj.length; i++) {
          characters.push(simpleObj[i]);
        }
      }
      console.log("simpleObj");
      console.log(simpleObj.length);
      console.log(simpleObj);
    }
    i += inc;
    j += inc;
    aux += inc;
  }
  console.log(characters);
  return characters;
};


export const addSearch = (item) => ({ type: 'ADD_ITEM', item });
export const resetSearch = (item) => ({ type: 'RESET_SEARCH' });

