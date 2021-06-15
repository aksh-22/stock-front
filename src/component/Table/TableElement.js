import React, { useState, useEffect } from 'react'
import classes from './TableElement.module.css'
import { Link } from 'react-router-dom';
import useExpressFetch from '../../hooks/useExpressFetch';
import { useSelector } from 'react-redux';

const TableElement = (props) => {
  const dataState = useSelector((state) => state.apiData);
  const nodedataState = useSelector((state) => state.nodeData);
  const [saved, setSaved] = useState(false)
  console.log('TableElement')

  useEffect(() => {
    let a;
    for (const key in nodedataState) {
      a = nodedataState[key].companyName === props.companyName
    }
    if (a) {
      setSaved(true)
    }
  }, [nodedataState, props.companyName])

  const button = () => {
    if (props.btn === 'save') {
      return (
        saved ? <li className={`${classes.view} ${classes.btn}`}> <Link to='/view'><p>VIEW</p></Link> </li> : <li className={`${classes.save} ${classes.btn}`} onClick={() => { saveDataHandler(props.id) }}> <p>Save Data</p> </li>)
    }
    else {
      return (<li className={`${classes.delete} ${classes.btn}`} onClick={() => { deleteDataHandler(props.id) }}> <p>DELETE</p> </li>)
    }
  }
  const { getExpressDdata } = useExpressFetch()

  const saveDataHandler = (id) => {
    const index = dataState.findIndex(el => el.id === id);
    getExpressDdata({
      url: 'http://127.0.0.1:3000/api/v1/stocks/poststocks', btntype: 'delete', fetchType: 'node', method: 'POST', body: {
        name: dataState[index].companyName,
        id: dataState[index].id,
        symbol: dataState[index].symbol,
        current_price: dataState[index].companyPrice,
        market_cap: dataState[index].marketCap
      }
    })
    setSaved(true)
  }

  const deleteDataHandler = (id) => {
    getExpressDdata({
      url: `http://127.0.0.1:3000/api/v1/stocks/deletestocks/${id}`, btntype: 'delete', fetchType: 'node', method: 'DELETE', id: id
    })
  }

  return (
    <ul className={classes.table_bottom_element}>
      <li>{props.companyName}</li>
      <li className={classes.tag}> <p>{props.symbol}</p> </li>
      <li>${props.marketCap}</li>
      {button()}
      <li>${props.companyPrice} <span>USD</span> </li>
    </ul>
  )
}

export default TableElement
