import React from "react"

export default function Posts({post}) {
  return (
    <div className="posts-div">
      <div className="post-row">
        <span className="post-label"><strong>Title: </strong>{post.title}</span>
      </div>
      <div className="post-row">
        <span className="post-label"><strong>Body: </strong>{post.body}</span>
      </div>
    </div>
  )
};
