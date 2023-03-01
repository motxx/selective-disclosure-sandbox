import React from "react";

function Post({ post }: any) {
  function colorTier(color: string) {
    const backgroundColor = color === "bronze" ? "peru" : color;

    const style = {
      backgroundColor: backgroundColor,
      textAlign: "center",
      color: "white",
    } as React.CSSProperties;

    return <i style={style}>{color}</i>;
  }

  return (
    <div className="post-container">
      {colorTier(post.tier)}
      <h2 className="post-heading">{post.title}</h2>
      <img className="post-image" src={post.imgUrl} />
      <p>{post.body}</p>
      <h4>Written by: {post.author}</h4>
    </div>
  );
}

export default Post;
