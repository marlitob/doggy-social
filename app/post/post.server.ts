export async function fetchPostById(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseUrl}/api/post/${id}`, {
    cache: "no-store",
  });

  return await res.json();
}
