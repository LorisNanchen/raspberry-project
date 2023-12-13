
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { generateClient } from "aws-amplify/api";
import { listPosts, getPost } from "../graphql/queries";
import { createPost, updatePost, deletePost } from '../graphql/mutations';

const client = generateClient()

export default function Home() {

  async function fetchPosts() {
    const allPosts = await client.graphql({
      query: listPosts
    });
    console.log(allPosts);
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
  }

  async function changePost() {
    const updatedPost = await client.graphql({
      query: updatePost,
      variables: {
        input: {
          "id": "8e4b5137-5246-44fc-a9da-99602ad32c19",
          "titel": "Lorem ipsum dolor sit amet",
          "content": "Lorem ipsum dolor sit amet"
        }
      }
    });
  }

  async function suppPost() {
    const updatedPost = await client.graphql({
      query: deletePost,
      variables: {
        input: {
          "id": "8e4b5137-5246-44fc-a9da-99602ad32c19",
        }
      }
    });
  }


  return (
    <div>
      <h1>Posts</h1>
      <button onClick={makePost}>Create</button><br/>
      <button onClick={changePost}>Update</button><br/>
      <button onClick={suppPost}>Delete</button><br/>
    </div>
  )
}