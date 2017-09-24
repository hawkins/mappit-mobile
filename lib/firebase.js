import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC77AJS7iHycOS1noZIe4LQGz3IqAzIq3M",
  authDomain: "mappit-4b1f0.firebaseapp.com",
  databaseURL: "https://mappit-4b1f0.firebaseio.com",
  projectId: "mappit-4b1f0",
  storageBucket: "mappit-4b1f0.appspot.com",
  messagingSenderId: "621290027934"
};

/**
 * List of Constants
 */

// General Firebase Const
const db = firebase.database();

// Users Firebase Const
const user = firebase.auth().currentUser;

firebase.initializeApp(firebaseConfig);

/**
 * List of Constants
 */

// General Firebase Const
const db = firebase.database();

// Ref Firebase Const;
const topologysRef = db.ref("/topologys/");

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
 * Set a Topologies
 * 
 * @owner {user_id} 23423-asdf23-sad223-dasdsa 
 * @description {string} 'Hello Betty'
 * @name {string} 'Hackathons'
 * @returns 
 */
async function setTopology(name, description) {

  const user_id = firebase.auth().currentUser.uid;
  const subscribers = {};

  subscribers[user_id] = user_id;

  const params = {
    name: name,
    description: description,
    owner: user_id,
    posts: {},
    subscribers: subscribers,
  }
  return db.ref(`/topologys/${name}`).set(name, description, owner);
};

// Returns a list of all Topologys
async function getTopologys() {
  const snapshot = await db
    .ref(`/topologys`)
    .once("value");

  const val = snapshot.val();
  return Object.keys(val);
}

// Get the data of a topology given its name
async function getTopology(name) {
  const snapshot = await db
    .ref(`/topologys/${name}`)
    .once("value");

  return snapshot.val();
}

// Return a list of all post based on Topology
async function getPosts() {
  const snapshot = await db
  .ref(`/topologys/${name}/posts`)
  .once("Value")

  const val = snapshot.val();
  return Object.keys(val);
}

// Get the data of a post given its id
async function getPost(name, id) {
  const snapshot = await db
    .ref(`/topologys/${name}/posts/${id}`)
    .once("Value")

  return snapshot.val();
}

export default {
  signInWithGoogle,
  onAuthStateChanged,
  signOut,
  getCurrentUser,
  getTopology,
  getTopologys,
  getPost,
  getPosts
};
