// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
    return (
        <div className="relative min-h-dvh w-dvw overflow-hidden">
            <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center brightness-75 blur-sm scale-105" />
            <div className="relative z-10 min-h-dvh w-full">
                {children}
            </div>
        </div>
    )
}

export default Layout