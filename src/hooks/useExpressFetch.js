import { useCallback, useState } from 'react'

const useExpressFetch = () => {
  const [fetchData, setFetchData] = useState([])
  const [isloading, setisloading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const getExpressDdata = useCallback(async (requestConfig) => {
    try {
      const res = await (fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : { 'Content-Type': 'application/json' },
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
      }))
      if (!res.ok) {
        throw new Error('request failed')
      }
      if (requestConfig.method === 'POST') {
        return
      }
      // if (requestConfig.method === 'DELETE') {
      //   return
      // }
      const fetchedData = await res.json()
      const data = fetchedData.data
      const lodadeData = [];
      for (const key in data) {
        lodadeData.push({
          id: data[key]._id ? data[key]._id : key,
          companyName: data[key].name || 'company name',
          symbol: data[key].symbol || 'ABC',
          marketCap: data[key].market_cap || 10,
          btn: requestConfig.btntype,
          companyPrice: data[key].current_price || 10.00
        });
      }
      setisloading(false)
      setFetchData(lodadeData)
    } catch (error) {
      console.log(error)
      setisloading(false)
      setHasError(true)
    }
  }, [])
  return { getExpressDdata, isloading, hasError, fetchData }
}

export default useExpressFetch
