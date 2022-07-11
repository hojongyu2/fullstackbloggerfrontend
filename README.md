# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

--------------------------------------------------------
day2
* In the fullstackbloggerbackend (Server) repo: 
  * Install mongodb and dotenv ✅
    * npm i mongodb dotenv ✅
  * Create a new file ./.env ✅
  * Add your Mongo Atlas connection string to the .env file✅
    * MONGO_URI=mongodb+srv://<myusername>:<mypassword>@<mycluster>.mongodb.net/?retryWrites=true&w=majority
    * Note: NoSqlBooster will still have your URI stored in the connections window. Click Connect -> Select export to URI.
  * Create a new file ./mongo.js and add the following code to it:✅
    * const { MongoClient } = require("mongodb");✅
      require("dotenv").config();

      let db;

      async function mongoConnect() {
        const uri = process.env.MONGO_URI;
        const client = new MongoClient(uri);
        try {
          await client.connect();
          db = await client.db(process.env.MONGO_DATABASE);
          console.log("db connected");
        } catch (error) {
          console.error(error)
        }
      }
      function blogsDB() {
        return db;
      }
      module.exports = {
        mongoConnect,
        blogsDB,
      };
  * Add the following code, after the line var app = express();, to app.js:✅
    * var { mongoConnect } = require('./mongo.js');✅
      mongoConnect();✅
  * Add a new GET route "all-blogs" in ./routes/blogs.js
  * Implement the following functionality in the "all-blogs" route:
    * It should respond with a list of all the blogs currently stored in your blogs database as a JSON object 
      * res.send(allBlogs).
  
* In the fullstackbloggerfrontend (Client) repo:✅
  * Modify the useEffect method in the App component to be:✅
    * useEffect(() => {
      const fetchData = async () => {
        const url = `${urlEndpoint}/blogs/all-blogs`
        const apiResponse = await fetch(url);
        const apiJSON = await apiResponse.json();
        setServerJSON(apiJSON);
        return;
      };
      fetchData();
    }, []); 
  * Modify the BlogsPage component to be:✅
    * const BlogsPage = (props) => {
      return (
        <div className="blogs-page">
          <h1>Blogs Page</h1>
          <p>Server Message: {props.message.map((blog)=>{
            return (
              <>
                {blog.title}
              </>
            )
          })}</p>
        </div>
      )
    }
* Navigate to "localhost:3000/blogs"
  * It should display the titles of all the blogs in your database to the page.
* Stretch Goal: Display the other blog fields to the page along with title. Add css to improve the readability of the page.

--------------------------------------------------------
Day 3:
# Requirements (Fullstack Part 2 - Improved GET All Blogs)
* Implement the following in the Client✅
* Add the following state variables to <App />✅
* sortField {string} initialized to null✅
* sortOrder {string} initialized to "ASC"✅
* filterField {string} initialized to null✅
* filterValue {string} initialized to null✅
* limit {number} initialized to 10✅
* page {number} initialized to 0✅
* Pass these state variables as well as their setter functions as props into <BlogsPage />✅
* Add the following input fields to the <BlogsPage />✅
* sortField✅
* Should be a <select> dropdown with the following <options>, ["title", "author", "createdAt"]✅
* sortOrder✅
* Should be a <select> dropdown with the following <options>, ["ASC", "DESC"]✅
* filterField✅
* Should be a <select> dropdown with the following <options>, ["title", "author"]✅
* filterValue✅
* Should be a text input field✅
* limit✅
* Should be a number input field✅
* page✅
* Should be a number input field✅
* All input fields on the <BlogsPage /> should be hooked up to the state variables in <App />✅
* Modify the useEffect method in the <App /> component to be:✅
* useEffect(() => {
const fetchData = async () => {
const url = `${urlEndpoint}/blogs/all-blogs?sortField=${sortField}&sortOrder=${sortOrder}&filterField=${filterField}&filterValue=${filterValue}&limit=${limit}&page=${page}`
const apiResponse = await fetch(url);✅
const apiJSON = await apiResponse.json();✅
setServerJSON(apiJSON);✅
return;✅
};✅
fetchData();✅
}, [sortField, sortOrder, filterField, filterValue, limit, page]);✅
* Note: The idea here is that the input fields on the <BlogsPage /> will update the state variables in <App />. Since the useEffect hook in <App /> is watching the state variables [sortField, sortOrder, filterField, filterValue, limit, page] for changes, every time the user inputs a new value into any <BlogsPage /> input field, the useEffect will trigger. The new fetch url will be calculated with the most up to date query params and will in turn refetch the new list of blogs from the server.

* Implement the following in the Server
* [Optional] Install nodemon on the server and add the custom dev command in the package.json
* npm i nodemon
* "scripts": {
"start": "PORT=4000 node ./bin/www",
"dev": "PORT=4000 nodemon ./bin/www"
}
* In the "/blogs/all" route, implement the following:✅
* Add the following variables inside the route handler function to get query param values from the incoming GET request url:
* const limit = Number(req.query.limit)✅
* const skip = Number(req.query.skip)✅
* const sortField = req.query.sortField✅
* const sortOrder = req.query.sortOrder✅
* const filterField = req.query.filterField✅
* const filterValue = req.query.filterValue✅
* Update the mongo query method to properly incorporate the above variables in the query.
* const dbResult = await collection✅
.find({[filterField]: filterValue})✅
.sort({[sortField]: sortOrder})✅
.limit(limit)✅
.skip(skip)✅
.toArray();✅
* Note: sortOrder may need to be converted from "ASC" and "DESC" to 1 and -1 respectively before the query is executed.
* Note: The above code may have to be modified depending on your implementation of the "/blogs/all" route in the fullstack blogger project. But it should be very similar in functionality to the "/blogs/all" route in the ExpressJS example.
* Note: The sorting, filter, limit and page functionality are now being handled by the database using the mongodb query. We will no longer need to use JS functions to implement this functionality on the blogs dataset anymore.
* Stretch Goal: Add server-side validation to the "/blogs/all" route to ensure the following before the mongo query is executed:
* sortField, sortOrder, filterField and filterValue must have truthy values. I.E. they must not be null or an empty string.
* limit and page must be integer values greater than 0.


--------------------------------------------------------
Day 4:
### Requirements (Fullstack Part 2 - POST Blog)
* Implement the following in the Server✅
  * Create a new POST route "/blog-submit" and implement the following✅
    * Inside the route handler function, add the following variables to get the incoming values from the POST request body:✅
      * const title = req.body.title
      * const text = req.body.text
      * const author = req.body.author
    * Create a new blogPost object with the following fields, some of which will need to be generated with each new post.✅
      * title {string}
      * text {string}
      * author {string}
      * createdAt {date}
      * id {number}
      * lastModified {date}
    * Add a mongo insert method to save the new blogPost object in the database.✅
  * Note: Use ExpressJS Example "/blog-submit" route as reference.

* Implement the following in the Client
  * Create a new page <PostBlogPage />✅
  * Create a new route in <App /> "/post-blog" with the element as <PostBlogPage /> ✅
  * Add the following function in <App />✅
    * const blogSubmit = async (blog) => {
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
  * Modify the "/blogs" route to be the index route of <App /> so that it shows by default at localhost:3000
    * <Route index element={<BlogsPage message={serverJSON.message} blogSubmit={blogSubmit} />} />
  * Implement the following in <PostBlogPage />
    * Add three new state variables:
      * title {string}
      * author {string}
      * text {string}
    * Add the following input fields:
      * title 
        * Should be a text input field
      * author 
        * Should be a text input field
      * text 
        * Should be a <textarea> field
    * Hook up all input fields to their corresponding state variables
    * Add a <button> called Submit
    * The Submit button should call props.blogSubmit(blogData) onClick and then programatically redirect to the home page.
      * const navigate = useNavigate()
      * navigate(`/`)
  * Note: blogData is going to be an object containing the current values of title, author, and text in the <PostBlogPage /> state. This data will be received by the server through the POST request, which will then in turn generate a new blog post with the added fields such as createdAt. The server will then save the new post using the mongo insert() method.

* Stretch Goal: Add a debounce in the Front-End to the text input fields
  * https://usehooks.com/useDebounce/
* Stretch Goal: Modify the mongo method for "all-blogs" so that you can do a text match search in a blog post text field for a specific string. Additionally, update the filter options dropdown on the Front-End to include the "text" option.
  * Note: This will NOT check for partial searches
  * db.articles.find( { $text: { $search: "coffee" } } )
  * https://www.mongodb.com/docs/manual/reference/operator/query/text/#examples
* Super Stretch Goal: 
  * elemMatch may be able to do a partial string match
  * https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/




### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
