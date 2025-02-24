/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

const SearchForm = ({ users, user, setSearchFriendList, searchFriendList, addFriendHandler }) => {

    const filterList = (value) => {
        const newList = [...users]
        if (!value) return setSearchFriendList([])
        const filteredList = newList.filter(element => (element.firstName.toLowerCase().includes(value.toLowerCase()) ||
            element.lastName.toLowerCase().includes(value.toLowerCase())) &&
            user._id !== element._id)
        setSearchFriendList(filteredList)
    }

    const searchNewFriendHandler = (e) => {
        e.preventDefault();
        if (!user) return
        const formData = new FormData(e.currentTarget)
        const payload = Object.fromEntries(formData)
        if (!payload.search) return setSearchFriendList([])
        e.currentTarget.reset()
        filterList(payload.search)
    }

    const checkIfCanAddFriend = (id) => {
        for (const friend of user.friends) {
            if (friend._id === id) {
                return false;
            }
        }
        return true
    }

    const searchFriends = searchFriendList && searchFriendList.map((element, index) => {
        return <li className='flex justify-between items-center my-2' key={index}>
            <span>{element.firstName} {element.lastName}</span>
            <FontAwesomeIcon onClick={() => {
                addFriendHandler(element._id, setSearchFriendList)
            }}
                className={`cursor-pointer text-blue-600 ${checkIfCanAddFriend(element._id) ? 'block' : 'hidden'}`}
                icon={faUserPlus}
            />
        </li>
    })

    return (
        <div className='p-4'>
            <form className='flex justify-between flex-col md:flex-row' onSubmit={searchNewFriendHandler}>
                <input name='search' placeholder='Friend name' type='text' className='flex-1 rounded w-full px-2 py-1 focus-within:outline-none' />
                <button
                    type='submit'
                    className='mt-4 mx-0 bg-blue-500 text-white p-1 font-semibold rounded w-full md:w-1/3 md:mt-0 md:mx-2 md:p-2'
                >SEARCH</button>
            </form>
            {searchFriendList && <ul className='p-2 mt-4 list-none'>
                {searchFriendList.length > 0 ? searchFriends : <div className='text-center text-2xl'>Empty list</div>}
            </ul>}
        </div>
    )
}

export default SearchForm