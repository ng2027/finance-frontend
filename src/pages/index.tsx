import { Layout } from "@/lib/(not-auth)/layout";
import { type ReactElement } from "react";
import { Image } from "@nextui-org/react";
import frontImg from "@/img/frontpage.png";
import { Typography } from "antd";
const { Title, Text } = Typography;
export default function Home() {
  return (
    <div className=" flex flex-col-reverse lg:flex-row justify-between lg:h-[90vh] p-5 sm:p-10 overflow-hidden">
      <div className="flex flex-col items-center justify-center lg:ml-[20px] front-blob">
        <div className="relative top-[75px] sm:left-[10px]">
          <div className="flex flex-row gap-x-3">
            <span className="text-6xl">Efficient</span>
            <span className="text-lime-500 text-7xl ">
              <b>Money</b>
            </span>
          </div>

          <div>
            <Title className="text-7xl ">Tracking & Management</Title>
          </div>

          <div className="flex flex-row-reverse ">
            <Text className="text-xl relative right-8">
              Master Your Money With <b>ExpenseXpert</b>
            </Text>
          </div>
        </div>

        <div className="oval-container">
          <div className="oval shadow-2xl "></div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4 sm:mt-0 lg:mr-[60px]">
        <Image
          className=" "
          isZoomed
          width={550}
          alt="Front Pg"
          src="https://i.ibb.co/zXkwSj0/frontpage.png"
        />
      </div>
    </div>
  );
}

Home.getLayout = function PageLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
