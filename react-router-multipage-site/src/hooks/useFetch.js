import { useEffect, useState } from "react"

export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        const fetchData = async () => {
            setIsPending(true)
            try{
                const response = await fetch(url,{signal: controller.signal})
                if(!response.ok){
                    throw new Error(`${response.status} : ${response.statusText}`)
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
    },[url])
    return { data, isPending, error }
}