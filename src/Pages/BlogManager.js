import React from "react"
import BlogManagerCard from "../components/BlogManagerCard"
// imported BlogManagerCard from components
const BlogManager = ({ adminBlogList, deleteBlog }) => {

    return (
        <div className="container">
            {adminBlogList.map((blog)=>{
            return (
                
                // ans sending it down as child component
                <BlogManagerCard blog={blog} key={blog.id} deleteBlog={deleteBlog}/>
            )
        })}</div>
    )
}

export default BlogManager