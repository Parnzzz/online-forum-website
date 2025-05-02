import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/user';


const allowedOrigins = [
  'https://online-forum-website.vercel.app',
  'http://localhost:3000',
];

function getCORSHeaders(origin) {
  if (allowedOrigins.includes(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
  }
  return {
    // No origin allowed
    'Access-Control-Allow-Origin': 'null',
  };
}

export async function OPTIONS(req) {
  const origin = req.headers.get('origin') || '';
  const headers = getCORSHeaders(origin);

  return new NextResponse(null, {
    status: 204,
    headers,
  });
}

export async function POST(req) {
  const origin = req.headers.get('origin') || '';
  const corsHeaders = getCORSHeaders(origin);

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
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('API error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
