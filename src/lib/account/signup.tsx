import {
  Input,
  ConfigProvider,
  Typography,
  Button,
  Divider,
  message,
} from "antd";
import { useState, useRef, useEffect } from "react";
import { useSignUp } from "@/hooks/useUserApi";
import { useRouter } from "next/router";

const { Text, Title } = Typography;

type userInfo = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  repassword: string;
};
const initialField = {
  firstname: false,
  lastname: false,
  email: false,
  password: false,
  repassword: false,
};
function SignUp({ change }: { change: Function }) {
  const router = useRouter();
  const {
    signup,
    error: errorApi,
    userError,
    isLoading,
    success,
  } = useSignUp();
  const [signUpData, setSignUpData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    repassword: "",
  });

  const [missingField, setMissingField] = useState({
    ...initialField,
  });

  const [messageApi, contextHolder] = message.useMessage();

  function error(msg: string) {
    messageApi.open({
      type: "error",
      content: msg,
      duration: 5,
    });
  }

  function handleChange(event: any) {
    setSignUpData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function validateInput(event: any, userData: userInfo) {
    var valid = true;
    var updatedState = {
      ...initialField,
    };
    for (var field in userData) {
      if (userData[field as keyof userInfo].trim() == "") {
        valid = false;
        updatedState = {
          ...updatedState,
          [field]: true,
        };
      } else {
        updatedState = {
          ...updatedState,
          [field]: false,
        };
      }
    }

    if (!valid) {
      setMissingField(updatedState);
      error("Missing Fields");
      return;
    }

    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.email) //regex
    ) {
      updatedState = { ...updatedState, email: true };
      setMissingField(updatedState);
      error("Invalid Email Address.");
      valid = false;
      return;
    }

    if (userData.password != userData.repassword) {
      updatedState = { ...updatedState, password: true, repassword: true };
      setMissingField(updatedState);
      error("Password and Confirm Password don't match.");
      valid = false;

      return;
    }

    if (!/^.{8,}$/.test(userData.password)) {
      updatedState = { ...updatedState, password: true, repassword: true };
      setMissingField(updatedState);
      error("Please enter a more secure password. (8 character +).");
      valid = false;

      return;
    }

    setMissingField(updatedState);

    if (valid) {
      handleSubmit(event);
    }
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    const { repassword, ...dataSignUp } = signUpData;
    await signup(dataSignUp);
  }

  useEffect(() => {
    if (userError) {
      error(userError);
    }
  }, [userError]);

  useEffect(() => {
    if (errorApi) {
      error("Something went wrong!");
      throw new Error(errorApi);
    }
  }, [errorApi]);

  useEffect(() => {
    if (success) {
      messageApi.open({
        type: "success",
        content: "Successfully Signed up.",
        duration: 5,
      });

      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="flex flex-col gap-y-5 bg-white p-7  py-8">
      {contextHolder}
      <form onSubmit={handleSubmit}>
        <Title level={2}>Sign Up</Title>
        <ConfigProvider theme={{ token: { colorPrimary: "#000000" } }}>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-3">
              <div className="flex flex-row gap-x-2">
                <Input
                  placeholder="First Name"
                  name=""
                  value={signUpData.firstname}
                  onChange={(e) => handleChange(e)}
                  status={missingField.firstname ? "error" : ""}
                ></Input>
                <Input
                  placeholder="Last Name"
                  name="lastname"
                  id="lastname"
                  value={signUpData.lastname}
                  onChange={(e) => handleChange(e)}
                  status={missingField.lastname ? "error" : ""}
                ></Input>
              </div>
              <Input
                placeholder="Email"
                name="email"
                id="email"
                value={signUpData.email}
                onChange={(e) => handleChange(e)}
                status={missingField.email ? "error" : ""}
              ></Input>
              <Input.Password
                placeholder="Password"
                name="password"
                id="password"
                value={signUpData.password}
                onChange={(e) => handleChange(e)}
                status={missingField.password ? "error" : ""}
              ></Input.Password>
              <Input.Password
                placeholder="Re-Enter Password"
                name="repassword"
                id="repassword"
                value={signUpData.repassword}
                onChange={(e) => handleChange(e)}
                status={missingField.repassword ? "error" : ""}
              ></Input.Password>
            </div>

            <div className="grid grid-cols-9">
              <Button
                type="primary"
                shape="round"
                style={{ backgroundColor: "black", borderRadius: "6px" }}
                className="col-start-3 col-span-5"
                onClick={(e) => validateInput(e, signUpData)}
                disabled={isLoading ? true : false}
              >
                Sign Up
              </Button>
            </div>
            <br />
          </div>
        </ConfigProvider>
        <div>
          <hr className="mb-5" />
          <div>
            <div className="flex flex-row gap-x-2">
              <Text type="secondary">Already have an account?</Text>
              <Text
                className="text-blue-400 cursor-pointer"
                onClick={() => change()}
              >
                Login
              </Text>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
