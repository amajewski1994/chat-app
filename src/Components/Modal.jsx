/* eslint-disable react/prop-types */
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import SearchForm from './SearchForm'
import Auth from './Auth'
import { useHttpClient } from '../hooks/http-hook'
import LoadingSpinner from '../shared/LoadingSpinner'

const Modal = ({
    users,
    user,
    searchFriendModal,
    updateUser,
    isRegisterForm,
    modalIn,
    closeModal,
    switchModal
}) => {
    const [searchFriendList, setSearchFriendList] = useState(false)

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const addFriendHandler = async (friendID) => {
        if (!user) return

        const obj = {
            friendID
        }

        try {
            const request = `${import.meta.env.VITE_BACKEND_URL}/api/users/${user._id}`

            const responseData = await sendRequest(
                request,
                'PATCH',
                JSON.stringify(obj),
                {
                    'Content-Type': 'application/json',
                    // Authorization: 'Bearer ' + auth.token
                }
            )

            await updateUser(responseData.newFriend)
            await closeModal()
            await setSearchFriendList(false)
        } catch (err) {
            console.log(err)
        }
    }

    const closeHandler = () => {
        closeModal()
        setSearchFriendList(false)
        if (error) clearError()
    }

    return (
        <>
            <div
                onClick={closeHandler}
                className={`absolute left-0 top-0 z-40 h-full w-full bg-slate-900/70 backdrop-blur-sm transition-all duration-300 ${modalIn ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none'
                    }`}
            ></div>

            <div
                className={`absolute left-1/2 z-50 w-[92%] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur-md transition-all duration-300 ${isLoading ? 'pointer-events-none contrast-75' : ''
                    } ${modalIn ? 'top-1/2 opacity-100 scale-100 pointer-events-auto' : 'top-[45%] opacity-0 scale-95 pointer-events-none'}`}
            >
                <div className="relative overflow-hidden rounded-3xl">
                    <button
                        onClick={closeHandler}
                        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition hover:scale-105 hover:bg-white/25"
                        aria-label="Close modal"
                    >
                        <FontAwesomeIcon icon={faX} />
                    </button>

                    <div className="bg-gradient-to-r from-slate-800 via-blue-700 to-blue-500 px-6 py-5 md:px-8">
                        <h2 className="pr-12 text-center text-2xl font-bold tracking-wide text-white md:text-3xl">
                            {searchFriendModal
                                ? 'Add Friend'
                                : isRegisterForm
                                    ? 'Create Account'
                                    : 'Welcome Back'}
                        </h2>

                        <p className="mt-1 text-center text-sm text-blue-100 md:text-base">
                            {searchFriendModal
                                ? 'Search for users and add new friends.'
                                : isRegisterForm
                                    ? 'Set up your account and start chatting.'
                                    : 'Log in to continue to your account.'}
                        </p>
                    </div>

                    <div className="bg-slate-50 px-4 py-5 md:px-6 md:py-6">
                        {error && (
                            <div className="mx-auto mb-4 w-full max-w-2xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                                <div className="flex items-start justify-between gap-3">
                                    <span>{error}</span>
                                    <button
                                        onClick={clearError}
                                        className="shrink-0 font-semibold text-red-500 transition hover:text-red-700"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}

                        {searchFriendModal ? (
                            <SearchForm
                                users={users}
                                user={user}
                                searchFriendList={searchFriendList}
                                setSearchFriendList={setSearchFriendList}
                                addFriendHandler={addFriendHandler}
                            />
                        ) : (
                            <Auth
                                isRegisterForm={isRegisterForm}
                                switchModal={switchModal}
                                closeModal={closeModal}
                                sendRequest={sendRequest}
                            />
                        )}
                    </div>
                </div>
            </div>

            {isLoading && <LoadingSpinner />}
        </>
    )
}

export default Modal