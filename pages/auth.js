import { fireAuth, googleProvider, DB, firebase } from "../utils/firebase";
import { useRouter } from "next/router";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Flex, Button, Heading, useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";
import { useAuthState } from "../utils/authState";

function auth() {
  const router = useRouter();
  const [isLoggedIn] = useAuthState();

  // const userCheck = async (uid) => {
  //   await DB.collection("users")
  //     .doc(uid)
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         console.log("User Exists!");
  //       } else {
  //         db.collection("users").doc(uid).set({
  //           uid: uid,
  //           cids: [],
  //         });
  //       }
  //     })
  //     .catch((err) => console.log(err));
  //   return true;
  // };

  const login = async () => {
    fireAuth
      .signInWithPopup(googleProvider)
      .then(async (res) => {
        var { uid } = res.user;
        userCheck(uid);
        router.push("/app");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: (user) => {
        DB.collection("users")
          .doc(user.user.uid)
          .get()
          .then((doc) => {
            console.log(doc);
            if (doc.exists) {
              console.log("existing user");
            } else {
              DB.collection("users").doc(user.user.uid).set({
                uid: user.user.uid,
                posts: [],
              });
            }
            router.push("/app");
          });
      },
    },
  };

  const formBackground = useColorModeValue("gray.100", "gray.700");
  if (isLoggedIn) {
    // router.push("/app");
    return (
      <Flex alignItems="center" justifyContent="center" p={10}>
        <Heading>Already signed in!</Heading>
      </Flex>
    );
  } else {
    return (
      <>
        <Head>
          <title>Authenticate / Dashnode</title>
        </Head>
        <Flex height="100vh" alignItems="center" justifyContent="center">
          <Flex
            direction="column"
            background={formBackground}
            p={12}
            rounded={6}
          >
            <Heading mb={6}>Log In / Signup</Heading>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fireAuth} />
          </Flex>
        </Flex>
      </>
    );
  }
}

export default auth;
