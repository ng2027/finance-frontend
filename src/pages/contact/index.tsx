import { Layout } from "@/lib/(not-auth)/layout";
import { Typography } from "antd";
import { ReactElement } from "react";
import { Image } from "@nextui-org/react";
const { Title } = Typography;
export default function Contact() {
  return (
    <div className="p-10 flex flex-col gap-y-10 ">
      <Title className="flex flex-row items-center justify-center">
        Contact Us
      </Title>

      <div className="flex flex-col  sm:flex-row justify-between px-[180px]">
        <div className="flex flex-col justify-center items-center gap-y-5">
          <a href="https://www.instagram.com/n0e1" target="_blank">
            <Image
              width={160}
              src="https://cdn-icons-png.flaticon.com/256/87/87390.png"
              alt="Instagram"
            />
          </a>

          <a href="https://www.instagram.com/n0e1" target="_blank">
            n0e1
          </a>
        </div>
        <div>
          <a
            href="https://discord.gg/ng.j"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ac3c481f273141736_icon_clyde_black_RGB.png"
              alt="Discord"
              className="w-8 h-8"
            />
          </a>
          <p>
            Discord:{" "}
            <a
              href="https://discord.gg/ng.j"
              target="_blank"
              rel="noopener noreferrer"
            >
              ng.j
            </a>
          </p>
        </div>
        <div>
          <img src="email-icon.png" alt="Email" className="w-8 h-8" />
          <p>
            Email:{" "}
            <a href="mailto:noeluniversity@Gmao.com">noeluniversity@Gmao.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

Contact.getLayout = function PageLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
