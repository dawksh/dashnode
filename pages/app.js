import { useAuthState } from "../utils/authState";
import Dash from "../components/Dash";
function app() {
  const [isLoggedIn, uid] = useAuthState();
  if (isLoggedIn) {
    return (
      <>
        <Dash />
      </>
    );
  } else {
    return <>you must sign in first!</>;
  }
}

export default app;
