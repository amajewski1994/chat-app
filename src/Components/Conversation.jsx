import { useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../context/auth-context';
import Message from './Message'

const Conversation = ({ messages, friend, inputValue, inputHandler, sendButtonHandler, chatRef, userId }) => {

    const auth = useContext(AuthContext);

    const messagesList = messages.length > 0 && messages.map((message, index) => <Message key={index} {...message} prevMessage={messages[index - 1] } friend={friend} user={message.author === userId ? true : false} />)

    return (
        <div className="flex flex-col justify-center flex-1 p-4 rounded shadow-xl">
            <div className="py-2">
                <h2 className="text-xl font-bold text-white [text-shadow:_1px_1px_0_rgb(0_0_0_/_40%)] min-h-7">
                    {friend && `${friend.firstName} ${friend.lastName}`}
                </h2>
                <span className={`block min-h-6 ${friend && auth.onlineUsers.includes(friend._id) ? 'text-green-500' : 'text-gray-800'}`}>{friend && (auth.onlineUsers.includes(friend._id) ? 'online' : 'offline')}</span>
            </div>
            <div className="my-2 py-2 rounded bg-white/75 h-[65vh] overflow-hidden">
                <div ref={chatRef} className={`px-[8px] overflow-y-scroll w-full h-full box-content`}>
                    {friend && messagesList}
                </div>
            </div>
            <div className="flex items-center">
                <input id='message' className="rounded flex-1 px-2 py-1 focus-within:outline-none" value={inputValue} onChange={inputHandler} />
                <FontAwesomeIcon icon={inputValue ? faPaperPlane : faThumbsUp} className='px-2 mx-2 text-2xl cursor-pointer text-sky-200' onClick={() => sendButtonHandler(chatRef)} />
            </div>
        </div>
    )
}

export default Conversation