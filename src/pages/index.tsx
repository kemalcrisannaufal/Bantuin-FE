import { Button } from "@heroui/react";
import { signOut, useSession } from "next-auth/react";

const Home = () => {
  const session = useSession();
  console.log(session);
  return (
    <div>
      <Button onPress={() => signOut()} color="primary">
        Logout
      </Button>
    </div>
  );
};

export default Home;
