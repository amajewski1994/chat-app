/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useHttpClient } from '../hooks/http-hook';

const SearchForm = ({ users, user, setSearchFriendList, searchFriendList, closeModal }) => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const filterList = (value) => {
        const newList = [...users]
        if (!value) return setSearchFriendList([])
        const filteredList = newList.filter(element => element.firstName.toLowerCase().includes(value.toLowerCase()) || element.lastName.toLowerCase().includes(value.toLowerCase()))
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

    const addFriendHandler = async (friendID) => {
        if (!user) return
        const obj = {
            friendID
        }
        try {
            let request = `http://localhost:5000/api/users/${user._id}`;
            // let request = `${process.env.REACT_APP_BACKEND_URL}/${props.request}`;
            await sendRequest(request, 'PATCH',
                JSON.stringify(obj),
                {
                    'Content-Type': 'application/json',
                    // Authorization: 'Bearer ' + auth.token
                }
            );

            await closeModal()
        } catch (err) {
            console.log(err);
        }
    }

    const searchFriends = searchFriendList && searchFriendList.map((element, index) => {
        return <li className='flex justify-between my-2' key={index}>
            <span>{element.firstName} {element.lastName}</span>
            <FontAwesomeIcon onClick={() => addFriendHandler(element._id)} className={`cursor-pointer text-blue-600 ${checkIfCanAddFriend(element._id) ? 'block' : 'hidden'}`} icon={faUserPlus} />
        </li>
    })

    return (
        <div className='p-4'>
            <form className='flex justify-between' onSubmit={searchNewFriendHandler}>
                <input name='search' type='text' className='flex-1 mx-2 rounded w-full px-2 py-1 focus-within:outline-none' />
                <button
                    type='submit'
                    className='mx-2 bg-blue-500 text-white p-2 font-semibold rounded w-1/3'
                >SEARCH</button>
            </form>
            {searchFriendList && <ul className='p-2 mt-4 list-none'>
                {searchFriendList.length > 0 ? searchFriends : <div className='text-center text-2xl'>Empty list</div>}
            </ul>}
        </div>
    )
}

export default SearchForm