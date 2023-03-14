"use client";

import { useSession } from "next-auth/react";

const HomePage = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <button onClick={() => console.log(session)}>CLICK ME</button>
      ) : (
        <h1>No session :(</h1>
      )}
    </div>
  );
};

export default HomePage;
