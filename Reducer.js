const ADD_CONTACT = 'ADD_CONTACT';

const initialState = {
    // groups: initGroups,
    // listContacts: initContacts,
  }

const addContact = (state, contact, contactKey) => {

    let { listContacts } = state;
    let newListContacts = listContacts.concat({
      ...contact,
      key: contactKey,
    });
    // console.log(newListItems)
    return {
      ...state,
      listContacts: newListContacts
  
    };
  }

function rootReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_CONTACT:
        return addContact(state, action.payload.contact, action.payload.key);
      default:
        return state;
    }
  }
  
  export { rootReducer, ADD_CONTACT};
  