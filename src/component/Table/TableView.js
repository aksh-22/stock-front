import React, { useEffect } from 'react';
import TableElement from './TableElement';
import classes from './TableView.module.css';
import { Link } from 'react-router-dom';
import useExpressFetch from '../../hooks/useExpressFetch';
import { useSelector } from 'react-redux';


const TableView = () => {
  const nodedataState = useSelector((state) => state.nodeData);

  const { getExpressDdata, fetchData } = useExpressFetch()
  // const dataState = useSelector((state) => state.nodeData);

  useEffect(() => {
    getExpressDdata({ url: 'http://127.0.0.1:3000/api/v1/stocks/getstocks', btntype: 'delete', fetchType: 'node' })
  }, [getExpressDdata, nodedataState])

  const showData = () => {
    return fetchData.map(ul => {
      return (
        <TableElement
          key={ul.id}
          id={ul.id}
          companyName={ul.companyName}
          symbol={ul.symbol}
          marketCap={ul.marketCap}
          btn='delete'
          companyPrice={ul.companyPrice}
        />
      )
    })
  }

  return (
    <div className={classes.table}>
      <div className={classes.table_top}>
        <p>SAVED DATA TABLE</p>
      </div>
      <div className={classes.table_bottom}>
        {showData()}
      </div>
      <div className={classes.table_footer}>
        <Link to='/home'>
          <p>BAck</p>
        </Link>
      </div>
    </div>
  )
}

export default TableView
