import { Input, ConfigProvider, Typography, Button, Divider } from "antd";
const { Text, Title } = Typography;

function SignUp({ change }: { change: Function }) {
  return (
    <div className="flex flex-col gap-y-5 bg-white p-7  py-8">
      <Title level={2}>Sign Up</Title>
      <ConfigProvider theme={{ token: { colorPrimary: "#000000" } }}>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-3">
            <div className="flex flex-row gap-x-2">
              <Input placeholder="First Name"></Input>
              <Input placeholder="Last Name"></Input>
            </div>
            <Input placeholder="Email"></Input>
            <Input placeholder="Phone Number"></Input>
            <Input.Password placeholder="Password"></Input.Password>
            <Input.Password placeholder="Re-Enter Password"></Input.Password>
          </div>

          <div className="grid grid-cols-9">
            <Button
              type="primary"
              shape="round"
              style={{ backgroundColor: "black", borderRadius: "6px" }}
              className="col-start-3 col-span-5"
            >
              Sign Up
            </Button>
          </div>
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
    </div>
  );
}

export default SignUp;
