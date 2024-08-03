// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "@/lib/mongodb";

async function init(request: Request) {
  const body = await request.json();
  const { gmail, username, password, bearer } = body;

  try {
    const client = await clientPromise;
    const db = client.db("Niti");

    await db.collection("Contact").insertOne(body);

    return Response.json(
      { msg: "Data inserted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact Submission:", error);

    return Response.json(
      { message: "An error occured while sumitting contact" },
      { status: 500 }
    );
  }
}

export { init as POST };
