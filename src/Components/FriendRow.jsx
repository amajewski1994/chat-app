// eslint-disable-next-line react/prop-types
const FriendRow = ({ _id, image, firstName, lastName, online, chengeActiveFriend }) => {

    const clickHandler = () => {
        chengeActiveFriend(_id)
    }

    return (
        <li className="flex text-start items-center cursor-pointer transition-all rounded my-2 md:hover:bg-slate-200/25" onClick={clickHandler}>
            <div className="py-2 pr-4 pl-0 md:p-2">
                <img src={`https://chat-app-andrev.s3.eu-central-1.amazonaws.com/${image}`} alt='avatar' className="w-[50px] h-[50px] max-w-none max-h-none rounded-full object-cover" />
            </div>
            <div className="p-2 hidden md:block">
                <div className="text-white [text-shadow:_1px_1px_0_rgb(0_0_0_/_40%)]">{firstName} {lastName}</div>
                <div className={`${online ? 'text-green-500' : 'text-gray-800'}`}>{online ? 'online' : 'offline'}</div>
            </div>
        </li>
    )
}

export default FriendRow