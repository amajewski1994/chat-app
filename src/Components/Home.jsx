import Friends from "./Friends"
import Conversation from "./Conversation"
import { useState } from "react"

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

const Home = () => {
    const [activeID, setActiveID] = useState(0)
    const [friendList, setFriendList] = useState(DUMMY_LIST)
    const [filteredFriendList, setFilteredFriendList] = useState(DUMMY_LIST)
    const [messageInputValue, setMessageInputValue] = useState('')
    const [searchInputValue, setSearchInputValue] = useState('')

    const chengeActiveFriend = (id) => {
        setActiveID(id - 1)
    }

    const sendButtonHandler = () => {
        const message = messageInputValue ? messageInputValue : 'thumb-up'
        const newMessage = {
            id: friendList[activeID].messages.length,
            userID: 0,
            image: 'image',
            date: '15/01/2024',
            time: '14:00',
            message
        }

        setFriendList(friendList.map(element => {
            if (element.id - 1 === activeID) {
                return { ...element, messages: [...element.messages, newMessage] }
            } else {
                return element
            }
        }))

        setMessageInputValue('')
    }

    const filterFriendList = (value) => {
        const newDUMMYLIST = [...friendList]
        const filteredNewDummyList = newDUMMYLIST.filter(element => element.firstName.toLowerCase().includes(value) || element.lastName.toLowerCase().includes(value))
        setFilteredFriendList(filteredNewDummyList)
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
        <div className=" m-4 border rounded bg-slate-200/25 flex justify-between p-2">
            <Friends friends={filteredFriendList} chengeActiveFriend={chengeActiveFriend} inputValue={searchInputValue} inputHandler={inputHandler} />
            <Conversation friend={friendList[activeID]} inputValue={messageInputValue} inputHandler={inputHandler} sendButtonHandler={sendButtonHandler} />
        </div>
    )
}

export default Home