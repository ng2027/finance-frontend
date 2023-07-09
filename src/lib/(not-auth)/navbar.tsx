import { Button, ConfigProvider, Modal } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { Login, SignUp } from "../account";
import { useRouter } from "next/router";

function NavBar() {
  const router = useRouter();
  const [stateLogin, setStateLogin] = useState(true);
  const handleClick = () => {
    router.push(`${router.pathname}?login=true`, "/login");
  };

  const handleSwitch = () => {
    const asLink = !stateLogin ? "/login" : "/signup";
    setStateLogin((prev) => !prev);
    router.replace(`?login=true`, asLink);
  };

  const handleCloseModal = () => {
    router.back();
    setStateLogin(true);
  };

  React.useEffect(() => {
    let marker = document.querySelector(".marker") as HTMLElement;
    let item = document.querySelectorAll(".link-navbar");

    function indicator(e: any) {
      if (marker) {
        marker.style.left = String(Number(e.offsetLeft)) + "px";
        marker.style.width = String(Number(e.offsetWidth)) + "px";
      }
    }
    item.forEach((link) => {
      link.addEventListener("click", (e) => {
        indicator(e.target);
      });
    });
  }, []);
  return (
    <div className="shadow-lg p-5 pt-2 sm:pt-5 w-full sm:pb-6 bg-gradient-to-t from-gray-100 to-gray-300">
      <div className="flex flex-col sm:grid sm:grid-cols-5 items-center  gap-y-3">
        <h3 className="antd-title-3 sm:pl-5 col-span-2">ExpenseXpert</h3>
        <div className="col-span-2">
          <div className="flex flex-row gap-x-10 relative">
            <div className="marker"></div>
            <Link href={"/"} className="link-navbar" id="home-nav">
              Home
            </Link>
            <Link href={"/faq"} className="link-navbar">
              FAQ
            </Link>
            <Link href={"/contact"} className="link-navbar">
              Contact
            </Link>
          </div>
        </div>
        <div className="col-span-1">
          <ConfigProvider theme={{ token: { colorPrimary: "#000000" } }}>
            <Button
              type="primary"
              style={{ backgroundColor: "black", borderRadius: "6px" }}
              onClick={handleClick}
            >
              Login
            </Button>
          </ConfigProvider>
          {router.query.login && (
            <Modal open={true} onCancel={handleCloseModal} footer={[]}>
              {stateLogin ? (
                <Login change={handleSwitch} />
              ) : (
                <SignUp change={handleSwitch} />
              )}
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}
// oncancel issue
export { NavBar };
