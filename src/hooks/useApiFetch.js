import { useCallback, useState } from 'react'

const useApiFetch = () => {
  const [fetchData, setFetchData] = useState([])
  const [isloading, setisloading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const getApiDdata = useCallback(async (requestConfig) => {
    setisloading(true)
    try {
      const res = await (fetch(requestConfig.url))
      if (!res.ok) {
        throw new Error('request failed')
      }
      let data = await res.json()
      if (requestConfig.type === 'search') {
        data = [data]
      }
      const lodadeData = [];
      for (const key in data) {
        lodadeData.push({
          id: data[key]._id ? data[key]._id : key,
          companyName: data[key].name || 'company name',
          symbol: data[key].symbol || 'ABC',
          marketCap: data[key].market_cap || 10,
          btn: 'save',
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
  return { getApiDdata, isloading, hasError, fetchData }
}

export default useApiFetch
