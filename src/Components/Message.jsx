/* eslint-disable react/prop-types */

const Message = ({ value, author, prevMessage, friend, user }) => {
    const isSameAuthor = prevMessage && prevMessage.author === author

    return (
        <div
            className={`flex w-full ${user ? 'justify-end' : 'justify-start'
                } ${isSameAuthor ? 'mt-1' : 'mt-4'}`}
        >
            <div
                className={`flex max-w-[75%] items-end gap-2 ${user ? 'flex-row-reverse' : 'flex-row'
                    }`}
            >
                {!user && !isSameAuthor && (
                    <img
                        src={`https://chat-app-andrev.s3.eu-central-1.amazonaws.com/${friend?.image}`}
                        alt="avatar"
                        className="h-8 w-8 rounded-full object-cover"
                    />
                )}

                <div
                    className={`px-4 py-2.5 text-sm md:text-base ${user
                        ? 'rounded-2xl rounded-br-md bg-blue-600 text-white'
                        : 'rounded-2xl rounded-bl-md bg-slate-200 text-slate-800'
                        }`}
                >
                    {value === 'thumb-up' ? '👍' : value}
                </div>
            </div>
        </div>
    )
}

export default Message