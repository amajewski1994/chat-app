import { useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../context/auth-context';

// eslint-disable-next-line react/prop-types
const Message = ({ value, createdAt, user, friend }) => {

    const date = new Date(createdAt)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const auth = useContext(AuthContext);
    // const seconds = date.getSeconds()
    const time = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`

    return (
        <div className={`chat ${user ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-header my-1">
                <time className="text-xs opacity-50 m-1">{time}</time>
            </div>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src={`https://chat-app-andrev.s3.eu-central-1.amazonaws.com/${user ? auth.avatar : friend.image}`} />
                </div>
            </div>
            <div className={`chat-bubble ${user && 'chat-bubble-primary'}`}>
                {value === 'thumb-up' ? <FontAwesomeIcon icon={faThumbsUp} className='text-2xl text-sky-200' /> : value}
            </div>
        </div>
    )
}

export default Message