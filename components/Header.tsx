import { auth } from "@/auth";
import Image from "next/image";
import React from "react";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

export default async function Header() {
  const session = await auth();

  return (
    <div>
      {session?.user ? (
        <div className="flex gap-5">
          <p>{session.user.name}</p>
          <Image
            src={session.user.image as string}
            alt={session.user.name as string}
            width="22"
            height="33"
          />

          {/* sign out */}
          <SignOut />
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
}
