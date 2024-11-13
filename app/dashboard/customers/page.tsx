'use client'

import { GET_POSTS, GET_USERS } from '@/app/assets/config';
import { useEffect, useState } from 'react';

import Link from 'next/link';

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
  const [userSelected, setUserSelected] = useState<User>()

  useEffect(() => {
    fetch(GET_USERS)
      .then((response) => response.json())
      .then((json) => {
        setUser(json);
      });
  }, []);

  const findPostById = (user: User) => {
    fetch(`${GET_POSTS}?userId=${user.id}`)
      .then((response) => response.json())
      .then((json) => {
        setPost(json);
        setUserSelected(user)
        console.log(posts);
      });
  };

  console.log();
  

  return (
    <div>

      {
        <div>
          {userSelected && (
            <div>
              { `${userSelected.id} | ${userSelected.name}` }
            </div>
          )}
        </div>
      }

      {
          posts && (
            posts.map((post) => {
                return (
                  <section className='p-6' key={post.id}>
                    { post?.id }
                    { post?.title }
                    { post?.body }
                  </section>
                )
            }) 
          )
       }
      <br />
      <ul>
        {
          users?.map((item: User) => {
            return (
              <section key={item.id}>
                <li>{item.id} | {item.name} | {item.username} | {item.email}</li>
                <Link href={`/dashboard/customers/${item.id}`}  className="border p-5"> Get post by id </Link>
              </section>
            )
          })
        }
      </ul>
    </div>
  )
}
