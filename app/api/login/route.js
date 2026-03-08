import db from "@/lib/db";

export async function POST(req){

const {email,password} = await req.json();

const [rows] = await db.query(
"SELECT * FROM users WHERE email=?",
[email]
);

if(rows.length === 0){
return Response.json({message:"User not found"});
}

const user = rows[0];

if(password !== user.password){
return Response.json({message:"Wrong password"});
}

return Response.json({message:"Login Successful"});

}