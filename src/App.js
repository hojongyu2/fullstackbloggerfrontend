import './App.css';
import { Routes, Route} from "react-router-dom"
import { useState, useEffect } from "react"
import BlogsPage from './Pages/Blogs'

const urlEndpoint = "http://localhost:4000";

function App() {

  const [serverJSON, setServerJSON] = useState({message:[]})
  
  useEffect(() => {

    const fetchData = async () => {
      const url = `${urlEndpoint}/blogs/all-blogs`
      const apiResponse = await fetch(url);
      const apiJSON = await apiResponse.json();
      setServerJSON(apiJSON);
      return;
    };
    fetchData();
  }, []); 
  
  const [sortField, setSortField] = useState(null)
  const [sortOrder, setSortOrder] = useState('ASC')
  const [filterField, setFilterField] = useState(null)
  const [filterValue, setFilterValue] = useState(null)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  

  return (
    <div className="App">
      <header className="App-header">
      <Routes>
          <Route path="/blogs" element={<BlogsPage serverJSON={serverJSON.message} 
          sortField={sortField} setSortField={setSortField} 
          sortOrder={sortOrder} setSortOrder={setSortOrder} 
          filterField={filterField} setFilterField={setFilterField}
          filterValue={filterValue} setFilterValue={setFilterValue}
          limit={limit} setLimit={setLimit}
          page={page} setPage={setPage}/>}/>
      </Routes>
      </header>
    </div>
  );
}

export default App;
