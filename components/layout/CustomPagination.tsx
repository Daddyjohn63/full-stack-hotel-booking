'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from 'react-js-pagination';

interface Props {
  resPerPage: number;
  filteredRoomsCount: number;
}

const CustomPagination = ({ resPerPage, filteredRoomsCount }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  let page = searchParams.get('page') || 1;
  page = Number(page); //this returns the page number we are on.
  //console.log(page);

  let queryParams;

  const handlePageChange = (currentPage: string) => {
    // alert(currentPage);
    if (typeof window !== 'undefined') {
      //ensure it is client side so we can use the built in methods of the browser.
      queryParams = new URLSearchParams(window.location.search);

      if (queryParams.has('page')) {
        queryParams.set('page', currentPage);
      } else {
        queryParams.append('page', currentPage);
      }

      const path = `${window.location.pathname}?${queryParams.toString()}`;
      // console.log(path);
      router.push(path);
    }
  };

  return (
    <div>
      {resPerPage < filteredRoomsCount && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={page}
            itemsCountPerPage={resPerPage}
            totalItemsCount={filteredRoomsCount}
            onChange={handlePageChange}
            nextPageText={'Next'}
            prevPageText={'Prev'}
            firstPageText={'First'}
            lastPageText={'Last'}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </div>
  );
};
export default CustomPagination;
