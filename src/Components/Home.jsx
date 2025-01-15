import Friends from "./Friends"
import Messages from "./Messages"

const Home = () => {
    return (
        <div className=" m-4 border rounded bg-slate-200/25 flex justify-between p-2">
            <Friends />
            <Messages />
        </div>
    )
}

export default Home