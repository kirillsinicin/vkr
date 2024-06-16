import { makeAutoObservable } from "mobx";

export default class ProfileStore {
    constructor() {
        this._profile = {
            contacts: []
        }

        makeAutoObservable(this)
    }

    setProfile(profile) {
        this._profile = profile
    }

    get profile() {
        return this._profile
    }
}  
