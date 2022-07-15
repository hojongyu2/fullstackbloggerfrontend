import React from "react"

const BlogManagerCard = ({ blog, deleteBlog, fetchBlogAndShow }) => {
    return (
        <div className="blog-manager-card">
          
            <h1>Blog Manager Card</h1>
            <p>
                <span>
                    <strong> id: </strong>
                </span>
                {blog.id}
            </p>
            <p>
                <span>
                    <strong> title: </strong>
                </span>
                {blog.title}
            </p>
            <p>
                <span>
                    <strong> author: </strong>
                </span>
                {blog.author}
            </p>
            <p>
                <span>
                    <strong> createdAt: </strong>
                </span>
                {blog.id}
            </p>
            <p>
                <span>
                    <strong> lastModified: </strong>
                </span>
                {blog.lastModified}
            </p>
            <p>
                <span>
                    <button onClick={() => {
                        deleteBlog(blog.id)
                    }}><strong>Delete</strong></button>
                </span>
                <span>
                <button onClick={() => {
                        fetchBlogAndShow(blog.id)
                    }}><strong>Edit</strong></button>
                </span>
            </p>
        </div>
    )
}

export default BlogManagerCard