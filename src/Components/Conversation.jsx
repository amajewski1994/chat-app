import { useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../context/auth-context';
import Message from './Message'
import LoadingSpinner from "../shared/LoadingSpinner";

const Conversation = ({ messages, friend, inputValue, inputHandler, sendButtonHandler, chatRef, userId, isLoading }) => {

    const auth = useContext(AuthContext);

    const messagesList = messages.length > 0 && messages.map((message, index) => <Message key={index} {...message} prevMessage={messages[index - 1]} friend={friend} user={message.author === userId ? true : false} />)

    return (
        <div className="flex flex-col justify-center flex-1 rounded shadow-xl px-2 md:p-4 ">
            <div className={`${friend ? 'block' : 'hidden'} md:block md:py-2`}>
                <h2 className="text-lg font-bold text-white [text-shadow:_1px_1px_0_rgb(0_0_0_/_40%)] min-h-7 md:text-xl">
                    {friend && `${friend.firstName} ${friend.lastName}`}
                </h2>
                <span className={`block min-h-6 ${friend && auth.onlineUsers.includes(friend._id) ? 'text-green-500' : 'text-gray-800'}`}>{friend && (auth.onlineUsers.includes(friend._id) ? 'online' : 'offline')}</span>
            </div>
            <div className="my-2 py-2 rounded bg-white/75 h-[40vh] overflow-hidden md:h-[65vh]">
                <div ref={chatRef} className={`px-[8px] overflow-y-scroll w-full h-full box-content`}>
                    {friend && messagesList}
                </div>
            </div>
            <div className="flex items-center justify-between">
                <input id='message' className="rounded px-2 py-1 flex-1 focus-within:outline-none" value={inputValue} onChange={inputHandler} />
                <div className="w-12">
                    {isLoading ? <LoadingSpinner absolute={false} className='mx-2' /> : <FontAwesomeIcon icon={inputValue ? faPaperPlane : faThumbsUp} className='px-2 mx-2 text-2xl cursor-pointer text-sky-200' onClick={sendButtonHandler} />}
                </div>
            </div>
        </div>
    )
}

export default Conversation