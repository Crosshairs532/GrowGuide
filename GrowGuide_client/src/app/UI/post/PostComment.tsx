import { useGrowContext } from "@/app/Context/GrowContext";
import { useComment } from "@/hooks/useComment";
import { Textarea } from "@nextui-org/input";
import { Avatar } from "@nextui-org/react";
import { Send } from "lucide-react";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

const PostComment = ({
  isComment,
  post,
}: {
  isComment: boolean;
  post: any;
}) => {
  const { user } = useGrowContext();
  const [viewAll, setViewAll] = useState(false);
  const [value, setOnChange] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const { mutate: postComment, isPending } = useComment();
  // const { data, isPending, isFetching, isSuccess } = useQuery({
  //   queryKey: ["ALL_COMMENTS"],
  //   queryFn: async () => {
  //     const res = await AxiosInstance.get(`/post/comments?postId=${post._id}`);
  //     return res.data;
  //   },
  // });

  const onSubmit = (data: any) => {
    const commentData = {
      postId: `${post._id}`,
      commenterId: "67063aa0b940a61d10e0b16b",
      userComments: data.comment,
    };
    postComment(commentData);
    setOnChange("");
  };

  return (
    <div>
      {isComment ? (
        <div>
          <div className=" mt-2 gap-3 flex items-center">
            <div>
              <Avatar src={user?.image} />
            </div>
            <div className="flex flex-col w-full">
              <Textarea
                {...register("comment")}
                value={value}
                autoFocus={true}
                onValueChange={(value: string) => setOnChange(value)}
                key="underlined"
                variant={"underlined"}
                labelPlacement="outside"
                placeholder={`Comment as ${user?.name}`}
                className="col-span-12 w-full bg-[#242526] md:col-span-6 mb-6 md:mb-0"
                startContent={<Send onClick={handleSubmit(onSubmit)} />}
              />
              <small>{isPending ? "posting..." : ""}</small>
            </div>
          </div>

          <div>
            {
              <p
                onClick={() => setViewAll(!viewAll)}
                className={` ${viewAll ? "hidden" : "block"} font-chirpBold`}
              >
                View All Comments
              </p>
            }
            {viewAll &&
              post?.comments?.map((comment: any) => {
                // if (comment.email != user.email)
                console.log(comment);
                return (
                  <div className=" my-3 flex items-center gap-3">
                    <div>
                      <Avatar src={comment.userId?.image} />
                    </div>
                    <div className=" px-2 rounded-2xl w-full col-span-12 bg-[#242526] py-4 md:col-span-6 mb-6 md:mb-0">
                      <h1 className=" font-chirpBold">{comment.userId.name}</h1>
                      <p>{comment.userComments}</p>
                    </div>
                    {/* <Textarea
                    disabled
                    value={comment.userComments}
                    key="underlined"
                    variant={"underlined"}
                    labelPlacement="outside"
                    placeholder={`Comment as ${user?.name}`}
                    className="col-span-12 bg-[#242526] md:col-span-6 mb-6 md:mb-0"
                  /> */}
                  </div>
                );
              })}
            {
              <p
                onClick={() => setViewAll(!viewAll)}
                className={` ${viewAll ? "block" : "hidden"} font-chirpBold`}
              >
                View less
              </p>
            }
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default PostComment;
