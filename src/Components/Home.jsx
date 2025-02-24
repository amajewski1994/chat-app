import Friends from "./Friends"
import Conversation from "./Conversation"
import { useEffect, useRef, useState } from "react"
import { useHttpClient } from '../hooks/http-hook';

const Home = ({ user, setUser, openModal, userId }) => {
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
            setActiveFriend(null)
        }
    }, [user])

    useEffect(() => {
        scrollChat()
    }, [friendList])

    const sendButtonHandler = async (chatRef) => {
        if (!user) return
        const message = messageInputValue ? messageInputValue : 'thumb-up'
        const newMessage = {
            value: message,
            userId,
            recipient: activeFriend._id,
        }
        const request = `${import.meta.env.VITE_BACKEND_URL}/api/messages/`;
        try {
            const responseData = await sendRequest(request, 'POST',
                JSON.stringify(newMessage),
                {
                    'Content-Type': 'application/json',
                }
            );
            setMessageInputValue('')
            const userClone = await { ...user }
            await userClone.messages.push(responseData.createdMessage)
            await setUser(userClone)
            await setMessages([...messages, responseData.createdMessage])
            await scrollChat(chatRef)
        } catch (err) {
            console.log(err)
        }
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
            <Conversation messages={messages} friend={activeFriend} inputValue={messageInputValue} inputHandler={inputHandler} sendButtonHandler={sendButtonHandler} chatRef={chatRef} userId={userId} />
        </div>
    )
}

export default Home