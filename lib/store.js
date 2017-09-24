import { observable, action } from "mobx";
import firebase from "./firebase";

export default class Store {
  @observable user = null;
  @observable topologys = [];
  @observable currentTopology = null;

  @observable addingPin = false;
  @observable newPostCoordinate = null;
  @observable newPostTitle = "New Pin";
  @observable newPostContent = "Your new pin's description";

  @observable newTopologyName = "";
  @observable newTopologyDescription = "";

  // I should be homeless
  @observable screen = "home";

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
    if (newTopology)
      if (newTopology.posts != null) {
        newTopology.posts = Object.keys(newTopology.posts).map(
          key => newTopology.posts[key]
        );
      } else {
        newTopology.posts = [];
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

  @action
  async createPin() {
    console.log("Creating pin...");

    if (
      !this.currentTopology ||
      !this.newPostTitle ||
      !this.newPostContent ||
      !this.newPostCoordinate
    )
      return;

    await firebase.setPost(
      this.currentTopology.key,
      this.newPostTitle,
      this.newPostContent,
      this.newPostCoordinate.latitude,
      this.newPostCoordinate.longitude,
      "point"
    );

    this.newPostTitle = "";
    this.newPostContent = "";
    this.newPostCoordinate = null;

    this.loadTopology(this.currentTopology.key);
  }

  @action
  async createTopology() {
    console.log("Creating topology...");

    await firebase.setTopology(
      this.newTopologyName,
      this.newTopologyDescription
    );

    this.newTopologyName = "";
    this.newTopologyDescription = "";

    this.loadTopology(this.newTopologyName);
    this.loadTopologys();
  }
}
