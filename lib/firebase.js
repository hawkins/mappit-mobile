import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC77AJS7iHycOS1noZIe4LQGz3IqAzIq3M",
  authDomain: "mappit-4b1f0.firebaseapp.com",
  databaseURL: "https://mappit-4b1f0.firebaseio.com",
  projectId: "mappit-4b1f0",
  storageBucket: "mappit-4b1f0.appspot.com",
  messagingSenderId: "621290027934"
};

firebase.initializeApp(firebaseConfig);

// Users Firebase Const
const user = firebase.auth().currentUser;

async function signInWithGoogle() {
  try {
    const result = await Expo.Google.logInAsync({
      androidClientId:
        "84211329710-d2h0psdatj8b03fehcamolqndvcirp9o.apps.googleusercontent.com",
      iosClientId:
        "84211329710-1rj6t8i658k755agph8hh58l0pdnuoul.apps.googleusercontent.com",
      scopes: ["profile", "email"]
    });

    if (result.type === "success") {
      // Build Firebase credential with the Google access token
      const credential = firebase.auth.GoogleAuthProvider.credential(
        result.idToken,
        result.accessToken
      );

      // Authenticate Firebase
      firebase
        .auth()
        .signInWithCredential(credential)
        .catch(error => {
          console.error(error);
        });

      return { success: true };
    } else {
      console.log("User canceled login");
      return { canceled: true };
    }
  } catch (e) {
    console.log("WE FUKT UP");
    console.error(e);
    return { error: true };
  }
}

async function signOut() {
  console.log("Logging out...");

  try {
    await firebase.auth().signOut();

    console.log("Logged out.");

    return { success: true };
  } catch (e) {
    console.error(e.toString());
    return { error: true };
  }
}

function onAuthStateChanged(func) {
  firebase.auth().onAuthStateChanged(func);
}

function getCurrentUser() {
  return firebase.auth().currentUser;
}

/**
 * Set a Topology
 *
 * @owner {user_id} 23423-asdf23-sad223-dasdsa
 * @description {string} 'Hello Betty'
 * @name {string} 'Hackathons'
 * @returns
 */
async function setTopology(name, description) {
  const user_id = firebase.auth().currentUser.uid;
  const subscribers = {};

  subscribers[user_id] = true;

  const params = {
    description: description,
    owner: user_id,
    posts: {},
    subscribers: subscribers,
    posts: {},
    ownerName: firebase.auth().currentUser.displayName,
    ownerPic: firebase.auth().currentUser.photoURL,
    date: Date.now()
  };

  return firebase
    .database()
    .ref(`/topologys/${name}`)
    .set(params);
}

// Returns a list of all Topologys
async function getTopologys() {
  const snapshot = await firebase
    .database()
    .ref(`/topologys`)
    .once("value");
  const keys = Object.keys(snapshot.val());

  return await Promise.all(
    keys.map(async key => {
      return await getTopology(key);
    })
  );
}

// Get the user's subscribed Topographies
async function getMyTopologys() {
  const user_id = firebase.auth().currentUser.uid;
  const snapshot = await firebase
    .database()
    .ref(`/topologys`)
    .once("value");
  const keys = Object.keys(snapshot.val());

  const topologys = await Promise.all(
    keys.map(async key => {
      return await getTopology(key);
    })
  );

  // Filter by subscription
  return topologys.filter(t => {
    if (!t.subscribers) return false;
    return t.subscribers[user_id] !== "false";
  });
}

// Get the data of a topology given its key
async function getTopology(key) {
  const snapshot = await firebase
    .database()
    .ref(`/topologys/${key}`)
    .once("value");

  return Object.assign({}, snapshot.val(), { key });
}

// Return a list of all post based on Topology
async function getPosts(name) {
  const snapshot = await firebase
    .database()
    .ref(`/topologys/${name}/posts`)
    .once("Value");

  const val = snapshot.val();
  return val.map(key => {
    const temp = val[key];
    temp.key = key;
    return temp;
  });
}

// Get the data of a post given its id
async function getPost(name, id) {
  const snapshot = await firebase
    .database()
    .ref(`/topologys/${name}/posts/${id}`)
    .once("Value");

  return snapshot.val();
}

// Set a Post
async function setPost(name, title, content, lat, lon, type) {
  const params = {
    title: title,
    content: content,
    mapData: {
      lat: lat,
      lon: lon,
      type: type
    },
    comments: {},
    date: Date.now(),
    picUrl: firebase.auth().currentUser.photoURL,
    uid: firebase.auth().currentUser.uid,
    user: firebase.auth().currentUser.displayName
  };

  return await firebase
    .database()
    .ref(`/topologys/${name}/posts`)
    .push(params);
}

async function subscribe(name) {
  const user_id = firebase.auth().currentUser.uid;
  return await firebase
    .database()
    .ref(`/topologys/${name}/subscribers/${user_id}`)
    .set("true");
}

async function unsubscribe(name) {
  const user_id = firebase.auth().currentUser.uid;
  return await firebase
    .database()
    .ref(`/topologys/${name}/subscribers/${user_id}`)
    .set("false");
}

async function loadComments(topography, post) {
  const snapshot = await firebase
    .database()
    .ref(`/topologys/${topography}/posts/${post}`)
    .once("value");

  const val = snapshot.val();

  return Object.keys(val.comments).map(key => val.comments[key]);
}

export default {
  signInWithGoogle,
  onAuthStateChanged,
  signOut,
  getCurrentUser,
  getTopology,
  getTopologys,
  getMyTopologys,
  setTopology,
  getPost,
  getPosts,
  setPost,
  subscribe,
  unsubscribe,
  loadComments
};
