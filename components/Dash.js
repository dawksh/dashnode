import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { useState, dangerouslySetInnerHTML } from "react";
import marked from "marked";

import InputForm from "../components/InputForm";

function Dash() {
  const [title, setTitle] = useState(null);
  const [rawBody, setRawBody] = useState(null);
  const [parsedBody, setParsedBody] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const updateBody = (e) => {
    setRawBody(e.target.value);
    setParsedBody(marked(e.target.value));
  };
  return (
    <Flex justifyContent="center" alignItems="center" flexDir="column" p={5}>
      <Heading textShadow="2px 2px #f54242">Dee</Heading>
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
        <div>Parsed Body here</div>
      ) : (
        <InputForm updateBody={updateBody} setTitle={setTitle} />
      )}
    </Flex>
  );
}

export default Dash;
