'use client'
import { Input } from '@heroui/react'
import { SearchIcon } from '@/components/icons/SideBarIcons'
import DataTable from '@/components/ui/Table'
import { PostService } from '@/services/post.servise'
import { UsersService } from '@/services/users.servise'
import { CommentsServise } from '@/services/comments.servise'
import { UserInterface } from '@/types/users'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { CommentItem } from '@/types/comments'
import { POSTS_CONST } from './posts.constants'


function UserPage() {

        const { isLoading: isLoadingPosts, isError: isErrorPosts, data, error: errorPosts } = useQuery({
        queryKey: ['post'], 
        queryFn: PostService.getAll
    });

    const { isLoading: isLoadingUsers, isError: isErrorUsers, data: users, error: errorUsers } = useQuery({
        queryKey: ['users'], 
        queryFn: UsersService.getAll
    });
        const userMap = useMemo(() => {
      const map = new Map()
      users?.users?.forEach((el: UserInterface) => map.set(el?.id, el))
      return map
    },[users])

    const {isLoading: isLoadingComments, isError: isErrorComments, data: comments, error: errorComments} = useQuery({
      queryKey: ['comments'],
      queryFn: CommentsServise.getAll
    })

    const commentsMap = useMemo(()=>{
      const map = new Map()
      comments?.comments?.forEach((el: CommentItem) => {
        const postId = map.get(el.postId)
        if(postId){
          postId.comments.push(el)
        }
        else if(!postId){
          map.set(el.postId, {comments: [el]})
        }
      })
      
      
      return map
    },[comments])
    console.log("Users: ",users)
    // console.log('posts: ', data?.posts)
    console.log(commentsMap)

  return (
    <div className='px-20 pt-20'>
      
      
      <div className='grid gap-3 mb-10'>
        <h1 className='text-3xl font-semibold'>{POSTS_CONST.title}</h1>
        <p className='text-gray-700 text-lg'>{POSTS_CONST.subTitle}</p>
      </div>

     
      {data?.posts && users?.users && comments?.comments && <DataTable posts={data?.posts} users={userMap} comments={commentsMap}/>}
    </div>
  )
}

export default UserPage