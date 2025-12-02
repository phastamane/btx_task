'use client'
import { Input } from '@heroui/react'
import { SearchIcon } from '@/components/icons/SideBarIcons'
import DataTable from '@/components/ui/Table'
import { PostService } from '@/services/post.servise'
import { UsersService } from '@/services/users.servise'
import { UserInterface } from '@/types/users'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

function UserPage() {

        const { isLoading: isLoadingPosts, isError: isErrorPosts, data, error: errorPosts } = useQuery({
        queryKey: ['post'], 
        queryFn: PostService.getAll
    });

    const { isLoading: isLoadingUsers, isError: isErrorUsers, data: users, error: errorUsers } = useQuery({
        queryKey: ['users'], 
        queryFn: UsersService.getAll
    });
    // console.log("Users: ",users)
    // console.log('posts: ', data?.posts)
    const userMap = useMemo(() => {
      const map = new Map()
      users?.users?.forEach((el: UserInterface) => map.set(el?.id, el))
      return map
    },[users])

  return (
    <div className='px-20 pt-20'>
      
      
      <div className='grid gap-3 mb-10'>
        <h1 className='text-3xl font-semibold'>Публикации</h1>
        <p className='text-gray-700 text-lg'>Управление публикациями пользователя</p>
      </div>

     
      {data?.posts && users?.users && <DataTable posts={data?.posts} users={userMap}/>}
    </div>
  )
}

export default UserPage