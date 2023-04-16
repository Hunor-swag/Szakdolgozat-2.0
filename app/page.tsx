"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import HeaderItem from "../components/HeaderItem";
import Signout from "../components/Signout";

const HomePage = () => {
  useEffect(() => {
    window.location.href = "/admin";
  }, []);
  return <div>Homepage</div>;
};

export default HomePage;
