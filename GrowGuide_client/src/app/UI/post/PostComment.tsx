/* eslint-disable prettier/prettier */
import { useGrowContext } from "@/app/Context/GrowContext";
import { useComment } from "@/hooks/useComment";
import { queryClient } from "@/lib/providers";
import { Textarea } from "@nextui-org/input";
import { Avatar } from "@nextui-org/react";
import { Ellipsis, Send } from "lucide-react";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DropDownComment from "../dropDown/DropDownComment";
import { useCommentUpdate } from "@/hooks/useCommentUpdate";

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
  const [valueEdit, setOnChangeEdit] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const { mutate: postComment, isPending } = useComment();
  const [editing, setEditing] = useState<boolean>(false);
  const [edited, setEdited] = useState<any>();
  const { mutate: commentUpdate } = useCommentUpdate();

  const onSubmit = (data: any) => {
    const commentData = {
      postId: `${post?._id}`,
      commenterId: user?._id,
      userComments: data?.comment,
    };

    // console.log(commentData);
    postComment(commentData);

    setOnChange("");
  };

  const editPost = (post: any, comment: any) => {
    setEdited({ action: "edit", post, commentId: comment?._id });
    setEditing(true);
    setOnChangeEdit(comment.userComments);
  };

  const editCommentSubmit = (data: any) => {
    const commentInfo = { ...edited, updatedComment: data.commentEdit };
    console.log(commentInfo);
    commentUpdate(commentInfo);
    reset();
    setEditing(false);
  };

  console.log(user?._id, post);
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
                size="md"
                labelPlacement="outside"
                placeholder={`Comment as ${user?.name}`}
                className="col-span-12 px-2 w-full bg-[#242526] md:col-span-6 mb-6 md:mb-0"
                endContent={<Send onClick={handleSubmit(onSubmit)} />}
              />
              <small>{isPending ? "posting..." : ""}</small>
            </div>
            <div></div>
          </div>

          <div>
            {
              <span
                role="button"
                tabIndex={0}
                onClick={() => setViewAll(!viewAll)}
                className={` ${viewAll ? "hidden" : "block"} pl-5 hover:text-[#a3a3a3f3] duration-150 font-chirpBold`}
              >
                <small> View All Comments</small>
              </span>
            }
            {viewAll &&
              post?.comments?.map((comment: any, ind: number) => {
                return (
                  <div key={ind} className=" my-3 flex items-center gap-3">
                    <div>
                      <Avatar src={comment?.userId?.image} />
                    </div>
                    <div className=" px-2 rounded-2xl w-full col-span-12 bg-[#242526] py-4 md:col-span-6 mb-6 md:mb-0">
                      <h1 className=" font-chirpBold">
                        {comment?.userId?.name}
                      </h1>

                      {editing && comment.userId?._id == user?._id ? (
                        <div className="flex flex-col w-full">
                          <Textarea
                            {...register("commentEdit")}
                            value={valueEdit}
                            autoFocus={true}
                            onValueChange={(value: string) =>
                              setOnChangeEdit(value)
                            }
                            key="underlined"
                            variant={"underlined"}
                            size="md"
                            labelPlacement="outside"
                            placeholder={`Comment as ${user?.name}`}
                            className="col-span-12 px-2 w-full bg-[#242526] md:col-span-6 mb-6 md:mb-0"
                            endContent={
                              <Send onClick={handleSubmit(editCommentSubmit)} />
                            }
                          />
                          <small>{isPending ? "posting..." : ""}</small>
                        </div>
                      ) : (
                        <p>{comment?.userComments}</p>
                      )}
                    </div>
                    <div
                      className={`edit_delete ${user?._id === comment?.userId?._id ? "block" : "hidden"} `}
                    >
                      <DropDownComment
                        editPost={editPost}
                        post={post}
                        comment={comment}
                        commenterId={user?._id}
                      >
                        <Ellipsis />
                      </DropDownComment>
                    </div>
                  </div>
                );
              })}
            {
              <span
                role="button"
                tabIndex={0}
                onClick={() => setViewAll(!viewAll)}
                className={`${viewAll ? "block" : "hidden"} pl-5 hover:text-[#a3a3a3f3] duration-150 font-chirpBold`}
              >
                <small>View less</small>
              </span>
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
