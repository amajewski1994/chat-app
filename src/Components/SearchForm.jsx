/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

const SearchForm = ({ DUMMY_LIST, setSearchFriendList, searchFriendList }) => {

    const filterList = (value) => {
        const newList = [...DUMMY_LIST]
        if (!value) return setSearchFriendList([])
        const filteredList = newList.filter(element => element.firstName.toLowerCase().includes(value.toLowerCase()) || element.lastName.toLowerCase().includes(value.toLowerCase()))
        setSearchFriendList(filteredList)
    }

    const searchNewFriendHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const payload = Object.fromEntries(formData)
        if (!payload.search) return setSearchFriendList([])
        e.currentTarget.reset()
        filterList(payload.search)
    }

    const searchFriends = searchFriendList && searchFriendList.map((element, index) => {
        return <li className='flex justify-between my-2' key={index}>
            <span>{element.firstName} {element.lastName}</span>
            <FontAwesomeIcon className='cursor-pointer text-blue-600' icon={faUserPlus} />
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