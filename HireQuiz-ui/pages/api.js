// pages\api.js
// Created by: Nirav, Pratham
// Last Updated by: Nirav on July 13
const apiUrl = process.env.API_URL;

/**
 * Given an authenticated user, request all fragments for this user from the
 * fragments microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
export async function getUserFragments(user) {
  console.log("Requesting user fragments data...");
  try {
    console.log("Calling GET /v1/posting");
    const res = await fetch("http://localhost:8080/v1/posting/", {
      headers: {
        'Authorization': `Bearer ${user.idToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Got user fragments data", { data });
    return data.postings;
  } catch (err) {
    console.error("Unable to call GET /v1/jobposting", { err });
  }
}



export async function postFragments(user, content) {
  console.log("Post fragments data...");
  try {
    const res = await fetch("http://ec2co-ecsel-1ba9i1m8o403i-580755584.us-east-1.elb.amazonaws.com:8080/v1/posting/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.idToken}`,
        "Content-Type": "application/json",
      },
      // body: `${content}`,
      body: JSON.stringify(content),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Post user fragments data", { data });
    console.log("Posted Posting:", JSON.stringify(data.posting, null, 2));
    return data;
  } catch (err) {
    console.error("Unable to call POST /fragment", { err });
  }
}



export async function getFragmentByID(user, id) {

  console.log("Requesting user fragments data...");
  try {
    const res = await fetch(`http://ec2co-ecsel-1ba9i1m8o403i-580755584.us-east-1.elb.amazonaws.com:8080/v1/posting/${id}`, {
      method: "GET",
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    data = await res.text();
    console.log("Got user fragments data", { data });
    return data;
  } catch (err) {
    console.error("Unable to call GET getFragmentByID", { err });
  }
}
