import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/user';

// Handle preflight (OPTIONS) request
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://online-forum-website.vercel.app',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email, name } = await req.json();

    const user = await User.findOne({ email }).select('_id');
    const username = await User.findOne({ name }).select('_id');

    return new NextResponse(
      JSON.stringify({ user, username }),
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': 'https://online-forum-website.vercel.app',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': 'https://online-forum-website.vercel.app',
        },
      }
    );
  }
}
