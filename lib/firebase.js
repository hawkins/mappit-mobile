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

// Ref Firebase Const;
const topologysRef = ref("/topologys/");
const postsRef = rootRef.child("/posts/");

firebase.initializeApp(firebaseConfig);

// Listen for authentication state to change.
firebase.auth().onAuthStateChanged(user => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});

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

      console.log("SUCCESSS!!!!");

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

// Returns a list of all Topologys
async function getTopologys() {
  return topologysRef;
}

async function getPinsNearby(location) {
  topologysRef.on();
}

export default { signInWithGoogle, getTopologys };
