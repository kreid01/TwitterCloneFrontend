import { Tweets } from 'features/Profile/Tweets';
import { ProfilePageHead, User } from 'features/ProfilePageHead';
import React from 'react';
import { useParams } from 'react-router-dom'
 
import { useGetUser } from 'hooks/useGetUser';

export const ProfilePage: React.FC = () => {

    const { id } = useParams()
    const { user, loading, error } = useGetUser(id as string)
    
    if(user) {

    return (
        <>
            <ProfilePageHead 
            user={user as User}/>
        </>
    )
} else {return <p>loading</p>}}