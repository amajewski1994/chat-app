/* eslint-disable react/prop-types */

import { useContext } from "react"
import { AuthContext } from '../context/auth-context'

const Navbar = ({ openModal }) => {
    const auth = useContext(AuthContext)

    const logoutHandler = () => {
        auth.logout()
    }

    return (
        <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-slate-800/60 backdrop-blur-md">
            <div className="mx-auto flex min-h-[76px] w-[94%] max-w-7xl items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                    <h1 className="text-xl font-bold text-white md:text-2xl">
                        Chat App
                    </h1>
                    <p className="text-sm text-slate-300">
                        Simple, clean messaging experience
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {auth.isLoggedIn && auth.avatar && (
                        <div className="flex items-center gap-3 rounded-full border bg-white/10 border-white/20 px-2 py-1.5">
                            <img
                                src={`https://chat-app-andrev.s3.eu-central-1.amazonaws.com/${auth.avatar}`}
                                alt="avatar"
                                className="h-10 w-10 rounded-full object-cover"
                            />
                            <span className="hidden text-sm font-medium text-slate-200 md:block">
                                You are logged in
                            </span>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={auth.isLoggedIn ? logoutHandler : openModal}
                        className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition md:px-5 ${auth.isLoggedIn
                            ? 'border border-white/20 bg-white/10 text-white hover:bg-white/20'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                    >
                        {auth.isLoggedIn ? 'Logout' : 'Login'}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Navbar