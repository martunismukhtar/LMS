// import { useState } from "react";
// import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// import { signIn, signOut, useSession } from "next-auth/react";
// import Button from "../Elements/button";
// import LoadingButton from "../Elements/loading/LoadingButton";
import InputForm from "../Elements/input/Index";


// import { accessTokenState, userState } from "../../Recoil/atoms";
// import { useSetRecoilState } from "recoil";

const LoginForm = () => {
  // const [loading, setLoading] = useState(false);
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  // const setAccessToken = useSetRecoilState(accessTokenState);
  // const setUser = useSetRecoilState(userState);

  const handleSubmit = () => {
    // e.preventDefault();
    // setLoading(true);
    // console.log(formData);
  };
  const handleChange = () => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // const handleSuccess = (response) => {
  //   // try {
  //   //   axios
  //   //     .post("http://localhost:3000/api/auth/google", {
  //   //       token: response.credential,
  //   //     })
  //   //     .then((res) => {
  //   //       console.log(res);
  //   //     });
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }

  //   // fetch('http://localhost:3000/api/auth/google', {
  //   //   method: 'POST',
  //   //   headers: { 'Content-Type': 'application/json' },
  //   //   body: JSON.stringify({ token: response.credential }),
  //   // });
  //   // console.log(response);
  // };
  // const handleError = (error) => {
  //   console.log(error);
  // };

  return (
    <form className="px-3 mb-4" onSubmit={handleSubmit}>
      <div className="pt-4">
        <InputForm
          label="Email"
          onChange={handleChange}
          name="email"
          type="email"
          required={true}
          placeholder="Email"
        />
        <InputForm
          label="Password"
          onChange={handleChange}
          name="password"
          type="password"
          required={true}
          placeholder="Password"
        />
        <div className="flex justify-end">
          {/* {loading ? <LoadingButton /> : <Button type="submit">Submit</Button>} */}
        </div>
        
        {/* <GoogleOAuthProvider clientId={`${process.env.VITE_CLIENT_Id}`}>
          <div>
              <h4>Login menggunakan akun google</h4>
              <GoogleLogin 
                onSuccess={handleSuccess} 
                onError={handleError} 
                useOneTap
              />
          </div>
        </GoogleOAuthProvider> */}
      </div>
    </form>
  );
};

export default LoginForm;
