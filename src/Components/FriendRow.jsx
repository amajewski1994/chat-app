/* eslint-disable react/prop-types */
const FriendRow = ({
    _id,
    image,
    firstName,
    lastName,
    online,
    chengeActiveFriend,
    isActive
}) => {
    const clickHandler = () => {
        chengeActiveFriend(_id)
    }

    return (
        <li
            className={`group flex min-w-[220px] cursor-pointer items-center gap-3 rounded-2xl border p-3 transition-all md:min-w-0 ${isActive
                ? 'border-blue-200 bg-blue-50 shadow-sm'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
            onClick={clickHandler}
        >
            <div className="relative shrink-0">
                <img
                    src={`https://chat-app-andrev.s3.eu-central-1.amazonaws.com/${image}`}
                    alt="avatar"
                    className="h-14 w-14 rounded-full object-cover"
                />
                <span
                    className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${online ? 'bg-emerald-500' : 'bg-slate-300'
                        }`}
                ></span>
            </div>

            <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-slate-800 md:text-base">
                    {firstName} {lastName}
                </div>
                <div className={`text-sm ${online ? 'text-emerald-600' : 'text-slate-500'}`}>
                    {online ? 'online' : 'offline'}
                </div>
            </div>
        </li>
    )
}

export default FriendRow