import { Avatar, Button, ConfigProvider, message } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  HomeOutlined,
  DollarOutlined,
  FileOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useLogout } from "@/hooks/useUserApi";
import router from "next/router";
// bg-orange-300
function MenuItem({ name, link, icon }: any) {
  const linkInName = link == router.pathname;

  return (
    <div
      className="flex flex-row gap-x-4 items-center  py-2 px-2 pr-3 rounded-xl text-slate-600 hover:text-white sm:bg-[#242124] duration-300 ease-in transition-all"
      onClick={() => router.push(link)}
    >
      <Avatar
        shape="circle"
        icon={icon}
        className={`cursor-pointer ${linkInName ? "bg-orange-300" : ""} `}
      ></Avatar>
      <div className={`hidden sm:block ${linkInName ? "text-white" : ""}`}>
        {name}
      </div>
    </div>
  );
}
function MenuBar({ user }: any) {
  const [messageApi, contextHolder] = message.useMessage();
  const { logout } = useLogout();
  function handleLogout(e: any) {
    logout();
    messageApi.open({
      type: "success",
      content: "Successfully Logged out.",
      duration: 5,
    });

    setTimeout(() => {
      router.push("/");
    }, 2000);
  }
  return (
    <div className=" sm:h-full  p-2 sm:p-5 sm:py-14 sm:pt-10">
      {contextHolder}
      <div
        className="flex flex-row flex-wrap sm:flex-nowrap sm:flex-col h-full rounded-[25px] overflow-hidden p-5 text-white sm:min-h-[650px] justify-between items-center"
        style={{ backgroundColor: "#161416" }}
      >
        <div className="flex flex-row sm:flex-col gap-y-16">
          <div
            id="userText"
            className="flex flex-col gap-y-1 sm:gap-y-4 items-center sm:pt-5"
          >
            <div className=" overflow-hidden sm:rounded-[20px] hover:rounded-[0px] duration-300 ease-in transition-all">
              <div className="block sm:hidden">
                <Avatar
                  shape="square"
                  size={50}
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                />
              </div>{" "}
              <div className="hidden sm:block">
                <Avatar
                  shape="square"
                  size={100}
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                />
              </div>
            </div>
            <div className="apple-font  text-lg hover:text-xl hover:font-bold duration-300 ease-in transition-all hidden sm:block">
              Hello, {user?.firstName || null} !
            </div>
          </div>

          <div
            id="links"
            className="flex flex-row  sm:flex-col gap-y-5   w-full "
          >
            <MenuItem
              name="Dashboard"
              icon={<HomeOutlined />}
              link="/dashboard"
            />
            <MenuItem
              name="Subscriptions"
              icon={<GlobalOutlined />}
              link="/subscription"
            />
            <MenuItem
              name="Transactions"
              icon={<DollarOutlined />}
              link="/transaction"
            />
            <MenuItem
              name="Spending Report"
              icon={<FileOutlined />}
              link="/report"
            />
          </div>
        </div>
        <div
          id="logout-settings"
          className="flex  flex-col sm:pb-3 sm:gap-y-4 gap-y-2 sm:w-full"
        >
          <ConfigProvider theme={{ token: { colorPrimary: "#000000" } }}>
            <div className="flex flex-row gap-x-3">
              <Button
                shape="round"
                className="bg-white"
                icon={<UserOutlined />}
              ></Button>
              <Button
                shape="round"
                className="bg-white"
                icon={<SettingOutlined />}
              ></Button>
            </div>
            <div>
              <Button
                shape="round"
                className="w-full sm:p-5 flex  items-center bg-white hover:bg-slate-300 duration-300 ease-in transition-all"
                onClick={handleLogout}
              >
                <div className="w-full text-base">Logout</div>
              </Button>
            </div>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}

export { MenuBar };
