import React from "react";
import Link from "next/link";
import { sort } from "fast-sort";

interface User {
  id: number;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
}

interface Props {
  sortOrder: string;
}

const UserTable = async ({ sortOrder }: Props) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseUrl}/api/users`, {
    cache: "no-store",
  });

  const users: User[] = await res.json();
  const titles: string[] = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];

  const usersWithFirstAndLastNames = users.map((user) => {
    const parts = user.name.split(" ");
    const titleIndex = titles.findIndex((title) => parts.includes(title));
    const title = titleIndex >= 0 ? parts[0] + " " : ""; // Preserves the title with a space, if present
    const firstName = title + parts[titleIndex >= 0 ? 1 : 0]; // Adjusts based on title presence
    const lastName = parts.slice(titleIndex >= 0 ? 2 : 1).join(" ");

    return { ...user, firstName, lastName };
  });

  const sortedUsers =
    sortOrder === "name"
      ? sort(usersWithFirstAndLastNames).by([
          { asc: (u) => u.firstName.split(" ").slice(-1)[0] }, // More explicit about using the last part
          { asc: (u) => u.lastName },
        ])
      : sort(usersWithFirstAndLastNames).by([{ asc: "email" }]);

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>
            <Link href="/users?sortOrder=name">Name</Link>
          </th>
          <th>
            <Link href="/users?sortOrder=email">Email</Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <tr key={user.id}>
            <td>
              {user.firstName} {user.lastName}
            </td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
