/* eslint-disable react/prop-types */
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import SearchForm from './SearchForm'
import Auth from './Auth'
import { useHttpClient } from '../hooks/http-hook';
import LoadingSpinner from '../shared/LoadingSpinner';

const Modal = ({ users, user, searchFriendModal, updateUser, isRegisterForm, modalIn, closeModal, switchModal }) => {

    const [searchFriendList, setSearchFriendList] = useState(false)

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const addFriendHandler = async (friendID) => {
        if (!user) return
        const obj = {
            friendID
        }
        try {
            let request = `${import.meta.env.VITE_BACKEND_URL}/api/users/${user._id}`;
            const responseData = await sendRequest(request, 'PATCH',
                JSON.stringify(obj),
                {
                    'Content-Type': 'application/json',
                    // Authorization: 'Bearer ' + auth.token
                }
            );
            await updateUser(responseData.newFriend)
            await closeModal()
            await setSearchFriendList(false)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className={`w-full h-full absolute left-0 top-0 bg-black/60 transition-all ${modalIn ? 'opacity-100 block' : 'opacity-0 hidden'}`}></div>
            <div className={`${isLoading && 'filter contrast-50'} absolute left-1/2 ${modalIn ? 'top-1/2' : '-top-1/2'} -translate-y-1/2 -translate-x-1/2 bg-slate-100 rounded overflow-hidden transition-all w-[90%] md:w-1/2`}>
                <div className='relative w-full h-full'>
                    <div className='absolute right-4 top-4 cursor-pointer text-2xl transition-all text-white hover:scale-125' onClick={() => {
                        closeModal()
                        setSearchFriendList(false)
                    }}><FontAwesomeIcon icon={faX} /></div>
                    <div className='bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-16 flex items-center'>
                        <h2 className='text-2xl font-bold flex-1 text-center text-amber-100 [text-shadow:_2px_2px_0_rgb(0_0_0_/_40%)]'>{searchFriendModal ? 'ADD FRIEND' : isRegisterForm ? 'REGISTER' : 'LOGIN'}</h2>
                    </div>
                    <div className='my-4'>
                        {searchFriendModal ? <SearchForm users={users} user={user} searchFriendList={searchFriendList} setSearchFriendList={setSearchFriendList} addFriendHandler={addFriendHandler} />
                            :
                            <Auth isRegisterForm={isRegisterForm} switchModal={switchModal} closeModal={closeModal} sendRequest={sendRequest} />
                        }
                    </div>
                </div>
            </div>
            {isLoading && <LoadingSpinner />}
        </>
    )
}

export default Modal