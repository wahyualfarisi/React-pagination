import { useMemo } from 'react';

const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
}

export const NAV_LEFT = 'left';
export const NAV_RIGHT = 'right';

export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage
 }) => {

    const paginationRange = useMemo( () => {

        const totalPageCount = Math.ceil( totalCount / pageSize );

        const totalPageNumbers = siblingCount + 5;

        if( totalPageNumbers >= totalPageCount){
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max( currentPage - siblingCount, 1 );
        const rightSiblingIndex = Math.min( currentPage + siblingCount , totalPageCount);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 1;

        if(!shouldShowLeftDots && shouldShowRightDots){
            let leftItemCount = 5 * siblingCount;
            let leftRange = range(1, leftItemCount);
            return  [...leftRange, NAV_RIGHT];
        }

        if(shouldShowLeftDots && !shouldShowRightDots){
            
            let rightItemCount = 5 * siblingCount;
            let rightRange = range( totalPageCount - rightItemCount + 1, totalPageCount );

            return [NAV_LEFT, ...rightRange];
        }

        if(shouldShowLeftDots && shouldShowRightDots){
            
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [NAV_LEFT, leftSiblingIndex - 1, ...middleRange, rightSiblingIndex + 1, NAV_RIGHT];
        }

    }, [totalCount, pageSize, siblingCount, currentPage])

    return paginationRange;

}