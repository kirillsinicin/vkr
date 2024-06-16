import {$authHost} from "./index";

export const fetchOneProfile = async (id) => {
    const {data} = await $authHost.get('api/profile/' + id)
    return data
}

export const updateProfile = async (id, profile) => {
    const {data} = await $authHost.patch('api/profile/' + id, profile)
    return data
}
