'use client'

import { useState } from "react";

export interface PropsType {
  params: {
    id: string
  }
}

export default async function Page({params}: PropsType ) {

  const [data, setData] = useState(null)

  console.log( data );
    
  return (
    <div>

    </div>
  )
}
