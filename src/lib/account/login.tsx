import { Input, ConfigProvider, Typography, Button, message } from "antd";
import { useEffect, useState } from "react";
import { useLogin } from "@/hooks/useUserApi";
import { useRouter } from "next/router";
const { Text, Title } = Typography;

const initialField = {
  email: false,
  password: false,
};

function Login({ change }: { change: Function }) {
  const router = useRouter();
  const { login, error: errorApi, userError, isLoading, success } = useLogin();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
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
  function handleChange(e: any) {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    var valid = true;
    var updatedState = {
      ...initialField,
    };
    if (loginData.email.trim() == "") {
      valid = false;
      updatedState = {
        ...updatedState,
        email: true,
      };
    }
    if (loginData.password.trim() == "") {
      valid = false;
      updatedState = {
        ...updatedState,
        password: true,
      };
    }
    setMissingField(updatedState);
    if (!valid) {
      error("Missing Fields");
      return;
    }

    handleLogin();
  }

  async function handleLogin() {
    await login(loginData);
  }

  useEffect(() => {
    if (userError) {
      error(userError);
    }
  }, [userError]);

  useEffect(() => {
    if (success) {
      messageApi.open({
        type: "success",
        content: "Successfully Logged in.",
        duration: 5,
      });
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (errorApi) {
      error("Something went wrong!");
      throw new Error(errorApi);
    }
  }, [errorApi]);

  return (
    <div className="flex flex-col gap-y-5 bg-white p-5 sm:p-10 ">
      {contextHolder}
      <Title level={2}>Login</Title>
      <ConfigProvider theme={{ token: { colorPrimary: "#000000" } }}>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-3">
            <Input
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={loginData.email}
              status={missingField.email ? "error" : ""}
            ></Input>
            <div className="flex flex-col gap-y-1 ">
              <Input.Password
                placeholder="Password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                status={missingField.password ? "error" : ""}
              ></Input.Password>
              <div className="grid grid-cols-3">
                <Text
                  className="cursor-pointer col-start-3 relative  hover:underline"
                  type="secondary"
                >
                  Forgot Password?
                </Text>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-9">
            <Button
              type="primary"
              shape="round"
              style={{ backgroundColor: "black", borderRadius: "6px" }}
              className="col-start-3 col-span-5"
              onClick={handleSubmit}
              disabled={isLoading ? true : false}
            >
              Login
            </Button>
          </div>
        </div>
      </ConfigProvider>
      <div>
        <hr className="mb-5" />
        <div>
          <div className="flex flex-row gap-x-2">
            <Text type="secondary">Don't have an account?</Text>
            <Text
              className="text-blue-400 cursor-pointer"
              onClick={() => change()}
            >
              Sign Up
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
