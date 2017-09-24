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

export default {
  signInWithGoogle,
  onAuthStateChanged,
  signOut,
  getCurrentUser
};
