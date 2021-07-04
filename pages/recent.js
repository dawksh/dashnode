import { Flex, Heading } from "@chakra-ui/react";
import { useAuthState } from "../utils/authState";
import { useState, useEffect } from "react";
import { DB } from "../utils/firebase";
import Head from "next/head";

const recent = () => {
	const [posts, setPosts] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, uid] = useAuthState();

	useEffect((uid) => {
		setTimeout(() => {
			DB.collection("users")
				.doc(uid)
				.get()
				.then((doc) => {
					if (doc.exists) {
						const { cid } = doc.data();
						setPosts(cid);
						setLoading(false);
					} else {
						console.log("Document not found");
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}, 2000);
	});

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

export default recent;
