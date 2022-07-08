

const BlogsPage = ({ serverJSON, sortField, setSortField, sortOrder, setSortOrder, filterField, setFilterField, filterValue, setFilterValue, limit, setLimit, page, setPage}) => {
    return (
      <div className="blogs-page">
        <h1>Blogs Page</h1>

        <form>

        <select value={sortField} onChange={(e)=>{
            const value = e.target.value
            setSortField(value)
        }}>
            <option value='title'>title</option>
            <option value='author'>author</option>
            <option value='createdAt'>createdAt</option>
        </select>

        <select value={sortOrder} onChange={(e)=>{
            const value = e.target.value
            setSortOrder(value)
        }}>sortOrder
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
        </select>

        <select value={filterField} onChange={(e)=>{
            const value = e.target.value
            setFilterField(value)
        }}>filterFfield
            <option value="title">title</option>
            <option value="author">author</option>
        </select>
        <br/>

        filterValue: <input text value={filterValue} onChange={(e)=>{
            const value = e.target.value
            setFilterValue(value)
        }}></input><br/>

        page: <input text value={page} onChange={(e)=>{
            const value = e.target.value
            setPage(value)
        }} required={Number}></input><br/>

        limit: <input text value={limit} onChange={(e)=>{
            const value = e.target.value
            setLimit(value)
        }} required={Number}></input>

        <input type="submit" value="submit" onClick={(e)=>{
            const value = e.target.value
            
        }}></input>

        </form>

        <p>
          {serverJSON.map((blog) => {
            return <BlogPost blog={blog} key={blog.id} />;
          })}
        </p>
      </div>
    );
  };

const BlogPost = ({ blog }) => {
    return (
      <div className="blogPost">
        <p></p>
        <span>
          <strong> Title: </strong>
          <br />
        </span>
        {blog.title}
        <p>
          <span>
            <strong> Author: </strong>
            <br />
          </span>
          {blog.author}
        </p>
        <p>
          <span>
            <strong>Category: </strong> <br />
          </span>
          {blog.category}
        </p>
        <p>
          <span>
            <strong> Text: </strong> <br />
          </span>
          {blog.text}
        </p>
        <p>
          <span>
            <strong> Created At: </strong> <br />
          </span>
          {blog.createdAt}
        </p>
        <p>
          <span>
            <strong> Last Modified: </strong> <br />
          </span>
          {blog.lastModified}
        </p>
        <p>
          <span>
            <strong> ID: </strong> <br />
          </span>
          {blog.id}
        </p>
        <hr></hr>
      </div>
    );
  };

export default BlogsPage

