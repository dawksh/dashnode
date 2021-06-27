import { useAuthState } from "../utils/authState";
import Dash from "../components/Dash";

function newPost() {
  const [isLoggedIn] = useAuthState();

  if (isLoggedIn) {
    return (
      <>
        <Dash />
      </>
    );
  } else {
    return <>Signin First!</>;
  }
}

export default newPost;
