import { ReactIcon, TailwindIcon } from "../assets/icons";

function InfoPane() {
  return (
    <div className="md:ml-20 md:mb-0 md:mr-[68px] mx-3 transition-all text-white flex flex-col min-h-screen">
      <div className="my-4 text-2xl font-bold">
        <span>About Sprintify</span>
      </div>
      <div className="flex flex-col flex-grow">
        <b className="text-lg">TLDR: Give Sprintify your Spotify playlist and a BPM range, Sprintify returns a new playlist with the songs that are within the BPM range.</b>
        <br/>
        <span>
          Why? The story goes, I was trying to find the right songs to run to, and decided it might be fun to find songs that matched the pace of my feet
          hitting the ground. Spotify has BPM data for every song, why not filter my existing playlists to find songs that match my desired running tempo, 
          so I learned Python and stumbled my way through 
          a <a href="https://github.com/alexthescott/Sprintify-Python" className="text-blue-600 dark:text-blue-500 hover:underline">Sprintify.py</a> script.
          Years later, I want other folks to have the same musical superpower because
          I've found so much joy in dancing my butt off while running around town. With Ykrej's help (he wrote most of the site, check the commits), we're 
          happy to share Sprintify with you too.
        </span>
      </div>
      
      <footer className="md:mb-0 py-2 sticky bottom-0 mb-16">
        <div className="container mx-auto flex justify-center items-center">
          <div className="mx-auto place-items-center">
            <div className="mx-auto text-center text-xl font-semibold">Created By</div>
            <div className="flex gap-4 items-center justify-center text-center">
              <div className="flex flex-col items-center">
                <span>Alex Scott</span>
                <a href="https://alexthescott.space/">
                  <img src="https://github.com/alexthescott.png" className="bg-contain h-12 w-12" />
                </a>
              </div>
              <div className="flex flex-col items-center">
                <span>Ykrej</span>
                <a href="https://github.com/Ykrej">
                  <img src="https://github.com/Ykrej.png" className="bg-contain h-12 w-12" />
                </a>
              </div>
            </div>
          </div>
          <div className="mx-auto">
            <div className="mx-auto text-center text-xl font-semibold">Powered By</div>
            <div className="flex gap-4 items-center justify-center text-sm">
              <div className="flex flex-col items-center">
                <span>React JS</span>
                <a href="https://react.dev/">
                  <ReactIcon className="w-12 h-12" />
                </a>
              </div>
              <div className="flex flex-col items-center">
                <span>Tailwind CSS</span>
                <a href="https://tailwindcss.com/">
                  <TailwindIcon className="w-12 h-12" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default InfoPane;
