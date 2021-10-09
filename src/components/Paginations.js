import React from 'react';
import { usePagination, NAV_LEFT, NAV_RIGHT } from './../hooks/usePagination';
import './Paginations.css';

export default function Paginations({
    onPageChange = {},
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize
}) {

    const paginationRange = usePagination({
        totalCount,
        pageSize,
        currentPage,
        siblingCount
    });

    if( currentPage === 0 && paginationRange.length < 2 ){
        return null;
    }

    return (
        <ul className="paginations">
            {paginationRange.map((item, i) => {

                if(item === NAV_LEFT){
                    return <li key={i} className={'pagination-item'} onClick={() => onPageChange(currentPage - 1)}> &#8592; </li>
                }else if( item !== 'left' && item !== 'right' ){
                    return (
                        <li 
                            className={`pagination-item ${item === currentPage && `pagination-item-active`}`} 
                            key={i}
                            onClick={() => onPageChange(item)}
                        >
                            {item}
                        </li>
                    )
                }else if(item === NAV_RIGHT){
                    return <li key={i} className={'pagination-item'} onClick={() => onPageChange(currentPage + 1)}>&#8594;</li>
                }
                
            })}
        </ul>
    )
}
