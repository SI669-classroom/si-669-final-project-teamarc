

import { initializeApp } from 'firebase/app';
import { setDoc, addDoc, query, where, doc, getFirestore, getDocs, orderBy, collection, onSnapshot } from 'firebase/firestore';

import { firebaseConfig } from '../Secrets';
import { ADD_USER, LOAD_USERS, SET_CURRENT_CHAT, SIGN_OUT } from '../Reducer';
import { signIn, signOut } from '../AuthManager';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let usersSnapshotUnsub = undefined;
let chatSnapshotUnsub = undefined;

const subscribeToUserUpdates = () => {
  if (usersSnapshotUnsub) {
    usersSnapshotUnsub();
  }
  return (dispatch) => {
    usersSnapshotUnsub =  onSnapshot(collection(db, 'users'), usersSnapshot => {
      const updatedUsers = usersSnapshot.docs.map(uSnap => {
        console.log(uSnap.data());
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

const unsubscribeFromUsers = () => {
  if (usersSnapshotUnsub) {
    usersSnapshotUnsub();
    usersSnapshotUnsub = undefined;
  }
}
const addCurrentChatMessage = (message) => {
  return async (dispatch, getState) => {
    const currentChat = getState().currentChat;
    const messageCollection = collection(db, 'chats', currentChat.id, 'messages');
    await addDoc(messageCollection, message); // no need to dispatch
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
      key: user.uid
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

export { addUser, addOrSelectChat, subscribeToUserUpdates, addCurrentChatMessage, unsubscribeFromUsers, unsubscribeFromChat, }