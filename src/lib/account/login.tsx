import { Input, ConfigProvider, Typography, Button } from "antd";
const { Text, Title } = Typography;
{
  /* <div className="flex flex-row gap-x-2">
<Input placeholder="First Name"></Input>
<Input placeholder="Last Name"></Input>
</div>
<Input placeholder="Email"></Input>
<Input placeholder="Phone Number"></Input>
<Input placeholder="Password"></Input>
<Input placeholder="Re-Enter Password"></Input> */
}
function Login({ change }: { change: Function }) {
  return (
    <div className="flex flex-col gap-y-5 bg-white p-5 sm:p-10 ">
      <Title level={2}>Login</Title>
      <ConfigProvider theme={{ token: { colorPrimary: "#000000" } }}>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-3">
            <Input placeholder="Username or Email"></Input>
            <div className="flex flex-col gap-y-1 ">
              <Input.Password placeholder="Password"></Input.Password>
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
