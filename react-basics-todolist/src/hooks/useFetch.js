import { useEffect, useRef } from "react"
import { useState } from "react/cjs/react.development"

export const useFetch = (url,_options) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    const options = useRef(_options).current

    useEffect(() => {
        const controller = new AbortController()

        const fetchData = async () => {
            setIsPending(true)
            try{
                const response = await fetch(url,{signal: controller.signal})
                if(!response.ok){
                    throw new Error(`${response.status} ${response.statusText}`)
                }
                const json = await response.json()
                setIsPending(false)
                setData(json);
                setError(null)
            }catch(err){
                setIsPending(false)
                setError(`Something went wrong: ${err.message}`);
                console.log(err)
            }
        }

        fetchData()
        
        return () => {
            controller.abort()
        }
    },[url,options])
    return { data, isPending, error }
}