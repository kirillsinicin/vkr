import {$authHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createTaskStatus = async (taskstatus) => {
    const {data} = await $authHost.post('api/taskstatus', taskstatus)
    return data
}

export const fetchTaskStatuses = async () => {
    const {data} = await $host.get('api/taskstatus')
    return data
}

export const createTask = async (task) => {
    const {data} = await $authHost.post('api/task', task)
    return data
}

export const deleteTask= async (taskId) => {
    const { data } = await $authHost.delete(`api/task/${taskId}`)
    return data
}

export const fetchTasks = async (typeId, page, limit= 5) => {
    const {data} = await $host.get('api/task', {
        params: {
            typeId, page, limit
        }
    })
    return data
}

export const fetchTasksWhereUserOwner = async ( page, limit= 5) => {
    const {data} = await $authHost.get('api/task/owner', {
        params: {
            page, limit
        }
    })
    return data
}

export const fetchTasksWhereUserExecutor= async ( page, limit= 5) => {
    const {data} = await $authHost.get('api/task/executor', {
        params: {
            page, limit
        }
    })
    return data
}

export const fetchOneTask = async (id) => {
    const {data} = await $host.get('api/task/' + id)
    return data
}

export const asignTaskExecutor = async (taskId, executor) => {
    const {data} = await $authHost.patch('api/task/' + taskId, executor)
    return data
}
