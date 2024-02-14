import { fetchPostById } from "@/app/post/post.server";
import Image from "next/image";
import pupp from "@/public/images/pupp.webp";
import React from "react";
interface Post {
  title: string;
  content: string;
  createdAt: string;
}

interface Params {
  id: string;
}

interface PostDetailPageProps {
  params: Params;
}
const UserDetailPage: React.FC<PostDetailPageProps> = async ({
  params: { id },
}) => {
  const fetchedPosts: Post[] = await fetchPostById(id);

  return (
    <div className="flex flex-col items-center ">
      {fetchedPosts.map((postItem, index) => (
        <div
          key={index}
          className="card card-side bg-base-100 shadow-xl  my-4 w-11/12 "
        >
          <figure>
            <Image
              src={pupp}
              alt="User Image"
              width={200}
              height={200}
              priority={true}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{postItem.title}</h2>
            <p>{postItem.content}</p>
            <div className="card-actions justify-end">
              <p className="text-sm text-gray-500">
                Posted on {new Date(postItem.createdAt).toLocaleDateString()} at
                {new Date(postItem.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserDetailPage;
