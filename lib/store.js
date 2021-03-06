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

  @observable comments = [];

  // I should be homeless
  @observable screen = "home";

  constructor() {
    this.loadTopologys();
  }

  async loadTopologys(name) {
    console.log("Loading topologys");
    this.topologys = await firebase.getTopologys();

    if (this.user) this.myTopologys = await firebase.getMyTopologys();

    if (this.user && name == "Home") this.loadSubTopologys("Home");
  }

  async loadSubTopologys() {
    console.log("Loading subbed topology post");

    // Get all the topologies
    const subTops = this.myTopologys;
    let homeTopology = { posts: [] };

    for (i = 0; i < subTops.length; i++) {
      let tempTop = await firebase.getTopology(subTops[i].key);
      if (tempTop) {
        if (tempTop.posts != null) {
          tempTop.posts = Object.keys(tempTop.posts).map(
            key => tempTop.posts[key]
          );
        } else {
          tempTop.posts = [];
        }

        tempTop.posts.map(p => homeTopology.posts.push(p));
      }
    }
    // Clean up Home Topology
    homeTopology["key"] = "Home";
    homeTopology["date"] = null;
    homeTopology["description"] = null;
    homeTopology["owner"] = null;
    homeTopology["ownerName"] = null;
    homeTopology["ownerPic"] = null;

    this.currentTopology = homeTopology;
  }

  @action
  async loadTopology(name) {
    console.log(`Loading topology ${name}`);

    let newTopology = null;

    // TODO: Get the actual front page
    if (name === "Home") this.currentTopology = newTopology;
    else if (this.user && name === "Home") loadSubTopologys("Home");
    else newTopology = await firebase.getTopology(name);

    // Convert posts to an array
    if (newTopology) {
      if (newTopology.posts != null) {
        newTopology.posts = Object.keys(newTopology.posts).map(key => {
          let temp = newTopology.posts[key];
          temp.key = key;
          return temp;
        });
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

    this.loadTopologys("Home");
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

  @action
  async loadComments(post) {
    this.comments = [];
    this.comments = await firebase.loadComments(
      this.currentTopology.key,
      post.key
    );
    console.log(this.comments);
    this.screen = "comment";
  }
}
