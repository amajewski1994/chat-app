import { useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../context/auth-context';
import FriendRow from './FriendRow'

const Friends = ({ friends, chengeActiveFriend, inputValue, inputHandler, openModal }) => {

    const auth = useContext(AuthContext);

    const list = friends.map((element, index) => <FriendRow key={index} {...element} online={auth.onlineUsers.includes(element._id)} chengeActiveFriend={chengeActiveFriend} />)

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
            <div>
                {/* TO DO SLIDER */}
                <ul className="flex overflow-hidden md:block">
                    {list}
                </ul>
            </div>
        </div>
    )
}

export default Friends