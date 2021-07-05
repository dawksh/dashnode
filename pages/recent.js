import { Flex, Heading } from "@chakra-ui/react";
import { useAuthState } from "../utils/authState";
import { useState, useEffect } from "react";
import { DB, fireAuth } from "../utils/firebase";
import Head from "next/head";

const recent = () => {
	const [posts, setPosts] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, uid] = useAuthState();

	useEffect(() => {
		const getPosts = async () => {
			if (typeof uid != null) {
				DB.collection("users")
					.doc(uid)
					.get()
					.then((doc) => {
						if (doc.exists) {
							setPosts(doc.data());
						} else {
							console.log("Error getting data");
						}
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				return false;
			}
		};
		getPosts();
	}, [uid]);

	if (isLoggedIn == true) {
		return (
			<Flex
				justifyContent={"center"}
				alignItems={"center"}
				p={5}
				flexDir={"column"}
			>
				<Head>
					<title>Recent Posts / Dashnode</title>
				</Head>
				<Heading m={5}> Recent Posts </Heading>
				{loading ? (
					<>Loading...</>
				) : (
					posts.map((el) => <h3 key={el}>{el}</h3>)
				)}
			</Flex>
		);
	} else {
		return (
			<Flex justifyContent={"center"} alignItems={"center"} p={5}>
				<Heading> You might wanna login before you come here.</Heading>
			</Flex>
		);
	}
};

export async function getServerSideProps(context) {
	let uid;

	fireAuth.onAuthStateChanged((user) => {
		if (user) {
			uid = user.uid;
		}
	});
	return {
		props: { uid }, // will be passed to the page component as props
	};
}

export default recent;
