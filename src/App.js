import './App.css';
import { Routes, Route} from "react-router-dom"
import { useState, useEffect } from "react"
import BlogsPage from './Pages/Blogs'
import PostBlogPage from './Pages/PostBlogPage'

const urlEndpoint = "http://localhost:4000";

const App = () => {

  const [serverJSON, setServerJSON] = useState({message:[]})
  const [sortField, setSortField] = useState("title")
  const [sortOrder, setSortOrder] = useState('ASC')
  const [filterField, setFilterField] = useState("title")
  const [filterValue, setFilterValue] = useState("")
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  useEffect(() => {

    const fetchData = async () => {
      const url = `${urlEndpoint}/blogs/all-blogs?sortField=${sortField}&sortOrder=${sortOrder}&filterField=${filterField}&filterValue=${filterValue}&limit=${limit}&page=${page}`
      const apiResponse = await fetch(url);
      const apiJSON = await apiResponse.json();
      setServerJSON(apiJSON);
      return;
    };
    fetchData();
  }, [sortField, sortOrder, filterField, filterValue, limit, page]); 

  // Since the useEffect hook in <App /> is watching the state variables 
  //[sortField, sortOrder, filterField, filterValue, limit, page] for changes, 
  //every time the user inputs a new value into any <BlogsPage /> input field, 
  //the useEffect will trigger. The new fetch url will be calculated with 
  //the most up to date query params and will in turn refetch the new list of blogs from the server.
  
  const blogSubmit = async (blog) => {
    const url = `${urlEndpoint}/blogs/blog-submit`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blog) 
    });
    const responseJSON = await response.json();
  }

  return (
    <div className="App">
      <header className="App-header">
      <Routes>
          <Route path="/blogs" index element={<BlogsPage serverJSON={serverJSON.message} 
          sortField={sortField} setSortField={setSortField} 
          sortOrder={sortOrder} setSortOrder={setSortOrder} 
          filterField={filterField} setFilterField={setFilterField}
          filterValue={filterValue} setFilterValue={setFilterValue}
          limit={limit} setLimit={setLimit}
          page={page} setPage={setPage}/>}/>
          <Route path="post-blog" element={<PostBlogPage blogSubmit={blogSubmit}/>} />
      </Routes>
      </header>
    </div>
  );
}

export default App;

