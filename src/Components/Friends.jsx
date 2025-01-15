import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import FriendRow from './FriendRow'

const DUMMY_LIST = [
    {
        id: 0,
        firstName: 'John',
        lastName: 'Doe',
        image: 'image',
        online: true
    }, {
        id: 1,
        firstName: 'Jane',
        lastName: 'Doe',
        image: 'image',
        online: false
    }, {
        id: 2,
        firstName: 'Robert',
        lastName: 'Doe',
        image: 'image',
        online: true
    }, {
        id: 3,
        firstName: 'Will',
        lastName: 'Doe',
        image: 'image',
        online: true
    },
]

const Friends = () => {

    const list = DUMMY_LIST.map(element => <FriendRow key={element.id} {...element} />)

    return (
        <div className="p-2 w-1/4 text-center">
            <h2 className="text-2xl font-bold flex-1 text-center text-white [text-shadow:_1px_1px_0_rgb(0_0_0_/_40%)]">Friends</h2>
            <div className="flex justify-center items-center py-2">
                <div className="flex-1 px-1">
                    <input type="text" placeholder="Search" className="rounded w-full px-2 py-1 focus-within:outline-none" />
                </div>
                <div className="mx-4 text-xl cursor-pointer"><FontAwesomeIcon icon={faUserPlus} /></div>
            </div>
            <div>
                <ul>
                    {list}
                </ul>
            </div>
        </div>
    )
}

export default Friends