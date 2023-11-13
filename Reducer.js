
// constants for action types
const ADD_ITEM = 'ADD_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const CHANGE_COLOR = 'CHANGE_COLOR';
const SIGN_OUT = 'SIGN_OUT';

const changeColor = (state, newColor) => {
  console.log('Changed it to:', newColor)
  return {
    ...state, 
    myColor: newColor
  } 
}

const signOut = (state, newuser) => {
  console.log(newuser)
  return {
    ...state,
    myUser: newuser
  }
}

// CRUD operations that modify state
const addItem = (state, newText) => {
  let { listItems } = state;
  let newListItems = listItems.concat({
    text: newText,
    key: Date.now() + Math.random()
  });
  return {
    ...state, 
    listItems: newListItems
  };
}

const updateItem = (state, itemId, newText) => {
  let { listItems } = state;
  let newItem = {
    text: newText,
    key: itemId
  };
  let newListItems = listItems.map(elem=>elem.key===itemId?newItem:elem);
  return {
    ...state, 
    listItems: newListItems
  };
}

const deleteItem = (state, itemId) => {
  let { listItems } = state;
  let newListItems = listItems.filter(elem=>elem.key !== itemId);
  return {
    ...state, 
    listItems: newListItems
  }
}

// initialization--note that initialState is the default value of 'state' below 
const initListItems = [
  { text: 'Get costume', key: Date.now() },
  { text: 'Get candy', key: Date.now() + 1}
];

const initialState = {
  listItems: initListItems,
  myColor: 'Red'
}

// The Reducer function! Here it is!
function rootReducer(state=initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return addItem(state, action.payload.text);
    case UPDATE_ITEM:
      return updateItem(state, action.payload.key, action.payload.text);
    case DELETE_ITEM:
      return deleteItem(state, action.payload.key);
    case CHANGE_COLOR:
      return changeColor(state, action.payload.color);
    case SIGN_OUT:
      return signOut(state, action.payload.user);    
    default:
      return state;
  }
}

export { rootReducer, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, CHANGE_COLOR, SIGN_OUT };
