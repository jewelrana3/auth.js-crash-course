import { doSignOut } from "@/app/actions";
import React from "react";

export default function SignOut() {
  return (
    <form action={doSignOut}>
      <button type="submit">Sign Out</button>
    </form>
  );
}
