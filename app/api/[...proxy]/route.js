import { NextResponse } from "next/server";

export async function handleRequest(req) {
  const contentType = req.headers.get("content-type") || "";

  let body = null;
  let isMultipart = false;

  if (req.method !== "GET") {
    if (contentType.includes("application/json")) {
      const json = await req.json();
      body = JSON.stringify(json);
    } else if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      body = formData;
      isMultipart = true;
    }
  }

  // Build backend URL using full path
  const { pathname, search } = new URL(req.url);
  const backendUrl = `${process.env.EXTERNAL_API_URL}${pathname}${search}`;

  const fetchOptions = {
    method: req.method,
    headers: {
      ...(isMultipart ? {} : { "Content-Type": contentType }),
    },
    body: body ?? undefined,
  };

  const response = await fetch(backendUrl, fetchOptions);

  const responseHeaders = new Headers(response.headers);
  responseHeaders.delete("Content-Encoding");

  const responseBody = await response.text();

  return new NextResponse(responseBody, {
    status: response.status,
    headers: responseHeaders,
  });
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const DELETE = handleRequest;
