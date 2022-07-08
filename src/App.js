import './App.css';
import { Routes, Route} from "react-router-dom"
import { useState, useEffect } from "react"
import BlogsPage from './Pages/Blogs'

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





// import  React from "react";
// import { useState, useEffect } from "react";
// import "./App.css";
// import { Routes, Route } from "react-router-dom";
// import BlogsPage from "./Pages/Blogs";

// const urlEndpoint = "http://localhost:4000";

// const App = () => {
//   const [serverJSON, setServerJSON] = useState({ message: [] });
//   const [sortField, setSortField] = useState("title");
//   const [sortOrder, setSortOrder] = useState("ASC");
//   const [filterField, setFilterField] = useState("title");
//   const [filterValue, setFilterValue] = useState("");
//   const [limit, setLimit] = useState(10);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     const fetchData = async () => {
//       const url = `${urlEndpoint}/blogs/all-blogs?sortField=${sortField}&sortOrder=${sortOrder}&filterField=${filterField}&filterValue=${filterValue}&limit=${limit}&page=${page}`;
//       const apiResponse = await fetch(url);
//       const apiJSON = await apiResponse.json();
//       setServerJSON(apiJSON);
//       return;
//     };
//     fetchData();
//   }, [sortField, sortOrder, filterField, filterValue, limit, page]);
//   return (
//     <div className="App">
//       <Routes>
//         <Route
//           path="/blogs"
//           element={
//             <BlogsPage
//               serverJSON={serverJSON.message}
//               sortField={sortField}
//               setSortField={setSortField}
//               sortOrder={sortOrder}
//               setSortOrder={setSortOrder}
//               filterField={filterField}
//               setFilterField={setFilterField}
//               filterValue={filterValue}
//               setFilterValue={setFilterValue}
//               limit={limit}
//               setLimit={setLimit}
//               page={page}
//               setPage={setPage}
//             />
//           }
//         />
//       </Routes>
//     </div>
//   );
// };

// export default App;