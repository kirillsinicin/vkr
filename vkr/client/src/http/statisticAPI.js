import {$authHost} from "./index";

export const fetchTaskByStatus = async () => {
    const {data} = await $authHost.get(`api/statistics/tasksbystatus`)
    return data
}

export const fetchTaskByType = async () => {
    const {data} = await $authHost.get(`api/statistics/tasksbytype`)
    return data
}

