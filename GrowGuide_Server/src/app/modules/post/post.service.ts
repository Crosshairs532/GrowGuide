import { TPost } from './post.interface'
import { postModel } from './post.model'

const createPostDb = async (postData: TPost) => {
  console.log(postData)
  const posted = await postModel.create(postData)
  return posted
}

export const postService = {
  createPostDb,
}
