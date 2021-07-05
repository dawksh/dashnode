import { useAuthState } from "../utils/authState";
import { Heading, Flex, Button } from "@chakra-ui/react";
import Link from "next/link";
import { fireAuth } from "../utils/firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";

import RecentLayout from "../components/RecentLayout";

function app() {
  const [isLoggedIn, uid] = useAuthState();
  const router = useRouter();
  const signOut = () => {
    fireAuth.signOut();
    router.push("/auth");
  };
  if (isLoggedIn) {
    return (
      <Flex justifyContent="center" alignItems="center" p={5} flexDir="column">
        <Heading textShadow="3px 3px red" mt={5}>
          Dashnode
        </Heading>
        <Button varient="outline" p={4} colorScheme="whatsapp" mt={8}>
          <Link href="/new">New Post</Link>
        </Button>
        <Button
          varient="ghost"
          p={4}
          colorScheme="red"
          mt={4}
          onClick={signOut}
        >
          Logout
        </Button>
        <RecentLayout uid={uid} />
      </Flex>
    );
  } else {
    return <>you must sign in first!</>;
  }
}

export default app;
