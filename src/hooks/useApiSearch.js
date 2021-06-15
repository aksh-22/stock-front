import { useState, useCallback } from 'react';

const useApiSearch = () => {
  const [fetchData, setFetchData] = useState([])
  const [isloading, setisloading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const getRequest = useCallback(async (requestConfig) => {
    setisloading(true)
    try {
      const response = await fetch(requestConfig.url)
      if (!response.ok) {
        throw new Error('request failed')
      }
      const data = await response.json()
      // const data = [...fetcheddata];
      console.log(data)
      const lodadeData = [];
      lodadeData.push({
        id: Math.floor((Math.random() * 100) + 1),
        companyName: data.name,
        symbol: data.symbol,
        marketCap: data.market_data.market_cap.aed || '0.00',
        btn: 'save',
        companyPrice: data.market_data.current_price.aed || '0.00'
      });
      setisloading(false)
      setFetchData(lodadeData)
    } catch (error) {
      console.log(error)
      setisloading(false)
      setHasError(true)
    }
  }, [])

  return { getRequest, isloading, hasError, fetchData }
}

export default useApiSearch
