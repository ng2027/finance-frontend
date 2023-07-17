import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 100, color: "black" }} spin />
);

export default function LoadingSpinner() {
  return (
    <div
      className=" absolute  left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      style={{ top: "40%" }}
    >
      <Spin indicator={antIcon} className="flex " />
    </div>
  );
}
