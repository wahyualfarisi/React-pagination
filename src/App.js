import React, { useState, useEffect  } from 'react';
import './App.css'
import Paginations from './components/Paginations';

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [ data, setData ] = useState([]);
  const [ meta, setMeta] = useState(null);
  const [currPage, setCurrentPage] = useState(1);


  useEffect( () => {

    setIsLoading(true);
    fetch(`https://zlzew.mocklab.io/pagination?page=${currPage}`)
      .then(res => {
          return res.json()
      })
      .then(res => {
          const { data, meta } = res;
          setIsLoading(false);
          setData(data)
          setMeta(meta)
      })
      .catch(err => {
          setIsLoading(false);
          console.log(err)
      })



  }, [currPage] )

  

  return (
    <div className="App">
      <ul className="collection">
        {data.length > 0 && data.map((item, i) => {
            return (
              <li className="collection-item" key={i}>
                <img 
                  src={item.img_url}
                  alt=""
                />
            </li>
            )
        })}
      </ul>

      {meta && (
        <Paginations 
            totalCount={meta.total}
            pageSize={meta.limit}
            onPageChange={(page) => setCurrentPage(page)}
            siblingCount={1}
            currentPage={currPage}
        />
      )}
      

    </div>
  );
}

export default App;
