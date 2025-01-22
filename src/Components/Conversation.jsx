import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import Message from './Message'
import { useEffect, useState } from 'react'

const Conversation = ({ friend, inputValue, inputHandler, sendButtonHandler }) => {

    // const [messages, setMessages] = useState(conversation)

    const messagesList = friend.messages.map(message => <Message key={message.id} {...message} user={message.userID === 0 ? true : false} />)

    return (
        <div className="flex flex-col justify-center flex-1 p-4 rounded shadow-xl">
            <div className="py-4">
                <h2 className="text-xl font-bold text-white [text-shadow:_1px_1px_0_rgb(0_0_0_/_40%)]">
                    {friend.firstName} {friend.lastName}
                </h2>
                <span className={`${friend.online ? 'text-green-500' : 'text-gray-800'}`}>{friend.online ? 'online' : 'offline'}</span>
            </div>
            <div className="flex-1 my-2 p-4 rounded bg-white/75">
                {messagesList}
            </div>
            <div className="flex items-center">
                <input id='message' className="rounded flex-1 px-2 py-1 focus-within:outline-none" value={inputValue} onChange={inputHandler} />
                <FontAwesomeIcon icon={inputValue ? faPaperPlane : faThumbsUp} className='px-2 mx-2 text-2xl cursor-pointer text-sky-200' onClick={sendButtonHandler} />
            </div>
        </div>
    )
}

export default Conversation