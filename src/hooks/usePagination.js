import { useMemo } from 'react';

const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
}

export const NAV_LEFT = 'left';
export const NAV_RIGHT = 'right';

export const pagination = ( totalCount = null, pageSize = null, siblingCount = null, currentPage = null ) => {
    
    if( !totalCount && !pageSize && !siblingCount && !currentPage) return undefined;

    const totalPageCount = Math.ceil( totalCount / pageSize );
    const totalPageNumbers = siblingCount + 5;
    if( totalPageNumbers >= totalPageCount){
        return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max( currentPage - siblingCount, 1 );
    const rightSiblingIndex = Math.min( currentPage + siblingCount , totalPageCount);
      

    const shouldShowNavLeft = leftSiblingIndex > 2;
    const shouldShowNavRight = rightSiblingIndex < (totalPageCount - 1);


    if(!shouldShowNavLeft && shouldShowNavRight){
        let leftItemCount = 5;
        let leftRange = range(1, leftItemCount);
        return [...leftRange, NAV_RIGHT]
    }


    if(shouldShowNavLeft && shouldShowNavRight){
        let start = leftSiblingIndex - 1;
        let middleRange = range(leftSiblingIndex, rightSiblingIndex);
        let end = rightSiblingIndex + 1;
        return [NAV_LEFT, start, ...middleRange, end, NAV_RIGHT];
    }

    if(shouldShowNavLeft && !shouldShowNavRight){
        let rightItemCount = 5;
        let rightRange = range( (totalPageCount - rightItemCount) + 1 , totalPageCount );
        return [NAV_LEFT, ...rightRange];
    }
}

export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage
 }) => {

    const paginationRange = useMemo( () => {
        return pagination(totalCount, pageSize, siblingCount, currentPage);
    }, [totalCount, pageSize, siblingCount, currentPage])

    return paginationRange;

}