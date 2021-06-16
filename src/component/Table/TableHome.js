import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import classes from './TableHome.module.css';
import SearchIcon from '@material-ui/icons/Search';
import TableElement from './TableElement';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useApiFetch from '../../hooks/useApiFetch';
import { dataActions } from '../../store/index';

const Table = () => {
	const [pageNo, setPageNo] = useState(1)
	const [pagination, setPagination] = useState(true)
	// const dataState = useSelector((state) => state.apiData);
	const dispath = useDispatch();
	const inputRef = useRef()




	const { getApiDdata, isloading, hasError, fetchData } = useApiFetch()
	// const { getRequest } = useApiSearch()
	dispath(dataActions.setApiData(fetchData));

	useEffect(() => {
		getApiDdata({ url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=${pageNo}&sparkline=false`, btntype: 'save', fetchType: 'api' })
	}, [pageNo, getApiDdata])

	const pageForward = () => {
		setPageNo(prev => {
			return prev + 1
		})

	}
	const pageBack = () => {
		setPageNo(prev => {
			return prev - 1
		})
	}

	const searchHandler = () => {
		const input = inputRef.current.value.toLowerCase();
		if (input.trim().length === 0) {
			return
		}
		getApiDdata({ url: `https://api.coingecko.com/api/v3/coins/${input}`, type: 'search' })
		setPagination(false)
	}

	const showData = () => {
		if (hasError) {
			return <h1 className={classes.error}>company not found</h1>
		}
		return fetchData.map(ul => {
			return (
				<TableElement
					key={ul.id}
					id={ul.id}
					companyName={ul.companyName}
					symbol={ul.symbol}
					marketCap={ul.marketCap}
					btn={ul.btn}
					companyPrice={ul.companyPrice}
				/>
			)
		})
	}

	return (
		<div className={classes.table}>
			<div className={classes.table_top}>
				<p>Stock Details Table</p>
				<div className={classes.searchbox}>
					<button className={classes.search} onClick={searchHandler}>
						<SearchIcon />
					</button>
					<input type="search" placeholder='Search by Company Name' ref={inputRef}>
					</input>
				</div>
			</div>
			<div className={classes.table_bottom}>
				<ul className={classes.table_bottom_index}>
					<li>Company Name</li>
					<li>Symbol</li>
					<li>Market cap</li>
					<li></li>
					<li>company price</li>
				</ul>
				{
					isloading ? <h1 className={classes.loading}>loading...</h1> :
						showData()
				}
			</div>
			{pagination &&
				<div className={classes.table_pagination}>
					<p>{((pageNo - 1) * 5) + 1} - {pageNo * 5} of 276</p>
					<button onClick={pageBack}>
						<ChevronLeftIcon />
					</button>
					<button onClick={pageForward}>
						<ChevronRightIcon />
					</button>
				</div>
			}
		</div>
	);
}

export default Table;
