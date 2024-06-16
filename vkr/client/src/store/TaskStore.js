import {makeAutoObservable} from "mobx";

export default class TaskStore {
    constructor() {
        this._types = []
        this._tasks = []
        this._taskStatus = []
        this._selectedType = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 9
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setTasks(tasks) {
        this._tasks = tasks
    }
    setTaskStatuses(taskStatus){
        this._taskStatus = taskStatus
    }

    setSelectedType(type) {
        this._selectedType = type
        this.setPage(1)
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }
    get tasks() {
        return this._tasks
    }
    get taskStatus(){
        return this._taskStatus
    }

    get selectedType() {
        return this._selectedType
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}
