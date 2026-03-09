import db from "@/lib/db";

export async function POST() {

  try {

    const result = await db.query("SELECT NOW()");

    return Response.json({
      message: "Database connected",
      time: result.rows[0]
    });

  } catch (error) {

    console.log(error);

    return Response.json({
      message: "Database error",
      error: error.message
    });

  }

}