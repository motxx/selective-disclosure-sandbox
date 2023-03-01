import React from "react";
import Post from "./Post";

function Posts({ decryptedMessages }: any) {
  let blogPosts = [{}];
  if (decryptedMessages.length === 0) {
    return null;
  } else {
    blogPosts = JSON.parse(decryptedMessages);
  }

  if (blogPosts.length === 0) {
    return (
      <div className="post-container">
        <h2 className="post-heading">No posts available</h2>
        <h4>You need some <a href="https://faucet.paradigm.xyz/">MultiFaucet NFTs</a> to decrypt the posts.</h4>
      </div>
    );
  }

  return (
    <div className="posts-container">
      {blogPosts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
}

export default Posts;
