import Friends from "./Friends"
import Conversation from "./Conversation"

const Home = () => {
    return (
        <div className=" m-4 border rounded bg-slate-200/25 flex justify-between p-2">
            <Friends />
            <Conversation />
        </div>
    )
}

export default Home