import {$authHost, $host} from "./index";

export const createReview= async (review) => {
    const {data} = await $authHost.post('api/review', review)
    return data
}