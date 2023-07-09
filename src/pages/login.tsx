import { Login } from "@/lib/account";
import { HomeOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
export default function FAQ() {
  function changeType() {
    router.push("/signup");
  }
  const router = useRouter();
  function goHome() {
    router.push("/");
  }
  // grid place-items-center h-screen sm:pb-6 bg-gradient-to-t from-gray-100 to-gray-300
  return (
    <div className="grid place-items-center h-screen sm:pb-6 bg-gradient-to-t from-gray-100 to-gray-300">
      <HomeOutlined
        className="absolute right-10 top-10"
        style={{ fontSize: "130%" }}
        onClick={goHome}
      />
      <div className="p-10 py-[50px] bg-white">
        <Login change={changeType} />
      </div>
    </div>
  );
}
