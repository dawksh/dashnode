import { Input, Textarea, Button } from "@chakra-ui/react";

function InputForm({ setTitle, updateBody }) {
  return (
    <>
      <Input
        mt={5}
        fontSize={22}
        minHeight={14}
        placeholder="Your title goes here"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        mt={5}
        fontSize={20}
        minHeight={96}
        placeholder="Your story goes here. (Shhh, don't tell anyone but I support Markdown!)"
        onChange={(e) => updateBody(e)}
      />
      <Button mt={5} colorScheme="teal" p={5}>
        Publish
      </Button>
    </>
  );
}

export default InputForm;
