import {makeAutoObservable} from "mobx";

export default class ResponseStore {
    constructor() {
        this._responses = []
        makeAutoObservable(this)
    }

    setResponses(responses) {
        this._responses = responses
        console.log(responses)
    }

    get responses() {
        return this._responses
    }
}
