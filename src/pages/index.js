
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { generateClient } from "aws-amplify/api";
import { listPosts, getPost } from "../graphql/queries";
import { createPost, updatePost, deletePost } from '../graphql/mutations';

const client = generateClient()

export default function Home() {

  const [posts, setPosts] = useState([])

  async function fetchPosts() {
    const allPosts = await client.graphql({
      query: listPosts
    });
    console.log(allPosts.data.listPosts.items);
    setPosts(allPosts.data.listPosts.items)
  };

  async function makePost() {
    const newPost = await client.graphql({
      query: createPost,
      variables: {
        input: {
          "titel": "brand new post",
          "content": "Lorem ipsum dolor sit amet"
        }
      }
    });
    console.log(newPost)
    fetchPosts()
  }

  async function changePost() {
    const updatedPost = await client.graphql({
      query: updatePost,
      variables: {
        input: {
          "id": posts[0].id,
          "titel": "Lorem ipsum dolor sit amet",
          "content": "Lorem ipsum dolor sit amet"
        }
      }
    });
    fetchPosts()
  }

  async function suppPost() {
    const updatedPost = await client.graphql({
      query: deletePost,
      variables: {
        input: {
          "id": posts[0].id,
        }
      }
    });
    fetchPosts()
  }


  return (
    <div>
      <button onClick={makePost}>Create</button><br/>
      <button onClick={fetchPosts}>Read</button><br/>
      <button onClick={changePost}>Update</button><br/>
      <button onClick={suppPost}>Delete</button><br/><br/>
      {
        posts.map((post, index) => (
          <div key={index}>
            <div>{post.titel}</div>
            <div>{post.content}</div><br/>
          </div>
        ))
      }
    </div>
  )
}