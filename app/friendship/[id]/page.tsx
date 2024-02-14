import { fetchFriendsById } from "@/app/friendship/friendship.server";
import Image, { StaticImageData } from "next/image";
import doggyImages from "@/app/friendship/doggyImages";
import React from "react";
import email from "@/public/images/email-1-svgrepo-com.svg";
import user from "@/public/images/user-svgrepo-com.svg";

interface Friends {
  name: string;
  email: string;
  username: string;
  isActive: boolean;
  registeredAt: string;
  image?: StaticImageData;
}
interface Params {
  id: string;
}

interface FriendsDetailPageProps {
  params: Params;
}
const pupImages: StaticImageData[] = doggyImages;

const shuffleArray = (array: StaticImageData[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const FriendsDetailPage: React.FC<FriendsDetailPageProps> = async ({
  params: { id },
}) => {
  const fetchedFriends: Friends[] = await fetchFriendsById(id);
  shuffleArray(pupImages);
  const friendsWithImages = fetchedFriends.map((friend, index) => ({
    ...friend,
    image: pupImages[index % pupImages.length],
  }));

  return (
    <div className="flex flex-col items-center p-1">
      {friendsWithImages.map((friendItem, index) => (
        <div
          key={index}
          className="card card-side bg-base-100 shadow-xl  my-4 w-1/4 p-1"
        >
          <div className={"card-body relative h-64 p-0 w-1/2"}>
            <figure className="relative h-64 w-full rounded-l-lg">
              <Image
                src={friendItem.image!}
                alt="User Image"
                style={{ objectFit: "cover" }}
                className="absolute inset-0"
                sizes="(max-width: 768px) 100vw, 156px"
                fill={true}
                priority={true}
              />
            </figure>
          </div>
          <div className="card-body flex-shrink p-1 mr-5 ml-5 justify-center">
            <h2 className="card-title">{friendItem.name}</h2>
            <div>
              <p style={{ display: "flex" }} className={"text-xs"}>
                <Image src={user} alt={"phone svg"} width="15" height="15" />
                {friendItem.username}
              </p>
            </div>
            <div>
              <p style={{ display: "flex" }} className={"text-xs"}>
                <Image src={email} alt={"phone svg"} width="15" height="15" />
                {friendItem.email}
              </p>
            </div>
            <div>
              <p className={"text-xs badge badge-warning"}>Online: No</p>
            </div>
            <div className="card-actions justify-end">
              <p className="text-xs text-gray-500">
                Member Since:{" "}
                {new Date(friendItem.registeredAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendsDetailPage;
