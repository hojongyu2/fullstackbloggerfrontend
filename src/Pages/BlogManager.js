import React, { useState } from "react"
import BlogManagerCard from "../components/BlogManagerCard"
import Modal from "../components/Modal"

const BlogManager = ({ adminBlogList, deleteBlog, fetchSingleBlog, urlEndpoint }) => {

    // const { adminBlogList, deleteBlog, fetchSingleBlog, urlEndpoint } = props;
    // This is object destucturing. 
    // If I want to use object destucturing, Parameter inside of BlogManager has to be props.
    
    const [showModal, setShowModal] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editAuthor, setEditAuthor] = useState("");
    const [editText, setEditText] = useState("");
    const [editBlogId, setEditBlogId] = useState(null);

    const putUpdatedBlog = async () => {
        const url = `${urlEndpoint}/admin/edit-blog`
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                blogId: editBlogId,
                title: editTitle,
                author: editAuthor,
                text: editText
            }),
        });
        const responseJSON = await response.json();
        console.log(responseJSON)
        //why false?????????????????
        return responseJSON
    }

    return (

        <div className="container">
            <Modal title={editTitle} onClose={() => setShowModal(false)} show={showModal} putUpdatedBlog={putUpdatedBlog}>
                <label>Title</label>
                <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => {
                        setEditTitle(e.target.value);
                    }}
                />
                <br />
                <label>Author</label>
                <input
                    type="text"
                    value={editAuthor}
                    onChange={(e) => {
                        setEditAuthor(e.target.value);
                    }}
                />
                <br />
                <label>Text</label>
                <textarea
                    value={editText}
                    onChange={(e) => {
                        setEditText(e.target.value);
                    }}
                />
                <div className="modal-footer">
                    <button
                        onClick={() => {
                            putUpdatedBlog();
                        }}
                    >
                        Update Blog
                    </button>
                    
                </div>
            </Modal>
            
            {adminBlogList.map((blog) => {

                const fetchBlogAndShow = async () => {
                    const blogPost = await fetchSingleBlog(blog.id)
                    setEditTitle(blogPost.title)
                    setEditAuthor(blogPost.author)
                    setEditText(blogPost.text)
                    setEditBlogId(blog.id)
                    setShowModal(true)
                }
                return (
                    // sending it down as a child component
                    <BlogManagerCard blog={blog} key={blog.id} deleteBlog={deleteBlog} fetchBlogAndShow={fetchBlogAndShow} />
                )
            })}</div>
    )
}

export default BlogManager