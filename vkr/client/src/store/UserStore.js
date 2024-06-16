import {makeAutoObservable} from "mobx";

const ADMIN_ROLE = "ADMIN"
const USER_ROLE = "USER"

export default class UserStore {
    constructor() {
        this._user = {}
        this._isAuth = false
        makeAutoObservable(this)
    }

    setUser(user) {
        this._user = user
    }
    setIsAuth(bool) {
        this._isAuth = bool
    }

    get user() {
        return this._user
    }
    get isAuth() {
        return this._isAuth
    }
    get isAdmin() {
        return this.user.role === ADMIN_ROLE
    }
}
