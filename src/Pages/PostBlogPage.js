import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const PostBlog = ({ blogSubmit, setIsFetching }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const [message, setMessage] = useState("");
    const navigate = useNavigate ();

    return (
        <div>
            <h1>Post Blog</h1>
            <label>title : </label>
            <input type="text" value={title} onChange={(e)=>{
                const value = e.target.value;
                setTitle(value);
            }}></input><br/><br/>
            <label>author: </label>
            <input type="text" type={author} onChange={(e)=>{
                const value = e.target.value;
                setAuthor(value);
            }}></input><br/><br/>
            <label>text: </label>
            <textarea type={text} onChange={(e)=>{
                const value = e.target.value;
                setText(value);
            }}></textarea><br/>
            <button type="submit" onClick={async () => {
          if (!title || !text || !author ) {
            let isTitle = title ? "" : "\n - Title";
            let isText = text ? "" : "\n - Text";
            let isAuthor = author ? "" : "\n - Author";
            alert(
              `Please enter missing field(s): ${isTitle} ${isText} ${isAuthor}`
            );
          } else {
            setIsFetching(true);
            const { success, message } = await blogSubmit({
              title: title,
              author: author,
              text: text,
            });
            setIsFetching(false);
            setMessage(message);
            if (success === true) {
              navigate("/");
            }
          }
        }}
      >
        Submit
      </button>
        </div>
    )
}

export default PostBlog