/* eslint-disable prettier/prettier */

export const getpost = async (postId: string) => {
  try {
    const res = await fetch(
      `https://grow-guide-server.vercel.app/api/growGuide/post/posts/${postId}`
    );

    if (!res.ok) {
      console.error(`Error fetching post (ID: ${postId}): ${res.statusText}`);
      return null; // Return null on error
    }

    const data = await res.json();
    console.log("Fetched post data:", data);
    return data?.data || null; // Return null if data is undefined
  } catch (error) {
    console.error("Error in getPost:", error);
    return null; // Handle errors gracefully
  }
};
