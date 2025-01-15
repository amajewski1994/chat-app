import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import Message from './Message'

const DUMMY_MESSAGES = [
    {
        id: 0,
        userID: 0,
        firstName: 'John',
        lastName: 'Doe',
        image: 'image',
        date: '15/01/2024',
        time: '14:00',
        message: 'test message0'
    }, {
        id: 1,
        userID: 0,
        firstName: 'John',
        lastName: 'Doe',
        image: 'image',
        date: '15/01/2024',
        time: '14:05',
        message: 'test message1'
    }, {
        id: 2,
        userID: 1,
        firstName: 'Jane',
        lastName: 'Doe',
        image: 'image',
        date: '15/01/2024',
        time: '14:10',
        message: 'test message2'
    }, {
        id: 3,
        userID: 0,
        firstName: 'John',
        lastName: 'Doe',
        image: 'image',
        date: '15/01/2024',
        time: '14:20',
        message: 'test message3'
    },
]

const Conversation = ({ online }) => {

    const messages = DUMMY_MESSAGES.map(message => <Message key={message.id} {...message} user={message.userID === 0 ? true : false} />)

    return (
        <div className="flex flex-col justify-center flex-1 p-4 rounded shadow-xl">
            <div className="py-4">
                <h2 className="text-xl font-bold text-white [text-shadow:_1px_1px_0_rgb(0_0_0_/_40%)]">
                    John Doe
                </h2>
                <span className={`${online ? 'text-green-500' : 'text-gray-800'}`}>{online ? 'online' : 'offline'}</span>
            </div>
            <div className="flex-1 my-2 p-4 rounded bg-white/75">
                {messages}
            </div>
            <div className="flex items-center">
                <input className="rounded flex-1 px-2 py-1 focus-within:outline-none" />
                <FontAwesomeIcon icon={faThumbsUp} className='px-2 mx-2 text-2xl cursor-pointer text-sky-200' />
                {/* <FontAwesomeIcon icon={faPaperPlane} className='px-2 mx-2 text-2xl cursor-pointer text-sky-200' /> */}
            </div>
        </div>
    )
}

export default Conversation