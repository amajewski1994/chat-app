/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faCheck } from '@fortawesome/free-solid-svg-icons'

const SearchForm = ({ users, user, setSearchFriendList, searchFriendList, addFriendHandler }) => {
    const filterList = (value) => {
        const newList = [...users]

        if (!value) return setSearchFriendList([])

        const filteredList = newList.filter(
            (element) =>
                (element.firstName.toLowerCase().includes(value.toLowerCase()) ||
                    element.lastName.toLowerCase().includes(value.toLowerCase())) &&
                user._id !== element._id
        )

        setSearchFriendList(filteredList)
    }

    const searchNewFriendHandler = (e) => {
        e.preventDefault()
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
                return false
            }
        }
        return true
    }

    const searchFriends =
        searchFriendList &&
        searchFriendList.map((element, index) => {
            const canAdd = checkIfCanAddFriend(element._id)

            return (
                <li
                    className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-slate-300 hover:shadow-md"
                    key={index}
                >
                    <div className="min-w-0">
                        <p className="truncate text-base font-semibold text-slate-800">
                            {element.firstName} {element.lastName}
                        </p>
                        <p className="truncate text-sm text-slate-500">
                            {canAdd ? 'Available to add' : 'Already in your friends list'}
                        </p>
                    </div>

                    {canAdd ? (
                        <button
                            type="button"
                            onClick={() => {
                                addFriendHandler(element._id, setSearchFriendList)
                            }}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
                            aria-label={`Add ${element.firstName} ${element.lastName}`}
                        >
                            <FontAwesomeIcon icon={faUserPlus} />
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-600">
                            <FontAwesomeIcon icon={faCheck} />
                            <span className="hidden sm:inline">Added</span>
                        </div>
                    )}
                </li>
            )
        })

    return (
        <div className="mx-auto w-full max-w-2xl">
            <form
                className="flex flex-col gap-4 md:flex-row"
                onSubmit={searchNewFriendHandler}
            >
                <input
                    name="search"
                    placeholder="Search by first or last name"
                    type="text"
                    className="w-full flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

                <button
                    type="submit"
                    className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 active:scale-[0.99] md:w-auto md:min-w-[160px]"
                >
                    Search
                </button>
            </form>

            {searchFriendList && (
                <div className="mt-6">
                    {searchFriendList.length > 0 ? (
                        <ul className="flex list-none flex-col gap-3 p-0">
                            {searchFriends}
                        </ul>
                    ) : (
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 text-center">
                            <p className="text-lg font-semibold text-slate-700">No users found</p>
                            <p className="mt-1 text-sm text-slate-500">
                                Try a different first name or last name.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchForm