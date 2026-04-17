/* eslint-disable react/prop-types */
import { useRef, useState, useContext } from 'react'
import { AuthContext } from '../context/auth-context'

const Auth = ({ isRegisterForm, switchModal, closeModal, sendRequest }) => {
    const [formValidity, setFormValidity] = useState(true)
    const [imageSrc, setImageSrc] = useState(false)
    const form = useRef(null)
    const auth = useContext(AuthContext)

    const imageHandler = (e) => {
        if (!e.target.files || !e.target.files[0]) return setImageSrc(false)
        setImageSrc(URL.createObjectURL(e.target.files[0]))
    }

    const submitForm = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const payload = Object.fromEntries(formData)

        for (let [key, value] of formData.entries()) {
            if (!value || (key === 'image' && !value.type.includes('image'))) {
                setFormValidity(false)
                setTimeout(() => {
                    setFormValidity(true)
                }, 2000)
                return
            }
        }

        try {
            const obj = {
                email: payload.email,
                password: payload.password,
            }

            e.currentTarget.reset()
            setImageSrc(false)

            const request = `${import.meta.env.VITE_BACKEND_URL}/api/users/${isRegisterForm ? 'signup' : 'login'}`

            const responseData = await sendRequest(
                request,
                'POST',
                isRegisterForm ? formData : JSON.stringify(obj),
                isRegisterForm ? {} : { 'Content-Type': 'application/json' }
            )

            auth.login(responseData.userId, responseData.token, responseData.image)
            closeModal()
        } catch (err) {
            console.log(err)
        }
    }

    const switchAuthModeHandler = () => {
        form.current?.reset()
        setImageSrc(false)
        switchModal()
    }

    const inputWrapperClass = 'w-full'
    const labelClass = 'mb-1 block text-sm font-medium text-slate-700'
    const inputClass =
        'w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'

    return (
        <form
            ref={form}
            onSubmit={submitForm}
            className="mx-auto flex max-h-[calc(100dvh-180px)] w-full max-w-2xl flex-col gap-4 overflow-y-auto rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl no-scrollbar sm:p-5 md:max-h-none md:gap-6 md:p-8"
        >
            <div className={`grid gap-3 ${isRegisterForm ? 'md:grid-cols-2' : 'md:grid-cols-1'} md:gap-4`}>
                {isRegisterForm && (
                    <div className={inputWrapperClass}>
                        <label className={labelClass}>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Enter your first name"
                            className={inputClass}
                        />
                    </div>
                )}

                {isRegisterForm && (
                    <div className={inputWrapperClass}>
                        <label className={labelClass}>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Enter your last name"
                            className={inputClass}
                        />
                    </div>
                )}

                <div className={inputWrapperClass}>
                    <label className={labelClass}>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className={inputClass}
                    />
                </div>

                <div className={inputWrapperClass}>
                    <label className={labelClass}>Password</label>
                    <input
                        type="password"
                        name="password"
                        minLength={5}
                        placeholder="Enter your password"
                        className={inputClass}
                    />
                </div>
            </div>

            {isRegisterForm && (
                <div className="w-full">
                    <label className={`${labelClass} text-center`}>Profile Image</label>
                    <div className="mx-auto">
                        <div className="relative mx-auto flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-blue-400 hover:bg-slate-100 sm:h-40 sm:w-40 md:h-56 md:w-56">
                            {imageSrc ? (
                                <img
                                    className="h-full w-full object-cover"
                                    src={imageSrc}
                                    alt="Preview"
                                />
                            ) : (
                                <span className="px-4 text-center text-sm font-medium text-slate-500">
                                    Click to upload image
                                </span>
                            )}

                            <input
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={imageHandler}
                                className="absolute inset-0 cursor-pointer opacity-0"
                            />
                        </div>
                    </div>
                </div>
            )}

            {!formValidity && (
                <p className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
                    Please fill out all fields correctly.
                </p>
            )}

            <div className="flex flex-col items-center gap-3 md:gap-4">
                <button
                    className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 active:scale-[0.99] md:w-auto md:min-w-[180px]"
                >
                    {isRegisterForm ? 'Create account' : 'Log in'}
                </button>

                <p className="text-center text-sm text-slate-600">
                    {isRegisterForm ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <span
                        className="cursor-pointer font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
                        onClick={switchAuthModeHandler}
                    >
                        {isRegisterForm ? 'Log in' : 'Register'}
                    </span>
                </p>
            </div>
        </form>
    )
}

export default Auth