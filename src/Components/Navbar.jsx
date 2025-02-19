import { useContext } from "react"
import { AuthContext } from '../context/auth-context';

const Navbar = ({ openModal }) => {

    const auth = useContext(AuthContext);

    const logoutHandler = () => {
        auth.logout()
    }

    return (
        <div className="w-full min-h-20 bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center shadow-sm shadow-black">
            <div className="text-2xl font-bold flex-1 text-center text-amber-100">
                <h2 className="[text-shadow:_2px_2px_0_rgb(0_0_0_/_40%)] cursor-pointer m-auto w-fit border-b-2 border-b-transparent">
                    CHAT APP
                </h2>
            </div>
            <div className="mx-10 text-xl text-white flex items-center">
                <div
                    className="cursor-pointer border-b-2 border-b-transparent rounded-sm transition-colors duration-500 [text-shadow:_1px_1px_0_rgb(0_0_0_/_40%)] hover:border-b-white"
                    onClick={auth.isLoggedIn ? logoutHandler : openModal}
                >
                    {auth.isLoggedIn ? 'LOGOUT' : 'LOGIN'}

                </div>
                {auth.isLoggedIn && <div className="ml-5">
                    {/* <img src={'../../public/bg-image.jpg'} alt="avatar" className="w-10 h-10 rounded-full" /> */}
                    <img src={`https://chat-app-andrev.s3.eu-central-1.amazonaws.com/${auth.avatar}`} alt="avatar" className="w-10 h-10 rounded-full" />
                </div>
                }
            </div>
        </div>
    )
}

export default Navbar