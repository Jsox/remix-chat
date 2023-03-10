import { useHash } from "@mantine/hooks";
import { useState, useEffect } from "react";

type Param = string | string[] | null
type ReturnParams = (string | string[] | {
    hashObject: Record<string, string>;
    setHashParam: (params: Record<string, string>[]) => void;
} | null)[]

export default function useHashObject(param: Param = null): ReturnParams {
    const [hashObject, setHashObject] = useState<Record<string, string>>({})
    const [hash, setHash] = useHash();

    useEffect(() => {
        const object = hash.slice(1).split('&').reduce(function (res, item) {
            var parts = item.split('=');
            res[parts[0]] = parts[1];
            return res;
        }, {});
        setHashObject(object)
    }, [hash])

    const setHashParams = (params: Record<string, string>[]) => {
        let str = "", temp = {};

        for (let key in hashObject) {
            if (hashObject.hasOwnProperty(key) && key) {
                temp[`${key}`] = hashObject[key];
            }
        }

        for (let key in params) {
            if (params.hasOwnProperty(key) && key) {
                temp[`${key}`] = params[key];
            }
        }

        for (let key in temp) {
            if (temp.hasOwnProperty(key) && key && temp[key]) {
                str += `${key}=${temp[key]}&`;
            }
        }
        setHashObject(temp)

        str = str.slice(0, -1)
        
        setHash(str)
    }

    let returnVal: Param = null

    if (Array.isArray(param)) {
        returnVal = param.map(p => hashObject[p])
    }
    if (typeof param === 'string') {
        returnVal = hashObject[param]
    }
    return [
        {
            hashObject,
            setHashParams
        },
        returnVal
    ]

}