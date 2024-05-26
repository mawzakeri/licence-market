
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export function checkingIsNotEmptyArray(array){
    if(array && Array.isArray(array) && array.length !== 0)
        return true
}

export function runToast(data: {msg: string , type: any}){
    toast(data.msg , {
        "theme": "colored",
        "type": data.type,
        "transition": "slide",
        "dangerouslyHTMLString": true
    })

}

export function storageHandler(key: string , value: string)
{
    localStorage.setItem(key, value)
}

export function getToken(){
    return localStorage.getItem('token')
}

export function logoutUserHandler(){
    localStorage.removeItem('token');
    window.location.replace('/')
}

export const e2p = (s: string) => {
    if(s && typeof s == 'string')
        return s?.replace(/\d/g, (d: any) => '۰۱۲۳۴۵۶۷۸۹'[d])
    else if(typeof s == 'number'){
        const text = `${s}`
        if(text && typeof text == 'string')
            return text?.replace(/\d/g, (d: any) => '۰۱۲۳۴۵۶۷۸۹'[d])
    }
}

export function stringFromObj(obj){
    return JSON.stringify(obj);
}

export function convertDate(date: string)
{
    if(date){
        const StringDateConverted = date.split("T"); //2013-02-03
        if(StringDateConverted[0]){
            const mainDate = StringDateConverted[0].split("-"); // 2013 , 02 , 03
            if(mainDate[1] && mainDate[2] && mainDate[0]){
                const dateLocal = new Date(`${mainDate[1]}/${mainDate[2]}/${mainDate[0]}`);
                if(dateLocal)
                    return dateLocal.toLocaleDateString('fa-IR')
                return ''
            }
        }
    }
}

export function convertTime(date: string)
{
    if(date){
        const StringDateConverted = date.split("T"); //2013-02-03
        if(StringDateConverted[1]){
            const mainDate = StringDateConverted[1].split(":"); // 2013 , 02 , 03
            if(mainDate[0] && mainDate[1]){
                const time = `${mainDate[0]}:${mainDate[1]}`;
                const finallyTime = e2p(time)
                if(finallyTime)
                    return finallyTime
                else
                    return ''
            }
        }
    }
}