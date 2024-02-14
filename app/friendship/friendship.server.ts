export async function fetchFriendsById(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const res = await fetch(`${baseUrl}/api/friendship/${id}`, {
    cache: "no-store",
  });
  return await res.json();
}
