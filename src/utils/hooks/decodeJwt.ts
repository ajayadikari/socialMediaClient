import { jwtDecode } from "jwt-decode";

const decodeAndStoreJwtDecode = () => {
  try {
    const token = localStorage.getItem("access");
    if (token) {
      const decode = jwtDecode(token);
      localStorage.setItem("userId", decode.user_id)
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default decodeAndStoreJwtDecode;
