// eslint-disable-next-line react/prop-types
const FriendRow = ({ image, firstName, lastName, online }) => {
    return (
        <li className="flex text-start items-center cursor-pointer transition-all rounded my-2 hover:bg-slate-200/25">
            <div className="p-2">
                <img src={'../../public/bg-image.jpg'} alt='avatar' className="w-10 h-10 rounded-full"/>
            </div>
            <div className="p-2">
                <div className="text-white [text-shadow:_1px_1px_0_rgb(0_0_0_/_40%)]">{firstName} {lastName}</div>
                <div className={`${online ? 'text-green-500' : 'text-gray-800'}`}>{online ? 'online' : 'offline'}</div>
            </div>
        </li>
    )
}

export default FriendRow