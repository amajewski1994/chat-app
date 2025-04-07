import { useContext, useState, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../context/auth-context';
import FriendRow from './FriendRow'

const Friends = ({ friends, chengeActiveFriend, inputValue, inputHandler, openModal }) => {

    const [translateX, setTranslateX] = useState(0)
    const [startTranslateX, setStartTranslateX] = useState(0)
    const [touchStartValue, setTouchStartValue] = useState(0)

    const auth = useContext(AuthContext);

    const friendsRef = useRef(null);

    const list = friends.map((element, index) => <FriendRow key={index} {...element} online={auth.onlineUsers.includes(element._id)} chengeActiveFriend={chengeActiveFriend} />)

    const touchStartHandler = (e) => {
        const value = e.touches[0].clientX
        setTouchStartValue(value)
        setStartTranslateX(translateX)
    }

    const touchMoveHandler = (e) => {
        const value = e.touches[0].clientX
        const difference = Math.floor(value - touchStartValue)
        const newTranslateX = startTranslateX + difference

        const min = -25 - ((friends.length - 5) * 66)
        const max = 0
        if (newTranslateX > max || newTranslateX < min || friends.length < 5) return
        setTranslateX(newTranslateX)

    }

    const touchEndHandler = (e) => {
        setTouchStartValue(0)
    }

    return (
        <div className="p-2 w-full text-center md:w-1/3 lg:w-1/4">
            <h2 className="text-2xl font-bold flex-1 text-center text-white [text-shadow:_1px_1px_0_rgb(0_0_0_/_40%)]">Friends</h2>
            <div className="flex justify-center items-center py-2">
                <div className="flex-1 px-1">
                    <input id='search' type="text" placeholder="Search" className="rounded w-full px-2 py-1 focus-within:outline-none" value={inputValue} onChange={inputHandler} />
                </div>
                <div id='newFriendButton' onClick={openModal} className="mx-4 text-xl cursor-pointer">
                    <FontAwesomeIcon className='pointer-events-none' icon={faUserPlus} />
                </div>
            </div>
            <div className="overflow-hidden md:h-[71vh]">
                <ul
                    className={`px-[8px] flex box-content md:overflow-y-scroll w-full h-full md:block`}
                    style={{ transform: `translateX(${translateX}px)` }}
                    ref={friendsRef}
                    onTouchStart={(e) => touchStartHandler(e)}
                    onTouchMove={(e) => touchMoveHandler(e)}
                    onTouchEnd={(e) => touchEndHandler(e)}
                >
                    {list}
                </ul>
            </div>
        </div>
    )
}

export default Friends