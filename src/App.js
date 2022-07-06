import './App.css';
import { Routes, Route} from "react-router-dom"
import { useState, useEffect } from "react"
import BlogsPage from './Pages/Blogs'

const urlEndpoint = "http://localhost:4000";

function App() {

  const [serverJSON, setServerJSON] = useState({message:null})
  
  useEffect(() => {
    const fetchData = async () => {
    const apiResponse = await fetch(`${urlEndpoint}/blogs/hello-blogs`);
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
          <Route path='/blogs' element={<BlogsPage message={serverJSON.message}/>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
