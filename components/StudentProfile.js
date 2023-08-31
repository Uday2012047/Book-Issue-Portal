import React, { useEffect, useState } from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Image from "next/image";

function PatientProfile() {
  const router = useRouter();
  const query = router.query;
  const [profile, setProfile] = useState();
  const { data: session } = useSession();
  const emailt = session.user.email;

  const [DOB, setDOB] = useState();
  const [address, setAddress] = useState();
  const [Dept, setDept] = useState();
  const [pincode, setPincode] = useState();
  const [gender, setGender] = useState();
  const [Hostel, setHostel] = useState();
  const [CGPA, setCGPA] = useState();
  const [ScholarId, setScholarId] = useState();



  // const [reports, setReports] = useState();
  const [username, setUsername] = useState();
  const [bookissue, setBookissue] = useState([]);
  // const [image, setImage] = useState(null);
  const [imagefile, setImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchData = () => {
    const url = `http://localhost:3000/api/getpatientprofile/?email=${emailt}`;
    return axios.get(url).then((response) => {
      setProfile(response.data);
      setDOB(response.data.DOB);
      setAddress(response.data.address);
      setDept(response.data.Dept);
      setPincode(response.data.pincode);
      setHostel(response.data.Hostel);
      setGender(response.data.gender);
      setCGPA(response.data.CGPA);
      setScholarId(response.data.ScholarId);
      setUsername(response.data.username);
    });
  };

  // const fetchreports = () => {
  //   const url = `http://localhost:3000/api/getreport/?username=${profile?.username}`;
  //   return axios.get(url).then((response) => {
  //     setReports(response.data);
  //   });
  // };
  const fetchbooks = () => {
    const url = `http://localhost:3000/api/getstudent/?id=${profile?.username}`;
    return axios.get(url).then((response) => {
      setBookissue(response.data.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  // useEffect(() => {
  //   fetchreports();
  // }, [profile]);

  useEffect(() => {
    fetchbooks();
  }, [profile]);

  const updateProfile = async (e) => {
    e.preventDefault();
    const email = session.user.email;
    const formData = new FormData();
    formData.append("file", imagefile);
    formData.append("upload_preset", "profilephotos"); // Replace with your Cloudinary upload preset
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dvefqwjbl/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    const imageUrl = data.secure_url; // Get the uploaded image URL
    const res = await fetch(`http://localhost:3000/api/updatepatientprofile/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        address,
        DOB,
        pincode,
        Dept,
        gender,
        CGPA,
        ScholarId,
        Hostel,
        profilephoto: imageUrl,
      }),
    });
    Router.reload();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="m-6 mr-10 ml-10">
      <div className="bg-sky-200 rounded-md pb-4">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <Image
          className=" mx-auto pt-2 pb-2 "
          src={selectedImage || profile?.profilephoto}
          alt="Picture of the author"
          width={200}
          height={200}
        />
        <div className=" mt-2 text-center font-bold  ">
          {" "}
          <span className="font-semibold font-mono"> UserName :</span>{" "}
          {profile?.username}
        </div>
      </div>
      <div className="bg-red-100 mt-3 rounded-lg pb-4">
        <div className=" ml-16 p-4">
          <h3 className=" flex items-center justify-center font-bold ">
            Patient Details
          </h3>
          <div className=" mt-2 font-semibold font-mono ml-2 text-lg ">
            <span className="font-semibold font-mono "> Name :</span>
            {profile?.firstname} {profile?.lastname}
          </div>

          <div className=" mt-2 font-semibold font-mono ml-2 text-lg">
            <span className="font-semibold font-mono"> Contact :</span>
            {profile?.phone}
          </div>
          <div className="  mt-2 font-semibold font-mono ml-2 text-lg ">
            <span className="font-semibold font-mono"> Email :</span>
            {profile?.email}
          </div>

          <div className=" grid-flow-col ">
            <div class="relative h-11 mt-1 w-full min-w-[200px]">
              <div class="flex items-center">
                <span className="font-semibold font-mono ml-2 text-lg  leading-tight text-blue-gray-500">
                  {" "}
                  Age:
                </span>

                <input
                  placeholder="Enter Your Age"
                  class="peer h-full flex-grow-0 flex-shrink-0 border-b border-blue-gray-200 bg-transparent pt-4 pl-4 ml-5 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200  focus:border-pink-500 focus:outline-0 disabled:border-2 disabled:bg-blue-gray-50"
                  name="DOB"
                  type="number"
                  value={DOB}
                  onChange={(e) => setDOB(e.target.value)}
                />
              </div>
            </div>
            <div class="relative h-11 mt-1 w-full min-w-[200px]">
              <div class="flex items-center">
                <span className="font-semibold font-mono ml-2 text-lg  leading-tight text-blue-gray-500">
                  {" "}
                  CGPA:
                </span>

                <input
                  placeholder="Enter Your Age"
                  class="peer h-full flex-grow-0 flex-shrink-0 border-b border-blue-gray-200 bg-transparent pt-4 pl-4 ml-5 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200  focus:border-pink-500 focus:outline-0 disabled:border-2 disabled:bg-blue-gray-50"
                  name="CGPA"
                  type="number"
                  value={CGPA}
                  onChange={(e) => setCGPA(e.target.value)}
                />
              </div>
            </div>


            <div class="relative h-11 mt-1 w-full min-w-[200px]">
              <div class="flex items-center">
                <span className="font-semibold font-mono ml-2 text-lg  leading-tight text-blue-gray-500">
                  {" "}
                  Address:
                </span>

                <input
                  placeholder="Enter Your Address"
                  class="peer h-full flex-grow-0 flex-shrink-0 border-b border-blue-gray-200 bg-transparent pt-4 pl-4 ml-5 pb-1.5 block w-[50%] overflow-hidden resize-both min-h-40px leading-20px font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200  focus:border-pink-500 focus:outline-0 disabled:border-2 disabled:bg-blue-gray-50"
                  name="Enter Your Adress "
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div class="relative h-11 mt-1 w-full min-w-[200px]">
              <div class="flex items-center">
                <span className="font-semibold font-mono ml-2 text-lg  leading-tight text-blue-gray-500">
                  {" "}
                  Pincode:
                </span>

                <input
                  placeholder="Pincode"
                  class="peer h-full flex-grow-0 flex-shrink-0 border-b border-blue-gray-200 bg-transparent pt-4 pl-4 ml-5 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200  focus:border-pink-500 focus:outline-0 disabled:border-2 disabled:bg-blue-gray-50"
                  name="pincode"
                  type="number"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
            </div>

            <div class="relative h-11 mt-1 w-full min-w-[200px]">
              <div class="flex items-center">
                <span className="font-semibold font-mono ml-2 text-lg  leading-tight text-blue-gray-500">
                  {" "}
                  Blood Group:
                </span>

                <input
                  placeholder="Enter Blood Group"
                  class="peer h-full flex-grow-0 flex-shrink-0 border-b border-blue-gray-200 bg-transparent pt-4 pl-4 ml-5 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200  focus:border-pink-500 focus:outline-0 disabled:border-2 disabled:bg-blue-gray-50"
                  name="Dept"
                  type="text"
                  value={Dept}
                  onChange={(e) => setDept(e.target.value)}
                />
              </div>
            </div>

            <div class="relative h-11 mt-1 w-full min-w-[200px]">
              <div class="flex items-center">
                <span className="font-semibold font-mono ml-2 text-lg  leading-tight text-blue-gray-500">
                  Gender:
                </span>

                <input
                  placeholder="Your Gender"
                  class="peer h-full flex-grow-0 flex-shrink-0 border-b border-blue-gray-200 bg-transparent pt-4 pl-4 ml-5 pb-1.5 font-sans text-md  font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200  focus:border-pink-500 focus:outline-0 disabled:border-2 disabled:bg-blue-gray-50"
                  name="gender"
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-2  place-items-center mt-4 ">
          <div>
            <button
              className="h-10 w-20 border-2 font-bold hover:bg-green-900 hover:text-white bg-green-400 mr-40  border-gray-500 rounded-md"
              type="submit"
              onClick={(e) => updateProfile(e)}
            >
              Update
            </button>
          </div>
          <div>
            <button
              className="h-10 w-20 border-2 font-bold bg-red-500  hover:bg-red-700 hover:text-white border-gray-500 rounded-md"
              onClick={() =>
                signOut({
                  callbackUrl: `${window.location.origin}`,
                })
              }
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="bg-green-200 p-8 mt-4 rounded-lg grid grid-cols-2 gap-3">


        <div className="ml-6 ">
          <h3 className=" font-bold ">Your Books</h3>
          {bookissue?.map((bookissue) => (
            <div className="mt-4">
              <p>
                {bookissue.name}
              </p>
              <p>
                {bookissue.bookid}
              </p>
              <p>
                {bookissue.duemonth}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PatientProfile;

