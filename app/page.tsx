"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");

  const handleLogin = async (e:any) => {

    e.preventDefault();

    const res = await fetch("/api/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password})
    });

    const data = await res.json();

    if(data.message === "Login Successful"){
      router.push("/dashboard");
    }else{
      setMessage(data.message);
    }

  };

  return(

    <div style={{padding:"40px"}}>

      <h2>Login Form</h2>

      <form onSubmit={handleLogin}>

        <input
        type="email"
        placeholder="Email"
        required
        onChange={(e)=>setEmail(e.target.value)}
        />

        <br/><br/>

        <input
        type="password"
        placeholder="Password"
        required
        onChange={(e)=>setPassword(e.target.value)}
        />

        <br/><br/>

        <button type="submit">Login</button>

      </form>

      <p>{message}</p>

    </div>

  );

}
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <ul>
      {todos?.map((todo) => (
        <li>{todo}</li>
      ))}
    </ul>
  )
}
