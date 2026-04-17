/* eslint-disable react/prop-types */
import { useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../context/auth-context'
import Message from './Message'
import LoadingSpinner from "../shared/LoadingSpinner"

const Conversation = ({
    messages,
    friend,
    inputValue,
    inputHandler,
    sendButtonHandler,
    chatRef,
    userId,
    isLoading
}) => {
    const auth = useContext(AuthContext)

    const messagesList =
        messages.length > 0 &&
        messages.map((message, index) => (
            <Message
                key={index}
                {...message}
                prevMessage={messages[index - 1]}
                friend={friend}
                user={message.author === userId}
            />
        ))

    return (
        <section className="flex min-h-[300px] md:min-h-0 flex-1 flex-col rounded-3xl border border-slate-200/60 bg-white p-4 shadow-xl backdrop-blur md:p-5">
            <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                {friend ? (
                    <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                            <h2 className="truncate text-xl font-bold text-slate-800">
                                {friend.firstName} {friend.lastName}
                            </h2>
                            <span
                                className={`mt-1 block text-sm font-medium ${auth.onlineUsers.includes(friend._id)
                                    ? 'text-emerald-600'
                                    : 'text-slate-500'
                                    }`}
                            >
                                {auth.onlineUsers.includes(friend._id) ? 'online' : 'offline'}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Conversation</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Select a friend to start chatting.
                        </p>
                    </div>
                )}
            </div>

            <div className="min-h-0 flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div
                    ref={chatRef}
                    className="h-full w-full overflow-y-auto no-scrollbar px-3 py-4 md:px-4"
                >
                    {friend ? (
                        messages.length > 0 ? (
                            messagesList
                        ) : (
                            <div className="flex h-full min-h-[220px] items-center justify-center text-center">
                                <div>
                                    <p className="text-base font-semibold text-slate-700">
                                        No messages yet
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Send the first message to start the conversation.
                                    </p>
                                </div>
                            </div>
                        )
                    ) : (
                        <div className="flex h-full min-h-[220px] items-center justify-center text-center">
                            <div>
                                <p className="text-base font-semibold text-slate-700">
                                    Choose a friend
                                </p>
                                <p className="mt-1 text-sm text-slate-500">
                                    Your messages will appear here.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
                <input
                    id="message"
                    placeholder={friend ? 'Write a message...' : 'Select a friend first'}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
                    value={inputValue}
                    onChange={inputHandler}
                    disabled={!friend}
                />

                <button
                    type="button"
                    onClick={sendButtonHandler}
                    disabled={!friend || isLoading}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300"
                    aria-label={inputValue ? 'Send message' : 'Send thumbs up'}
                >
                    {isLoading ? (
                        <LoadingSpinner absolute={false} className="mx-0" />
                    ) : (
                        <FontAwesomeIcon icon={inputValue ? faPaperPlane : faThumbsUp} />
                    )}
                </button>
            </div>
        </section>
    )
}

export default Conversation