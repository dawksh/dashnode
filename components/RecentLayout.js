import { Flex, Heading } from "@chakra-ui/react";
import { useAuthState } from "../utils/authState";
import { useState, useEffect } from "react";
import { DB, fireAuth } from "../utils/firebase";
import Link from "next/link";
import { Table, Thead, Tbody, Tr, Th, Td, Text } from "@chakra-ui/react";

const recent = ({ uid }) => {
	const [posts, setPosts] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		DB.collection("users")
			.doc(uid)
			.get()
			.then((doc) => {
				if (doc.exists) {
					setPosts(doc.data().posts);
					setLoading(false);
				} else {
					console.log("Error getting data");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// useEffect(() => {
	// 	const getPosts = async () => {
	// 		if (uid) {
	// 			DB.collection("users")
	// 				.doc(uid)
	// 				.get()
	// 				.then((doc) => {
	// 					if (doc.exists) {
	// 						setPosts(doc.data());
	// 					} else {
	// 						console.log("Error getting data");
	// 					}
	// 				})
	// 				.catch((err) => {
	// 					console.log(err);
	// 				});
	// 		} else {
	// 			return false;
	// 		}
	// 	};
	// 	getPosts();
	// }, [uid]);

	return (
		<Flex
			justifyContent={"center"}
			alignItems={"center"}
			p={5}
			flexDir={"column"}
		>
			<Heading m={5}> Recent Posts </Heading>
			{posts ? (
				<Table varient="simple">
					<Thead>
						<Tr>
							<Th>Post Title</Th>
							<Th>Post Link</Th>
							<Th>CID</Th>
						</Tr>
					</Thead>
					<Tbody>
						{posts &&
							posts.map((el) => {
								return (
									<Tr key={el.cid}>
										<Td>{el.title}</Td>
										<Td>
											<Link
												target="__blank"
												href={`https://ipfs.io/ipfs/${el.cid}`}
											>
												Link
											</Link>
										</Td>
										<Td>{el.cid}</Td>
									</Tr>
								);
							})}
					</Tbody>
				</Table>
			) : (
				<Text>Add a post to see details here</Text>
			)}
		</Flex>
	);
};

export default recent;
