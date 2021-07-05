import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Switch,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
const showdown = require("showdown");
const converter = new showdown.Converter();
import { usePublish } from "../utils/publishToIPFS";
import { DB, firebase } from "../utils/firebase";
import { useAuthState } from "../utils/authState";

function Dash() {
  const [title, setTitle] = useState("");
  const [rawBody, setRawBody] = useState("");
  const [parsedBody, setParsedBody] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isLoggedIn, uid] = useAuthState();

  const updateBody = (e) => {
    setRawBody(e.target.value);
    setParsedBody(
      `
      <html>
      <head>
      <title>${title}</title>
      </head>
      <body>
      ${converter.makeHtml(e.target.value)}
      </body>
      </html>
      `
    );
  };

  const dbUpload = async (data) => {
    DB.collection("users")
      .doc(uid)
      .update({
        posts: firebase.firestore.FieldValue.arrayUnion(data),
      });
  };

  const publishHandler = async (e) => {
    e.preventDefault();
    const res = await usePublish(parsedBody);
    const uploadData = {
      cid: res.data,
      title: title,
    };
    dbUpload(uploadData);
    console.log(res);
    setTitle("");
    setRawBody("");
    setParsedBody("");
    alert("Published to IPFS network");
  };

  return (
    <Flex justifyContent="center" alignItems="center" flexDir="column" p={5}>
      <Heading textShadow="2px 2px #f54242">Dashnode</Heading>
      <FormControl
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt={5}
      >
        <FormLabel htmlFor="email-alerts" mb="0">
          Preview
        </FormLabel>
        <Switch
          id="email-alerts"
          defaultChecked={false}
          onChange={(e) => setIsPreview(!isPreview)}
        />
      </FormControl>

      {isPreview ? (
        <Flex mt={5} p={4} flexDir="column" textAlign="center">
          <Heading mb={4}>{title}</Heading>
          <ReactMarkdown>{rawBody}</ReactMarkdown>
        </Flex>
      ) : (
        <>
          <Input
            mt={5}
            fontSize={22}
            minHeight={14}
            placeholder="Your title goes here"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <Textarea
            mt={5}
            fontSize={20}
            minHeight={96}
            placeholder="Your story goes here. (Shhh, don't tell anyone but I support Markdown!) (You might have trouble viewing headings in markdown preview, will soon fix that :)"
            onChange={(e) => updateBody(e)}
            value={rawBody}
          />
          <Button mt={5} colorScheme="teal" p={5} onClick={publishHandler}>
            Publish
          </Button>
        </>
      )}
    </Flex>
  );
}

export default Dash;
