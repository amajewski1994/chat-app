import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faUserPlus } from '@fortawesome/free-solid-svg-icons'

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

const Modal = ({ searchFriendModal, isRegisterForm, modalIn, closeModal, switchModal }) => {

    const [formValidity, setFormValidity] = useState(true)
    const [imageSrc, setImageSrc] = useState(false)
    const [searchFriendList, setSearchFriendList] = useState(false)

    const form = useRef(null)

    const imageHandler = (e) => {
        if (!e.target.files || !e.target.files[0]) return setImageSrc(false)
        setImageSrc(URL.createObjectURL(e.target.files[0]))
    }

    const submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const payload = Object.fromEntries(formData)

        for (let [key, value] of formData.entries()) {
            if (!value || (key === 'image' && !value.type.includes('image'))) {
                setFormValidity(false)
                setTimeout(() => {
                    setFormValidity(true)
                }, 2000)
                return;
            }
        }
        e.currentTarget.reset()
        setImageSrc(false)

        console.log(payload)
    }

    const filterList = (value) => {
        const newList = [...DUMMY_LIST]
        if (!value) return setSearchFriendList([])
        const filteredList = newList.filter(element => element.firstName.toLowerCase().includes(value.toLowerCase()) || element.lastName.toLowerCase().includes(value.toLowerCase()))
        setSearchFriendList(filteredList)
    }

    const searchNewFriendHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const payload = Object.fromEntries(formData)
        if (!payload.search) return setSearchFriendList([])
        e.currentTarget.reset()
        filterList(payload.search)
    }

    const searchFriends = searchFriendList && searchFriendList.map((element, index) => {
        return <li className='flex justify-between my-2' key={index}>
            <span>{element.firstName} {element.lastName}</span>
            <FontAwesomeIcon className='cursor-pointer text-blue-600' icon={faUserPlus} />
        </li>
    })

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
                        {searchFriendModal ? <div className='p-4'>
                            <form className='flex justify-between' onSubmit={searchNewFriendHandler}>
                                <input name='search' type='text' className='flex-1 mx-2 rounded w-full px-2 py-1 focus-within:outline-none' />
                                <button
                                    type='submit'
                                    className='mx-2 bg-blue-500 text-white p-2 font-semibold rounded w-1/3'
                                >SEARCH</button>
                            </form>
                            {searchFriendList && <ul className='p-2 mt-4 list-none'>
                                {searchFriendList.length > 0 ? searchFriends : <div className='text-center text-2xl'>Empty list</div>}
                            </ul>}
                        </div>
                            :
                            <form ref={form} className='flex flex-wrap justify-around' onSubmit={submitForm}>
                                {isRegisterForm && <div className='text-center w-1/3 m-4'>
                                    <label className='block'>First Name</label>
                                    <input type='text' name='firstName' className='rounded w-full px-2 py-1 focus-within:outline-none' />
                                </div>}
                                {isRegisterForm && <div className='text-center w-1/3 m-4'>
                                    <label className='block'>Last Name</label>
                                    <input type='text' name='lastName' className='rounded w-full px-2 py-1 focus-within:outline-none' />
                                </div>}
                                <div className='text-center w-1/3 m-4'>
                                    <label className='block'>Email</label>
                                    <input type='email' name='email' className='rounded w-full px-2 py-1 focus-within:outline-none' />
                                </div>
                                <div className='text-center w-1/3 m-4'>
                                    <label className='block'>Password</label>
                                    <input type='password' name='password' minLength={5} className='rounded w-full px-2 py-1 focus-within:outline-none' />
                                </div>
                                {isRegisterForm && <div className='text-center w-full m-4 '>
                                    <label className='block'>Image</label>
                                    <div className='bg-white w-60 h-60 m-auto relative rounded'>
                                        {imageSrc ? <img className='pointer-events-none w-full h-full' src={imageSrc} alt='image' /> :
                                            <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>PICK AN IMAGE</span>}
                                        <input name='image' type='file' onChange={imageHandler} className='absolute top-0 left-0 w-full h-full opacity-0' />
                                    </div>
                                </div>}
                                <div className='text-center w-full m-4 relative'>
                                    <p className={`text-red-500 absolute left-1/2 -top-3 -translate-x-1/2 -translate-y-1/2 font-semibold ${formValidity ? 'hidden' : 'block'}`}>Fill out the form</p>
                                    <button className='bg-blue-500 text-white p-2 font-semibold rounded w-1/3'>SUBMIT</button>
                                </div>
                                <div>
                                    Switch to <span
                                        className='text-cyan-500 cursor-pointer font-bold'
                                        onClick={() => {
                                            form.current.reset()
                                            setImageSrc(false)
                                            switchModal()
                                        }}
                                    >
                                        {isRegisterForm ? 'login' : 'register'}
                                    </span>
                                </div>
                            </form>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal