// Home Page
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { useSession, signIn, getSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";
export default function Home() {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      Router.push("/profile");
    }
  }, []);
  return (
    <header>
      {/* navbar */}
      <div className="flex bg-gradient-to-r from-slate-900 to-slate-700 text-white h-[60px]">
        {/* left */}
        <div className="flex items-center m-4">
          {/* <Link to={"/"}> */}
          <img className="h-[45px] w-[100px] m-2" src={"../images/mededg_logo.png"} />
        </div>
        {/* middle */}
        <div className="flex grow relative items-center">
          {/* <Search /> */}
        </div>
        {/* right */}
        <div className="flex items-center m-4">
          <div className="pr-4 pl-4">
            <a
              href="#"
              className="hover:text-red-700"
            >
              About
            </a>
          </div>

          <div className="pr-4 pl-4">
            <a
              href="#"
              className="hover:text-red-700"
            >
              Office Staff
            </a>
          </div>
          <div className="pr-4 pl-4">
            <a
              href="#"
              className="hover:text-red-700"
            >
              Contact Us
            </a>
          </div>

          <div className="pr-4 pl-4">
            <button
              className="bg-green-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
              onClick={() => signIn()}
            >
              Sign in/Sign Up
            </button>
          </div>
          {/* </Link>  NIT Silchar have largest Central Library among NITs, IITs, IIITs & other */}
        </div>
      </div>

      <div className="flex bg-black text-green-600 font-semibold items-center  space-x-3 text-xl xl:text-xl p-2 pl-52">
        <div>NIT Silchar </div>
        <div>  have</div>
        <div> largest</div>
        <div> Central Library</div>
        <div> among</div>
        <div> NITs</div>

        <div> IITs</div>
        <div> IIITs</div>
        <div> & other</div>

      </div>

      {/* homepage */}
      <div class="relative h-screen">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-black">
          {" "}
          <img className="h-screen w-screen" src={"../images/Home_bg.jpg"} />
        </div>
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent"></div>
        <div class="absolute top-0 left-0 w-full h-full flex m-10 ">
          {/* <div class="text-white text-center">
            <p class="text-2xl font-bold">WELCOME TO MEDEDGE</p>
            <p class="text-lg p-6">Additional paragraph content</p>
            <button
              class="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xl font-medium  leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-gradient-to-r from-gray-500 from-10% via-blue-400 via-30% to-emerald-500 to-90% hover:bg-opacity-10  hover:text-black focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              onClick={() => signIn()}
            >
              Sign in/Sign Up
            </button>
          </div> */}
          <div className="grid grid-rows-4 grid-flow-col gap-4 justify-end w-1/2">
            <p className="text-white pr-4">The Central Library which is the heart of the Institute was established in 1977. It provides one of the important academic services to the Institute. It is a well-equipped Library, centrally located with easy access and does provide right impetus for the intellectual growth of the students, teachers, research scholars & others around. Presently, the Library is a part of the LTT building & having around 97,000 collections of documents of both print & non-print materials.</p>

            <p className="text-white text-sm">The Central Library with its modern collection of knowledge resources and innovative information services supports a complementary role for students, faculty, and the surrounding community in their intellectual pursuits. It is a hybrid library with state-of-the-art technological applications. The Library holds knowledge resources predominantly related to Science and Technology, Humanities & Social Sc, Management & other allied subjects. The Library is now fully computerized with an integrated system connected to the Campus Network providing e-resource facility to the institutional community. The entire Library collection, including the CD-ROM databases and the online databases, is made available through the Institute's network. Users can access the online databases through the Institute's network. The Library collection can also be searched through Web OPAC. National Institute of Technology Silchar Library is an active member of E-ShodhSindhu Consortium (to access online full-text journals) and also a member of NDL (National Digital Library) in order to avail the benefits of various services. In addition, the library is enrolled as an Institutional member of the British Council Library, American Library to avail the service of ILL. Recently, NIT Silchar has invested Rs. 44 Crore to create a world-class, innovative, inviting, and flexible library system to enhance campus learning, support research, and to provide community outreach service having 90,000 sq. ft. carpet area. For this purpose, Central Library, NIT Silchar has entered into a collaborative MOU with University Library & Mortenson Centre for International Library Programme of the University of Illinois at Urbana Champaign, USA to create world-class LIS facilities at NIT Silchar. The library building is in the final stage of completion.</p>
          </div>


        </div>


      </div>





      {/* footer */}
      <footer className="  bg-gradient-to-r from-slate-900 to-slate-700 py-4">
        <div className="container mx-auto px-4 m-4">
          <div className="flex items-center justify-between">
            <p className="text-white">Some content here</p>
            <p className="text-white">Some content here</p>
            <p className="text-white">Some content here</p>
            <p className="text-white">Some content here</p>
          </div>
          <div className="flex space-x-5 items-center justify-center m-5  p-5">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-white pl-5"
            >
              <FontAwesomeIcon className="h-7 w-7" icon={faTwitter} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-white pl-5"
            >
              <FontAwesomeIcon className="h-7 w-7" icon={faFacebook} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600  hover:text-white pl-5"
            >
              <FontAwesomeIcon className="h-7 w-7" icon={faInstagram} />
            </a>
            <a
              href="https://www.linkedin.com/your-profile-url"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-white pl-5"
            >
              <FontAwesomeIcon
                className="h-7 w-7"
                icon={faLinkedin}
                size="lg"
              />
            </a>
          </div>
          <p className="text-gray-400 text-center mt-4">
            &copy; {new Date().getFullYear()} Uday_2012047. All rights reserved.
          </p>
        </div>
      </footer>
    </header>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
