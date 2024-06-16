import {$authHost} from "./index";

export const fetchResponseByTaskId = async (taskId) => {
    const {data} = await $authHost.get(`api/response/?taskId=${taskId}`)
    return data
}

export const fetchResponseByFilter = async (taskId, userId) => {
    const {data} = await $authHost.get(`api/response/?taskId=${taskId}&userId=${userId}`)
    return data
}

export const createResponse = async (response) => {
    const {data} = await $authHost.post('api/response/', response)
    return data
}