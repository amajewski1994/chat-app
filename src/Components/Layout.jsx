// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
    return (
        <div className='bg-hero-pattern bg-cover bg-center brightness-75 blur-sm h-dvh w-dvw'>
            {children}
        </div>
    )
}

export default Layout