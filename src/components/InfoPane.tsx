import { ReactIcon, TailwindIcon } from "../assets/icons"


function InfoPane() {
  return (<div className="md:ml-20 md:mr-[68px] mx-3 mb-4 transition-all flex flex-col text-white">
    <div className="my-4 mx-1 text-2xl font-bold">
      <span>About Sprintify</span>
    </div>
    <div>
      <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
    </div>
    <div className="my-5 mx-auto w-fit text-center text-xl font-semibold">Powered By</div>
    <div className="mx-auto w-fit flex flex-row h-10 gap-4 items-center justify-center">
      <div>
        <span>React JS</span>
        <a href="https://react.dev/">
          <ReactIcon />
        </a>
      </div>
      <div>
        <span>Tailwind  CSS</span>
        <a href="https://tailwindcss.com/">
          <TailwindIcon />
        </a>
      </div>
    </div>
    <div className="my-10 mx-auto w-fit text-center text-xl font-semibold">Created By</div>
    <div className="mx-auto w-fit flex flex-row h-10 gap-4 items-center justify-center text-center">
      <div>
        <span>Alex Scott</span>
        <a href="https://github.com/alexthescott">
          <div style={{backgroundImage: "url(https://github.com/alexthescott.png)", backgroundSize: "contain", width:"5rem", height: "5rem"}} />
        </a>
      </div>
      <div>
        <span>Ykrej</span>
        <a href="https://github.com/Ykrej">
          <div style={{backgroundImage: "url(https://github.com/Ykrej.png)", backgroundSize: "contain", width:"5rem", height: "5rem"}} />
        </a>
      </div>
    </div>
  </div>)
}

export default InfoPane