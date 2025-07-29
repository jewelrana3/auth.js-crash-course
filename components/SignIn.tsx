import { doSignIn } from "@/app/actions";
import React from "react";

export default function SignIn() {
  return (
    <form action={doSignIn}>
      <button
        className="bg-amber-100 p-1 m-1 rounded-md text-black cursor-pointer"
        type="submit"
      >
        SignIn with Google
      </button>
    </form>
  );
}
