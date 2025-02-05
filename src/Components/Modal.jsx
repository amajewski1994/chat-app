/* eslint-disable react/prop-types */
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import SearchForm from './SearchForm'
import Auth from './Auth'

const DUMMY_LIST = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        image: 'image',
    }, {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        image: 'image',
    }, {
        id: 3,
        firstName: 'Robert',
        lastName: 'Doe',
        image: 'image',
    }, {
        id: 4,
        firstName: 'Will',
        lastName: 'Doe',
        image: 'image',
    },
    {
        id: 5,
        firstName: 'Stephen',
        lastName: 'Wright',
        image: 'image',
    },
    {
        id: 6,
        firstName: 'John',
        lastName: 'Wright',
        image: 'image',
    },
    {
        id: 7,
        firstName: 'Will',
        lastName: 'Wright',
        image: 'image',
    },
]

const Modal = ({ users, user, searchFriendModal, isRegisterForm, modalIn, closeModal, switchModal }) => {

    const [searchFriendList, setSearchFriendList] = useState(false)

    return (
        <>
            <div className={`w-full h-full absolute left-0 top-0 bg-black/60 transition-all ${modalIn ? 'opacity-100 block' : 'opacity-0 hidden'}`}></div>
            <div className={`absolute left-1/2 ${modalIn ? 'top-1/2' : '-top-1/2'} w-1/2 -translate-y-1/2 -translate-x-1/2 bg-slate-100 rounded overflow-hidden transition-all`}>
                <div className='relative w-full h-full'>
                    <div className='absolute right-4 top-4 cursor-pointer text-2xl transition-all text-white hover:scale-125' onClick={() => {
                        closeModal()
                        setSearchFriendList(false)
                    }}><FontAwesomeIcon icon={faX} /></div>
                    <div className='bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-16 flex items-center'>
                        <h2 className='text-2xl font-bold flex-1 text-center text-amber-100 [text-shadow:_2px_2px_0_rgb(0_0_0_/_40%)]'>{searchFriendModal ? 'ADD FRIEND' : isRegisterForm ? 'REGISTER' : 'LOGIN'}</h2>
                    </div>
                    <div className='my-4'>
                        {searchFriendModal ? <SearchForm users={users} user={user} searchFriendList={searchFriendList} setSearchFriendList={setSearchFriendList} closeModal={closeModal} />
                            :
                            <Auth isRegisterForm={isRegisterForm} switchModal={switchModal} closeModal={closeModal} />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal