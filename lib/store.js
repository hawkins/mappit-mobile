import { observable, action } from "mobx";
import firebase from "./firebase";

export default class Store {
  @observable user = null;
  @observable topologys = [];

  constructor() {
    this.loadTopologys();
  }

  async loadTopologys() {
    this.topologys = await firebase.getTopologys();
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
