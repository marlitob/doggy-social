import { fetchUserById } from "../use-user.server";
import Image from "next/image";
import pupp from "@/public/images/pupp.webp";
import React from "react";
import phoneSvg from "@/public/images/phone-rounded-svgrepo-com.svg";
import email from "@/public/images/email-1-svgrepo-com.svg";
import user from "@/public/images/user-svgrepo-com.svg";
import about from "@/public/images/about-you-svgrepo-com.svg";

interface User {
  id: number;
  email: string;
  name: string;
  username: string;
  followers: number;
  followingCount: number;
  isActive: boolean;
  registeredAt: string;
  emailVerified: boolean;
  phoneNumber: string;
  bio: string;
  quote: string;
}

interface Params {
  id: string;
}

interface UserDetailPageProps {
  params: Params;
}

const UserDetailPage: React.FC<UserDetailPageProps> = async ({
  params: { id },
}) => {
  const fetchedUser = await fetchUserById(id);
  const registeredDate = new Date(
    fetchedUser.registeredAt,
  ).toLocaleDateString();

  return (
    <div className="flex flex-col items-center">
      <div className="card card-side bg-base-100 shadow-xl my-4 w-3/4">
        <figure>
          <Image src={pupp} alt="User Image" width={500} height={500} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{fetchedUser.name}</h2>
          <p style={{ display: "flex", alignItems: "center" }}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <Image src={user} alt={"phone svg"} width="20" height="20" />
            </span>
            {fetchedUser.username}
          </p>
          <p style={{ display: "flex", alignItems: "center" }}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <Image src={phoneSvg} alt={"phone svg"} width="20" height="20" />
            </span>
            {fetchedUser.phoneNumber}
          </p>
          <p style={{ display: "flex", alignItems: "center" }}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <Image src={email} alt={"phone svg"} width="20" height="20" />
            </span>
            {fetchedUser.email}
          </p>
          <p style={{ display: "flex", alignItems: "center" }}>
            <Image src={about} alt={"phone svg"} width="60" height="60" />
            {fetchedUser.bio}
          </p>
          <p>Favorite Quote:</p>
          <p>`{fetchedUser.quote}`</p>
          <p className="badge badge-secondary text-xs">
            Followers: {fetchedUser.followers}
          </p>
          <p className="text-xs">Following: {fetchedUser.followingCount}</p>
          <p className="text-xs">Post: {fetchedUser.postsCount}</p>
          <div className="card-actions justify-end">
            <p className="text-xs text-gray-500">
              Registered on {registeredDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
