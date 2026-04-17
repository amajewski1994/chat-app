/* eslint-disable react/prop-types */
import { useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../context/auth-context'
import FriendRow from './FriendRow'

const Friends = ({
    friends,
    chengeActiveFriend,
    inputValue,
    inputHandler,
    openModal,
    activeFriend,
    friendsOpen,
    setFriendsOpen
}) => {
    const auth = useContext(AuthContext)

    const list = friends.map((element, index) => (
        <FriendRow
            key={index}
            {...element}
            online={auth.onlineUsers.includes(element._id)}
            chengeActiveFriend={chengeActiveFriend}
            isActive={activeFriend?._id === element._id}
        />
    ))

    return (
        <aside className="w-full rounded-3xl border border-slate-200/60 bg-white/95 p-4 shadow-xl backdrop-blur md:flex md:w-[320px] md:min-w-[320px] md:flex-col">
            <div className="flex items-center justify-between gap-3">
                <button
                    type="button"
                    onClick={() => setFriendsOpen(prev => !prev)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left md:pointer-events-none"
                >
                    <div className="min-w-0">
                        <h2 className="text-2xl font-bold text-slate-800">Friends</h2>
                        <p className="text-sm text-slate-500">
                            {friends.length} {friends.length === 1 ? 'contact' : 'contacts'}
                        </p>
                    </div>

                    <span
                        className={`ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition md:hidden ${friendsOpen ? 'rotate-180' : ''
                            }`}
                    >
                        <FontAwesomeIcon icon={faChevronDown} />
                    </span>
                </button>

                <button
                    id="newFriendButton"
                    onClick={openModal}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition hover:bg-blue-700 active:scale-[0.98]"
                    aria-label="Add friend"
                >
                    <FontAwesomeIcon className="pointer-events-none" icon={faUserPlus} />
                </button>
            </div>

            <div className={`${friendsOpen ? 'mt-4 block' : 'hidden'} md:mt-4 md:block`}>
                <div className="mb-4">
                    <input
                        id="search"
                        type="text"
                        placeholder="Search friends"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        value={inputValue}
                        onChange={inputHandler}
                    />
                </div>

                <div className="max-h-[38dvh] overflow-y-auto md:max-h-none md:flex-1">
                    {friends.length > 0 ? (
                        <ul className="flex flex-col gap-2">
                            {list}
                        </ul>
                    ) : (
                        <div className="flex min-h-[160px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 text-center">
                            <div>
                                <p className="text-base font-semibold text-slate-700">No friends found</p>
                                <p className="mt-1 text-sm text-slate-500">
                                    Try another search or add a new friend.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    )
}

export default Friends