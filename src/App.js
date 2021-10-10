import React, { useState, useEffect  } from 'react';
import './App.css'
import Paginations from './components/Paginations';
import { useLocation, useHistory } from 'react-router-dom';

function App() {

  const history = useHistory();
  const search  = useLocation().search;
  const page = new URLSearchParams(search).get('page');


  const [isLoading, setIsLoading] = useState(false);
  const [ data, setData ] = useState([]);
  const [ meta, setMeta] = useState(null);
  const [currPage, setCurrentPage] = useState( page ? +page : 1 );

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
      })
      
  }, [currPage] )

  useEffect( () => {

    window.onpopstate = () => {
      let page = new URLSearchParams(history.location.search).get('page');
      setCurrentPage(page ? +page : 1)
    }

  }, [history])

  const onChangePageHandler = ( num ) => {
    setCurrentPage(num)
    history.push(`?page=${num}`)
  }
  

  return (
    
      <div className="App">
        <ul className="collection">
          {data.length > 0 && data.map((item, i) => {
              return (
                <li className="collection-item" key={i}>
                  <img 
                    src={item.img_url}
                    className={isLoading ? `blur` : ``}
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
              onPageChange={(page) => onChangePageHandler(page)}
              siblingCount={1}
              currentPage={currPage}
          />
        )}
      </div>
    
  );
}

export default App;
