import Friends from "./Friends"
import Conversation from "./Conversation"
import { useEffect, useRef, useState } from "react"
import { useHttpClient } from '../hooks/http-hook';

const Home = ({ user, openModal, userId, allUserMessages, setAllUserMessages, filteredMessages, filterMessages, activeFriend, setActiveFriend, chatRef, scrollChat }) => {
    const [friendList, setFriendList] = useState([])
    const [filteredFriendList, setFilteredFriendList] = useState([])

    const [messageInputValue, setMessageInputValue] = useState('')
    const [searchInputValue, setSearchInputValue] = useState('')

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const chengeActiveFriend = async (id) => {
        const newActiveFriend = friendList.find(friend => friend._id === id)
        await setActiveFriend(newActiveFriend)
        await filterMessages(id)
        await scrollChat()
    }

    useEffect(() => {
        if (user) {
            setFriendList(user.friends)
            setFilteredFriendList(user.friends)
        } else {
            setFriendList([])
            setFilteredFriendList([])
            setAllUserMessages([])
            setActiveFriend(null)
        }
    }, [user])

    useEffect(() => {
        scrollChat()
    }, [friendList])

    const sendButtonHandler = async () => {
        if (!user || !activeFriend) return
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
            await setAllUserMessages([...allUserMessages, responseData.createdMessage])
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
        <div className="m-8 border rounded bg-slate-200/25 flex justify-between p-2 flex-col md:flex-row">
            <Friends friends={filteredFriendList} chengeActiveFriend={chengeActiveFriend} inputValue={searchInputValue} inputHandler={inputHandler} openModal={openModal} />
            <Conversation messages={filteredMessages} friend={activeFriend} inputValue={messageInputValue} inputHandler={inputHandler} sendButtonHandler={sendButtonHandler} chatRef={chatRef} userId={userId} />
        </div>
    )
}

export default Home