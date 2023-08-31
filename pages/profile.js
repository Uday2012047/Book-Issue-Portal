import React, { useEffect, useState } from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import StudentProfile from "@/components/StudentProfile";
import axios from "axios";
import LaibrarianProfile from "@/components/LaibrarianProfile";

function profile() {
  const { data: session } = useSession();
  return (
    <div>
      {session.user.role === "student" && <StudentProfile />}
      {session.user.role === "librarian" && <LaibrarianProfile />}

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
