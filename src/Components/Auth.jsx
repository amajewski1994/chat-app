/* eslint-disable react/prop-types */
import { useRef, useState, useContext } from 'react'
import { useHttpClient } from '../hooks/http-hook';
import { AuthContext } from '../context/auth-context';
import LoadingSpinner from '../shared/LoadingSpinner';

const Auth = ({ isRegisterForm, switchModal, closeModal }) => {

    const [formValidity, setFormValidity] = useState(true)
    const [imageSrc, setImageSrc] = useState(false)
    const form = useRef(null)

    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const imageHandler = (e) => {
        if (!e.target.files || !e.target.files[0]) return setImageSrc(false)
        setImageSrc(URL.createObjectURL(e.target.files[0]))
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const payload = Object.fromEntries(formData)

        for (let [key, value] of formData.entries()) {
            if (!value || (key === 'image' && !value.type.includes('image'))) {
                setFormValidity(false)
                setTimeout(() => {
                    setFormValidity(true)
                }, 2000)
                return;
            }
        }

        try {

            let obj = {
                email: payload.email,
                password: payload.password,
            }

            if (isRegisterForm) {
                obj = {
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    email: payload.email,
                    password: payload.password,
                }
            }

            let request = `http://localhost:5000/api/users/${isRegisterForm ? 'signup' : 'login'}`;
            // let request = `${process.env.REACT_APP_BACKEND_URL}/${props.request}`;
            await sendRequest(request, 'POST',
                formData,
                JSON.stringify(obj),
                {
                    'Content-Type': 'application/json',
                    // Authorization: 'Bearer ' + auth.token
                }
            );
            await e.currentTarget.reset()
            await closeModal()
            await setImageSrc(false)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form ref={form} className='flex flex-wrap justify-around' onSubmit={submitForm}>
            {isRegisterForm && <div className='text-center w-1/3 m-4'>
                <label className='block'>First Name</label>
                <input type='text' name='firstName' className='rounded w-full px-2 py-1 focus-within:outline-none' />
            </div>}
            {isRegisterForm && <div className='text-center w-1/3 m-4'>
                <label className='block'>Last Name</label>
                <input type='text' name='lastName' className='rounded w-full px-2 py-1 focus-within:outline-none' />
            </div>}
            <div className='text-center w-1/3 m-4'>
                <label className='block'>Email</label>
                <input type='email' name='email' className='rounded w-full px-2 py-1 focus-within:outline-none' />
            </div>
            <div className='text-center w-1/3 m-4'>
                <label className='block'>Password</label>
                <input type='password' name='password' minLength={5} className='rounded w-full px-2 py-1 focus-within:outline-none' />
            </div>
            {isRegisterForm && <div className='text-center w-full m-4 '>
                <label className='block'>Image</label>
                <div className='bg-white w-60 h-60 m-auto relative rounded'>
                    {imageSrc ? <img className='pointer-events-none w-full h-full' src={imageSrc} alt='image' /> :
                        <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>PICK AN IMAGE</span>}
                    <input name='image' type='file' onChange={imageHandler} className='absolute top-0 left-0 w-full h-full opacity-0' />
                </div>
            </div>}
            <div className='text-center w-full m-4 relative'>
                <p className={`text-red-500 absolute left-1/2 -top-3 -translate-x-1/2 -translate-y-1/2 font-semibold ${formValidity ? 'hidden' : 'block'}`}>Fill out the form</p>
                <button className='bg-blue-500 text-white p-2 font-semibold rounded w-1/3'>SUBMIT</button>
            </div>
            <div>
                Switch to <span
                    className='text-cyan-500 cursor-pointer font-bold'
                    onClick={() => {
                        form.current.reset()
                        setImageSrc(false)
                        switchModal()
                    }}
                >
                    {isRegisterForm ? 'login' : 'register'}
                </span>
            </div>
        </form>
    )
}

export default Auth