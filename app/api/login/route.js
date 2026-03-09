import db from "@/lib/db";

export async function POST(req) {

  const { email, password } = await req.json();

  try {

    const result = await db.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if(result.rows.length === 0){
      return Response.json({message:"User not found"});
    }

    const user = result.rows[0];

    if(password !== user.password){
      return Response.json({message:"Wrong password"});
    }

    return Response.json({message:"Login Successful"});

  } catch(error){

    console.log("DATABASE ERROR:", error);

    return Response.json({
      message:"Database error",
      error: error.message
    });

  }

}