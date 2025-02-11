import Friends from "./Friends"
import Conversation from "./Conversation"
import { useEffect, useRef, useState } from "react"
import { useHttpClient } from '../hooks/http-hook';

const DUMMY_LIST = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        image: 'image',
        online: true,
        messages: [
            {
                id: 0,
                userID: 0,
                image: 'image',
                date: '15/01/2024',
                time: '14:00',
                message: 'test message0'
            }, {
                id: 1,
                userID: 0,
                image: 'image',
                date: '15/01/2024',
                time: '14:05',
                message: 'test message1'
            }, {
                id: 2,
                userID: 1,
                image: 'image',
                date: '15/01/2024',
                time: '14:10',
                message: 'test message2'
            }, {
                id: 3,
                userID: 0,
                image: 'image',
                date: '15/01/2024',
                time: '14:20',
                message: 'test message3'
            },
        ]
    }, {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        image: 'image',
        online: false,
        messages: [
            {
                id: 0,
                userID: 2,
                image: 'image',
                date: '15/01/2024',
                time: '14:00',
                message: 'test message15'
            }, {
                id: 1,
                userID: 0,
                image: 'image',
                date: '15/01/2024',
                time: '14:05',
                message: 'test message1'
            }, {
                id: 2,
                userID: 2,
                image: 'image',
                date: '15/01/2024',
                time: '14:10',
                message: 'test message2'
            }, {
                id: 3,
                userID: 0,
                image: 'image',
                date: '15/01/2024',
                time: '14:20',
                message: 'test message3'
            },
        ]
    }, {
        id: 3,
        firstName: 'Robert',
        lastName: 'Doe',
        image: 'image',
        online: true,
        messages: [
            {
                id: 0,
                userID: 3,
                image: 'image',
                date: '15/01/2024',
                time: '14:00',
                message: 'test message0'
            }, {
                id: 1,
                userID: 3,
                image: 'image',
                date: '15/01/2024',
                time: '14:05',
                message: 'test message1'
            }, {
                id: 2,
                userID: 3,
                image: 'image',
                date: '15/01/2024',
                time: '14:10',
                message: 'test message2'
            }, {
                id: 3,
                userID: 0,
                image: 'image',
                date: '15/01/2024',
                time: '14:20',
                message: 'test message3'
            },
        ]
    }, {
        id: 4,
        firstName: 'Will',
        lastName: 'Doe',
        image: 'image',
        online: true,
        messages: [
            {
                id: 0,
                userID: 0,
                image: 'image',
                date: '15/01/2024',
                time: '14:00',
                message: 'test message0'
            }, {
                id: 1,
                userID: 4,
                image: 'image',
                date: '15/01/2024',
                time: '14:05',
                message: 'test message1'
            }
        ]
    },
]

const Home = ({ user, openModal, DUMMY_USER_ID }) => {
    const [activeFriend, setActiveFriend] = useState(null)

    const [friendList, setFriendList] = useState([])
    const [filteredFriendList, setFilteredFriendList] = useState([])

    const [messageInputValue, setMessageInputValue] = useState('')
    const [searchInputValue, setSearchInputValue] = useState('')

    const [messages, setMessages] = useState([])

    const chatRef = useRef(null);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const chengeActiveFriend = (id) => {
        const newActiveFriend = friendList.find(friend => friend._id === id)
        setActiveFriend(newActiveFriend)
        const userMessages = [...user.messages]
        const filteredMessages = userMessages.filter(message => message.recipient === id || message.author === id)
        setMessages(filteredMessages)
    }

    const scrollChat = () => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight
    }

    useEffect(() => {
        if (user) {
            setFriendList(user.friends)
            setFilteredFriendList(user.friends)
        } else {
            setFriendList([])
            setFilteredFriendList([])
            setMessages([])
        }
    }, [user])

    useEffect(() => {
        scrollChat()
    }, [friendList])

    const sendButtonHandler = async (chatRef) => {
        if (!user) return
        const message = messageInputValue ? messageInputValue : 'thumb-up'
        const newMessage = {
            recipient: activeFriend._id,
            value: message
        }
        const request = `http://localhost:5000/api/messages/`;
        try {
            const responseData = await sendRequest(request, 'POST',
                JSON.stringify(newMessage),
                {
                    'Content-Type': 'application/json',
                }
            );
            setMessageInputValue('')
            // const newUser = { ...user }
            // newUser.messages.push(responseData.createdMessage)
            // await setUser(newUser)
            setMessages([...messages, responseData.createdMessage])
            scrollChat(chatRef)
        } catch (err) {
            console.log(err)
        }

        // setFriendList(friendList.map(element => {
        //     if (element.id - 1 === activeID) {
        //         return { ...element, messages: [...element.messages, newMessage] }
        //     } else {
        //         return element
        //     }
        // }))
    }

    const filterFriendList = (value) => {
        const newList = [...friendList]
        const filteredNewList = newList.filter(element => element.firstName.toLowerCase().includes(value) || element.lastName.toLowerCase().includes(value))
        setFilteredFriendList(filteredNewList)
    }

    const inputHandler = (e) => {
        if (e.target.id === 'message') {
            setMessageInputValue(e.target.value)
        } else {
            setSearchInputValue(e.target.value)
            filterFriendList(e.target.value)
        }
    }



    return (
        <div className=" m-8 border rounded bg-slate-200/25 flex justify-between p-2">
            <Friends friends={filteredFriendList} chengeActiveFriend={chengeActiveFriend} inputValue={searchInputValue} inputHandler={inputHandler} openModal={openModal} />
            <Conversation messages={messages} friend={activeFriend} inputValue={messageInputValue} inputHandler={inputHandler} sendButtonHandler={sendButtonHandler} chatRef={chatRef} userId={DUMMY_USER_ID} />
        </div>
    )
}

export default Home