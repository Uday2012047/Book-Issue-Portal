import React, { useEffect, useState } from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import PatientProfile from "@/components/PatientProfile";
import axios from "axios";
import DoctorProfile from "@/components/DoctorProfile";

function profile() {
  const { data: session } = useSession();
  return (
    <div>
      {session.user.role === "student" && <PatientProfile />}
      {session.user.role === "librarian" && <DoctorProfile />}

    </div>
  );
}

export default profile;
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
