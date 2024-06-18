import {$authHost, $host} from "./index";

export const createAcceptance = async (taskAcceptance) => {
    const {data} = await $authHost.post('api/acceptance', taskAcceptance)
    return data
}

export const fetchOneAcceptance = async (id) => {
    const {data} = await $authHost.get('api/acceptance/' + id)
    return data
}

export const acceptExecutorWork = async (taskId) => {
    const {data} = await $authHost.patch('api/acceptance/accept/' + taskId)
    return data
}

export const search = async (taskId, executorId) => {
    const {data} = await $authHost.get(`api/acceptance/search?taskId=${taskId}&executorId=${executorId}`)
    return data
}

export const fetchTaskAcceptancesByTaskOwner = async (ownerId) => {
    const {data} = await $authHost.get(`api/acceptance/searchall?ownerId=${ownerId}`)
    return data
}
