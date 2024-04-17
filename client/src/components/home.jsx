import Logo from '../assets/logo.png'
function Home() {
  return (
    <>
      <div className='flex flex-col w-screen items-center justify-center gap-7'>
        <img src={Logo} alt="" className="w-60"/>
        <h1>Welcome to your very own task manager</h1>
      </div>
    </>
  )
}

export default Home