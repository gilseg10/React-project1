import React from "react"

// Comp to handle a post appearance
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
