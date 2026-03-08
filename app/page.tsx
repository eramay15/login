"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");

  const login = async (e:any) => {

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

      <form onSubmit={login}>

        <input
        type="email"
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        />

        <br/><br/>

        <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
        />

        <br/><br/>

        <button>Login</button>

      </form>

      <p>{message}</p>

    </div>

  );

}