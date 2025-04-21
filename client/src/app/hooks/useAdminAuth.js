// hooks/useAdminAuth.js
"use client";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export const useAdminAuth = () => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  console.log(user, user?.role, "Role of user");

  if (!user) {
    return router.push("/login");
  }

  if (user?.role !== "admin") {
    return router.push("/");
  }
  // useEffect(() => {
  //   // if (!user) {
  //   //   // console.log("No user found and he trying to access the admin page");
  //   //   router.push("/login");
  //   // }

  //   // alert(!user)
  //   if (!user) {
  //     // alert("heieiei")
  //     router.push("/");
  //   }
  //   else if (user?.role !== "admin") {
  //     console.log("jeieie");
  //     router.push("/");
  //   }
  // }, [user, router]);
};
