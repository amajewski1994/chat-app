import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

// eslint-disable-next-line react/prop-types
const Message = ({ image, message, time, user }) => {
    return (
        <div className={`chat ${user ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-header my-1">
                <time className="text-xs opacity-50 m-1">{time}</time>
            </div>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div className={`chat-bubble ${user && 'chat-bubble-primary'}`}>
                {message === 'thumb-up' ? <FontAwesomeIcon icon={faThumbsUp} className='text-2xl text-sky-200' /> : message}
            </div>
        </div>
    )
}

export default Message