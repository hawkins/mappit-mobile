import { observable, action } from "mobx";
import firebase from "./firebase";

export default class Store {
  @observable user = null;
  @observable topologys = [];
  @observable myTopologys = [];
  @observable currentTopology = null;
  @observable subscribed = false;

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

    if (this.user) this.myTopologys = await firebase.getMyTopologys();
  }

  @action
  async loadTopology(name) {
    console.log(`Loading topology ${name}`);

    let newTopology = null;

    // TODO: Get the actual front page
    if (name === "Home") this.currentTopology = newTopology;
    else newTopology = await firebase.getTopology(name);

    // Convert posts to an array
    if (newTopology) {
      if (newTopology.posts != null) {
        newTopology.posts = Object.keys(newTopology.posts).map(
          key => newTopology.posts[key]
        );
      } else {
        newTopology.posts = [];
      }

      if (this.user && newTopology.subscribers[this.user.uid])
        this.subscribed = newTopology.subscribers[this.user.uid] !== "false";
    }

    console.log("subscribed", this.subscribed);

    // Assign the new top
    this.currentTopology = newTopology;
  }

  @action
  async login() {
    console.log("Logging in...");
    let result = await firebase.signInWithGoogle();

    console.log("Logged in!");
    this.user = firebase.getCurrentUser();

    this.loadTopologys();
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

    if (!this.newTopologyName || !this.newTopologyDescription) return;

    await firebase.setTopology(
      this.newTopologyName,
      this.newTopologyDescription
    );

    this.newTopologyName = "";
    this.newTopologyDescription = "";

    this.loadTopology(this.newTopologyName);
    this.loadTopologys();
  }

  @action
  async subscribeToCurrentTopology() {
    console.log("Subscribing");
    await firebase.subscribe(this.currentTopology.key);
    await this.loadTopologys();
    this.subscribed = true;
  }

  @action
  async unsubscribeToCurrentTopology() {
    console.log("Unsubscribing");
    await firebase.unsubscribe(this.currentTopology.key);
    await this.loadTopologys();
    this.subscribed = false;
  }
}
