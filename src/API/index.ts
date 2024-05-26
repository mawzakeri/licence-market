import jwtInterceptor from "@/shared/jwtInterceptor";

const apiUrl = import.meta.env.VITE_MAIN_API + import.meta.env.VITE_API_PATH;

interface getOrdersInterface {
    page: string;
    limit: string;
    orderBy: {key: string , value: string}[];
    filter: {key: string , value: string}[];
    search: {key: string , value: string}
}

function sendResponse(response){
    if (response && response.data)
    {
        return response.data
    }
}

export async function loginOperators(data: {password: string , email: string}){
    const url = apiUrl + `/operator/login`;
    const response = await jwtInterceptor.post(url, data);
    return sendResponse(response)
}

function stringFromObj(obj){
    return JSON.stringify(obj);
}

function queryArrayHandler(items , name){
    let PARAMS = ``;
    if(items && name){
        items?.forEach((item: {key: string} , i) => {
            const KEY = Object.keys(item);
            console.log(KEY , 'iet' , item[KEY])
            if(KEY && item[KEY])
                PARAMS += `${i === 0 ? '&' : ''}${name}=${stringFromObj({[KEY]: 'asc'})}${i !== (items.length - 1) ? '&' : ''}`
                // its generate => variable = `{x: 'y'}&{z: 'd'}`
        })
        return PARAMS
    }
    else
        return ''

    console.log(PARAMS)
}

export async function getOrders(arg: getOrdersInterface) {

    const PAGE = arg.page ? `?page=${arg.page}&` : '';
    const LIMIT = arg.limit ? `limit=${arg.limit}` : '';
    const ORDER_BY = queryArrayHandler(arg.orderBy , 'orderBy');
    console.log(ORDER_BY , 'ORDER_BY')
    const FILTER = queryArrayHandler(arg.filter , 'filter');
    const SEARCH = arg.search ? `&search=${stringFromObj([arg.search])}` : '';

    const url = apiUrl + `/order/page${PAGE}${LIMIT}${ORDER_BY}${FILTER}${SEARCH}`;
    const response = await jwtInterceptor.get(url);
    return sendResponse(response)
}

export async function getOperators() {
    const url = apiUrl + `/operator`;
    const response = await jwtInterceptor.get(url);
    return sendResponse(response)
}

export async function getLabels() {
    const url = apiUrl + `/label`;
    const response = await jwtInterceptor.get(url);
    return sendResponse(response)
}

export default {
    getOrders
}