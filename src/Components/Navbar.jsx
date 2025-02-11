import { useContext } from "react"
import { AuthContext } from '../context/auth-context';

// const BASE_URL = "http://localhost:5000"
// const socket = io(BASE_URL)

const Navbar = ({ openModal }) => {

    // const [isLogged, setIsLogged] = useState(false)

    // const socketFunction = () => {
    //     if (isLogged) {
    //         socket.disconnect();
    //     } else {
    //         socket.connect();
    //     }
    //     setIsLogged(prevIsLogged => !prevIsLogged)
    // }

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
            <div className="mx-10 text-xl text-white">
                <div
                    className="cursor-pointer border-b-2 border-b-transparent rounded-sm transition-colors duration-500 [text-shadow:_1px_1px_0_rgb(0_0_0_/_40%)] hover:border-b-white"
                    onClick={auth.isLoggedIn ? logoutHandler : openModal}
                // onClick={socketFunction}
                >
                    {auth.isLoggedIn ? 'LOGOUT' : 'LOGIN'}
                </div>
            </div>
        </div>
    )
}

export default Navbar