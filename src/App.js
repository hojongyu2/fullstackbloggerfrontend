import './App.css';
import { Routes, Route} from "react-router-dom"
import { useState, useEffect } from "react"
import BlogsPage from './Pages/Blogs'

const urlEndpoint = "http://localhost:4000";

function App() {

  const [serverJSON, setServerJSON] = useState(null)
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const apiResponse = await fetch(`${urlEndpoint}/blogs/hello-blogs`);
  //     const apiJSON = await apiResponse.json();
  //     setServerJSON(apiJSON);
  //     return;
  //   };
  //   fetchData();
  // }, []);

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

  return (
    <div className="App">
      <header className="App-header">
      <Routes>
        {serverJSON && (
          <Route
            path="/blogs"
            element={<BlogsPage blogs={serverJSON} />}
          ></Route>
        )}
      </Routes>
      </header>
    </div>
  );
}

export default App;
