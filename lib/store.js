import { observable, action } from "mobx";
import firebase from "./firebase";

export default class Store {
  @observable user = null;
  @observable topologys = [];
  @observable currentTopology = null;

  constructor() {
    this.loadTopologys();
  }

  async loadTopologys() {
    console.log("Loading topologys");
    this.topologys = await firebase.getTopologys();
  }

  @action
  async loadTopology(name) {
    console.log(`Loading topology ${name}`);

    let newTopology = null;

    // TODO: Get the actual front page
    if (name === "Home") this.currentTopology = newTopology;
    else newTopology = await firebase.getTopology(name);

    // Convert posts to an array
    if (newTopology && newTopology.posts != null) {
      newTopology.posts = Object.keys(newTopology.posts).map(
        key => newTopology.posts[key]
      );
    }

    // Assign the new top
    this.currentTopology = newTopology;
    console.log(this.currentTopology);
  }

  @action
  async login() {
    console.log("Logging in...");
    let result = await firebase.signInWithGoogle();

    console.log("Logged in!");
    this.user = firebase.getCurrentUser();
  }

  @action
  async logout() {
    console.log("Logging out...");
    const result = await firebase.signOut();

    if (result.error) {
      console.warn("Failed to log out");
      return;
    }

    console.log("Logged out.");
    this.user = null;
  }
}
