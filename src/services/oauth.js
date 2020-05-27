import Axios from "axios";
import jwtDecode from "jwt-decode";
import qs from "qs";
import { API_BASE } from "../config";

export const OAuth = new (class {
  constructor() {
    this.axios = Axios.create({
      baseURL: `${API_BASE}oauth`,
      headers: {
        Authorization:
          "Basic cG9ydGlmb2xpby1jb3JvbmE6RUw0Y0JyVlNZQ1o1d01BR01oblRnVWRtWms5RkFoTWs=",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    this.cache = {};
  }

  get accessToken() {
    if (this.cache.accessToken === undefined) {
      this.cache.accessToken = localStorage.getItem("access_token");
    }

    return this.cache.accessToken;
  }

  set accessToken(value) {
    if (value === undefined) return localStorage.removeItem("access_token");
    this.cache.accessToken = localStorage["access_token"] = value;
  }

  get refreshToken() {
    if (this.cache.refreshToken === undefined) {
      this.cache.refreshToken = localStorage.getItem("access_token");
    }

    return this.cache.refreshToken;
  }

  set refreshToken(value) {
    if (value === undefined) return localStorage.removeItem("refresh_token");
    this.cache.refreshToken = localStorage["refresh_token"] = value;
  }

  get tokenPayload() {
    if (this.cache.payload === undefined) {
      this.cache.payload = this.accessToken && jwtDecode(this.accessToken);
    }

    return this.cache.payload;
  }

  get isLogged() {
    return !!this.tokenPayload;
  }

  get accessTokenExpired() {
    const payload = this.tokenPayload;
    if (payload) {
      return Date.now() + 3000 > payload.exp * 1000;
    }
    return true;
  }

  async requestToken({ grantType, username, password }) {
    return this.axios
      .post(
        "token",
        qs.stringify({
          grant_type: grantType,
          username: grantType === "password" ? username : undefined,
          password: grantType === "password" ? password : undefined,
          refresh_token:
            grantType === "refresh_token" ? this.refreshToken : undefined,
        })
      )
      .then((res) => {
        this.cache.payload = undefined;
        this.accessToken = res.data.access_token;
        this.refreshToken = res.data.refresh_token;
        // store.dispatch('setAuth', { user: this.tokenPayload.user })
      });
  }

  async login(username, password) {
    await this.requestToken({
      grantType: "password",
      username,
      password,
    });
  }

  async getValidAccessToken() {
    if (this.accessTokenExpired)
      await this.requestToken({ grantType: "refresh_token" });
    return this.accessToken;
  }

  async logout() {
    this.accessToken = undefined;
    this.cache = {};
  }
})();
