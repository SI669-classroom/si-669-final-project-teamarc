

import { initializeApp } from 'firebase/app';
import { setDoc, addDoc, query, where, doc, getFirestore, getDocs, orderBy, collection, onSnapshot, querySnapshot, limit, getDoc, deleteDoc } from 'firebase/firestore';

import { firebaseConfig } from '../Secrets';
import { ADD_USER, LOAD_USERS, SET_CURRENT_CHAT, SIGN_OUT, ADD_GAME, LOAD_GAMES, UPDATE_GAME } from '../Reducer';
import { getAuthUser, signIn, signOut } from '../AuthManager';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let usersSnapshotUnsub = undefined;
let chatSnapshotUnsub = undefined;

let snapshotUnsubscribe = undefined;
const subscribeToUserUpdates = () => {
  if (snapshotUnsubscribe) {
    snapshotUnsubscribe();
  }
  return (dispatch) => {
    snapshotUnsubscribe = onSnapshot(collection(db, 'users'), usersSnapshot => {
      const updatedUsers = usersSnapshot.docs.map(uSnap => {
        // console.log(uSnap.data());
        return uSnap.data(); // already has key?
      });
      dispatch({
        type: LOAD_USERS,
        payload: {
          users: updatedUsers
        }
      });
    });
  }
}
// This is mine
const subToGames = () => {
  if (snapshotUnsubscribe) {
    snapshotUnsubscribe();
  }
  const q = query(collection(db,'games'),where('players','array-contains',`${getAuthUser().uid}`));
  return (dispatch) => {
  snapshotUnsubscribe = onSnapshot(q, gamesSnapshot => {
    const updatedGames = gamesSnapshot.docs.map(gSnap => {
      let x = gSnap.data();
      x.key = gSnap.id;
      return x;
    });
    dispatch({
      type: LOAD_GAMES,
      payload: {
        newGames: updatedGames
      }
    });
  })
}
}








// Called in PlaysScreen   Syr6l9enGBZt3uoRG1JokS6jwqO2
const gettingGame = async (type, user) => {
  // let q = query(collection(db,'games'),where('players','not-in',['Syr6l9enGBZt3uoRG1JokS6jwqO2','free']),where('players','array-contains','free'),where('type','==',`${type}`))
  let q = query(collection(db,'games'),where('players','!=',[`${user}`,'free']),where('players','array-contains','free'),where('type','==',`${type}`));
  let n = await getDocs(q,limit(1));
  if (n.docs.length < 1 ) {
    // No matches found
    return 0
  }
  // ToDo --- Need to setDoc to contain current player so no one else can join
  let m = n.docs[0]
  // console.log(m.data())
  let newPlayers = [...m.data().players];
  newPlayers[1]=user;
  nGame = {...m.data(), players:newPlayers, key:m.id}
  // console.log(nGame)
  return nGame
}
const unsubscribeFromUsers = () => {
  if (usersSnapshotUnsub) {
    usersSnapshotUnsub();
    usersSnapshotUnsub = undefined;
  }
}
const loadItems = () => {
  return async (dispatch) => {
    let querySnapshot = await getDocs(collection(db, 'todos'));
    let newListItems = querySnapshot.docs.map(docSnap => {
      return {
        ...docSnap.data(),
        key: docSnap.id
      }
    })
    dispatch({
      type: LOAD_ITEMS,
      payload: {
        newListItems: newListItems
      }
    });
  }
}
// Called on HomePage to Load the Users Game
const loadGames = (myUser) => {
  return async (dispatch) => {
    let q = query(collection(db, 'games'), where('players', 'array-contains', `${myUser}`));
    
    let querySnapshot = await getDocs(q)
    // console.log((querySnapshot.docs).length)
    let newGamesList = querySnapshot.docs.map(docSnap => {
      return {
        ...docSnap.data(),
        key: docSnap.id
      }
    })
    dispatch({
      type: LOAD_GAMES,
      payload: {
        newGames: newGamesList
      }
    });
  }
}
const  loadUserIcon = async (key) => {
  // console.log(key)
  if (key==='forfeit') {
    return {avatar:[0,0,0,0]}
  }
  let m = await getDoc(doc(db, 'users', key))
  // console.log(m.data())
  return m.data()
}
const updateUserIcon = (user) => {
  // console.log('action',user)
  setDoc(doc(db,'users',user.key),user)
}

const addGame = (game) => {
  return async (dispatch) => {
    const newGame = await addDoc(collection(db, 'games'), game);
    const gameKey = newGame.id
    // dispatch({
    //   type: ADD_GAME,
    //   payload: {
    //     newGame: {...game, key:gameKey}
    //   }
    // });
  }
}
const updateGame = (game) => {
  return async (dispatch) => {
    setDoc(doc(db, 'games', game.key), game)
    dispatch({
      type: UPDATE_GAME,
      payload: {
        newGame: game
      }
    });    
  }
}
const deleteGame = (key) => {
  return async (dispatch) => {
    deleteDoc(doc(db, 'games', key))
  }
}
// const joinGame = (game) => {
//   return async (dispatch) => {
//   await setDoc(doc(db, 'games', game.key), game)

//   // dispatch({
//   //   type: ADD_GAME,
//   //   payload: {
//   //     newGame: game
//   //   }
//   // });
//   // Think I don't need this because it is already being loaded.
//   }
// }
const joinGame = (game) => {
 setDoc(doc(db, 'games', game.key), game)
}
const addCurrentChatMessage = (message) => {
  return async (dispatch, getState) => {
    const currentChat = getState().currentChat;
    const messageCollection = collection(db, 'chats', currentChat.id, 'messages');
    await addDoc(messageCollection, message); // no need to dispatch because they are already being listened to
  }
}
const addOrSelectChat = (user1id, user2id) => {
  return async (dispatch) => {
    const chatQuery = query(collection(db, 'chats'),
      where('participants', 'array-contains', user1id),
    );
    const results = await getDocs(chatQuery);
    chatSnap = results.docs?.find(elem=>elem.data().participants.includes(user2id));
    let theChat;
    if (!chatSnap) {
      theChat = {
        participants: [user1id, user2id],
      }
      const chatRef = await addDoc(collection(db, 'chats'), theChat);
      theChat.id = chatRef.id
    } else {
      theChat = {
        ...chatSnap.data(),
        id: chatSnap.id
      }
    }
  
    dispatch({
      type: SET_CURRENT_CHAT,
      payload: {
        currentChat: theChat
      }
    }); // initial dispatch to add currentChat to reducer

    if (chatSnapshotUnsub) {
      chatSnapshotUnsub();
      chatSnapshotUnsub = undefined;
    }
    const q = query(
      collection(db, 'chats', theChat.id, 'messages'),
      orderBy('timestamp', 'asc')
    );
    chatSnapshotUnsub = onSnapshot(
      q, 
      (messagesSnapshot) => {
        const messages = messagesSnapshot.docs.map(msgSnap => {
          const message = msgSnap.data();
          return {
            ...message,
            timestamp: message.timestamp.seconds,
            id: msgSnap.id
          }
        }); // grab the messages from the snapshot, then dispatch to reducer
        dispatch({
          type: SET_CURRENT_CHAT,
          payload: {
            currentChat: {
              ...theChat,
              messages: messages
            }
          }
        })
      }
    );
  }
}
// const addOrSelectChat = (user1id, user2id) => {
 
//   return async (dispatch) => {
    
//     const chatQuery = query(collection(db, 'chats'),
//       where('participants', 'array-contains', user1id),
//     );
//     const results = await getDocs(chatQuery);
//     /*
//       Since we want to find a chat that has user1 and user2
//       as "participants", ideally we would do this in a single 
//       query like this (note that by default multiple where
//       clauses are ANDed together):

//       const chatQuery = query(
//         collection(db, 'chats'),
//         where('participants', 'array-contains', user1id),
//         where('participants', 'array-contains', user2id)
//       );

//       but Firestore doesn't allow more than one 'array-contains'
//       where clause in a single query. 

//       So instead we do the 
//       second 'array-contains' clause "manually" by getting all of 
//       user1's chats and then using Array.find() to look for one 
//       that also contains user2 as a participant.
//     */
//     chatSnap = results.docs?.find(
//         elem=>elem.data().participants.includes(user2id));

//     let theChat;

//     if (!chatSnap) { // we DIDN'T find a match, create a new chat
//       theChat = {
//         participants: [user1id, user2id],
//       }
//       const chatRef = await addDoc(collection(db, 'chats'), theChat);
//       theChat.id = chatRef.id
//       console.log('created a new chat:', theChat);
//     } else { // we DID find a match, so let's use it.
//       theChat = {
//         ...chatSnap.data(),
//         id: chatSnap.id
//       }
//       console.log('found a matching chat:', theChat);
//     }
//   }
// }

const unsubscribeFromChat = () => {
  if (chatSnapshotUnsub) {
    chatSnapshotUnsub();
    chatSnapshotUnsub = undefined;
  }
}
const addUser = (user) => {
  return async (dispatch) => {
    userToAdd = {
      displayName: user.displayName,
      email: user.email,
      key: user.uid, 
      avatar: [0,0,0,'yellow'], 
      points: 0
    };
    await setDoc(doc(db, 'users', user.uid), userToAdd);
    // dispatch({
    //   type: ADD_USER,
    //   payload: {
    //     user: {...userToAdd}
    //   }
    // });
  }
}

export { addUser, addOrSelectChat, subscribeToUserUpdates, addCurrentChatMessage, unsubscribeFromUsers, unsubscribeFromChat, addGame, loadGames, gettingGame, joinGame, updateGame, subToGames, loadUserIcon, updateUserIcon, deleteGame }