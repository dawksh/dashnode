import axios from "axios";

const URL = `https://6iionw.deta.dev/api/text`;

const usePublish = async (parsedData) => {
  const res = await axios.post(URL, {
    text: parsedData,
  });

  return res;
};

export { usePublish };
