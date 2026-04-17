/* eslint-disable react/prop-types */
import Friends from "./Friends"
import Conversation from "./Conversation"
import { useEffect, useState } from "react"
import { useHttpClient } from '../hooks/http-hook'

const Home = ({
    user,
    openModal,
    userId,
    allUserMessages,
    setAllUserMessages,
    filteredMessages,
    filterMessages,
    activeFriend,
    setActiveFriend,
    chatRef,
    scrollChat
}) => {
    const [friendList, setFriendList] = useState([])
    const [filteredFriendList, setFilteredFriendList] = useState([])

    const [messageInputValue, setMessageInputValue] = useState('')
    const [searchInputValue, setSearchInputValue] = useState('')
    const [friendsOpen, setFriendsOpen] = useState(false)

    const { isLoading, sendRequest } = useHttpClient()

    const chengeActiveFriend = async (id) => {
        const newActiveFriend = friendList.find(friend => friend._id === id)
        setActiveFriend(newActiveFriend)
        await filterMessages(id)
        scrollChat()
        setFriendsOpen(false)
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
    }, [user, setAllUserMessages, setActiveFriend])

    const sendButtonHandler = async () => {
        if (!user || !activeFriend) return

        const message = messageInputValue ? messageInputValue : 'thumb-up'
        const newMessage = {
            value: message,
            userId,
            recipient: activeFriend._id,
        }

        const request = `${import.meta.env.VITE_BACKEND_URL}/api/messages/`

        try {
            const responseData = await sendRequest(
                request,
                'POST',
                JSON.stringify(newMessage),
                {
                    'Content-Type': 'application/json',
                }
            )

            setMessageInputValue('')
            setAllUserMessages([...allUserMessages, responseData.createdMessage])
        } catch (err) {
            console.log(err)
        }
    }

    const filterFriendList = (value) => {
        const normalizedValue = value.toLowerCase()
        const newList = [...friendList]

        const filteredNewList = newList.filter(
            (element) =>
                element.firstName.toLowerCase().includes(normalizedValue) ||
                element.lastName.toLowerCase().includes(normalizedValue)
        )

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
        <div className="mx-auto my-4 flex h-[calc(100dvh-110px)] w-[94%] max-w-7xl flex-col gap-4 md:my-6 md:flex-row md:p-4">
            <Friends
                friends={filteredFriendList}
                chengeActiveFriend={chengeActiveFriend}
                inputValue={searchInputValue}
                inputHandler={inputHandler}
                openModal={openModal}
                activeFriend={activeFriend}
                friendsOpen={friendsOpen}
                setFriendsOpen={setFriendsOpen}
            />

            <Conversation
                messages={filteredMessages}
                friend={activeFriend}
                inputValue={messageInputValue}
                inputHandler={inputHandler}
                sendButtonHandler={sendButtonHandler}
                chatRef={chatRef}
                userId={userId}
                isLoading={isLoading}
                setFriendsOpen={setFriendsOpen}
            />
        </div>
    )
}

export default Home