'use client'

import { GET_POSTS, GET_USERS } from '@/app/assets/config';
import { useEffect, useState } from 'react';

export interface Post {
  userId: number,
  id: number,
  title: string,
  body: string
}

export interface User {
  id: number,
  name: string,
  username: string,
  website: string,
  phone: string,
  email: string,
  company: {
    bs: string,
    catchPhrase: string
    name: string
  },
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  },
}

export default function page() {

  const [users, setUser] = useState<User[]>([])
  const [posts, setPost] = useState<Post[]>([])

  useEffect(() => {
    fetch(GET_USERS)
      .then((response) => response.json())
      .then((json) => {
        setUser(json);
      });
  }, [])

  const getPost = useEffect(() => {
    fetch(GET_USERS)
      .then((response) => response.json())
      .then((json) => {
        setUser(json);
      });
  }, [])

  function getPostByUserId(userId: number) {
    fetch(`${GET_POSTS}/${userId}`)
      .then((response) => response.json())
      .then((json) => {
        setPost(json);
        console.log(posts);
      }); 
  }

  function buscar(id: number) {
    getPostByUserId(id);
  }

  return (
    <div>

      <br /><br />

      <ul>
        {
          users?.map((user: User) => {
            return (
              <>
                <section key={user.id}>
                  <li>{user.id} | {user.name} | {user.username} | {user.email}</li>
                  <button className="border p-5 bg-background" onClick={() => {
                    buscar(user.id)
                  }}> Get post by id </button>
                </section>
              </>
            )
          })
        }
      </ul>
    </div>
  )
}
