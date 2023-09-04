import { Button, Tooltip } from "@nextui-org/react";

import { useState } from "react";
import { ConfigProvider, Input, Modal, Typography } from "antd";
import { WarningTwoTone } from "@ant-design/icons";
import { DeleteIcon } from "../icon";
import router from "next/router";
import { useCloseTabMutation } from "@/hooks/useTabApi";
function DeleteTabModel({
  visible,
  handleCancel,
  handleOk,
  tab,
  isLoading,
}: {
  visible: boolean;
  tab: any;
  handleOk: Function | any;
  handleCancel: Function | any;
  isLoading: boolean;
}) {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#000000" } }}>
      <Modal
        destroyOnClose
        title="Close Tab"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Delete"
        okType="danger"
        footer={
          <div className="flex flex-row-reverse gap-x-2 items-center">
            <Button
              className="dark"
              size="sm"
              onClick={() => handleOk(false)}
              isLoading={isLoading}
              //   isDisabled={updateTransactionisLoading}
            >
              No
            </Button>
            <Button
              className="dark"
              size="sm"
              onClick={() => handleOk(true)}
              isLoading={isLoading}
              //   isDisabled={updateTransactionisLoading}
            >
              Yes
            </Button>
            <div>Add Transaction:</div>
          </div>
        }
      >
        <p>
          <WarningTwoTone twoToneColor="#FF0000" /> Close Tab with{" "}
          <b>{tab.person}?</b>
        </p>
      </Modal>
    </ConfigProvider>
  );
}

export function DeleteTab({ data }: { data: any }) {
  const { closeTab, closeTabisLoading } = useCloseTabMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    router.push(`${router.pathname}?delete=true`, `/tab/${data._id}/delete`);
  };
  const handleOk = (add: boolean) => {
    closeTab({ tabID: data._id, add });
    router.push(`${router.pathname}`, `/tab`);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    router.push(`${router.pathname}`, `/tab`);
    setIsModalOpen(false);
  };
  return (
    <>
      <Tooltip color="danger" content="Close Tab">
        <span className="text-lg text-danger cursor-pointer active:opacity-50">
          <DeleteIcon onClick={showModal} />
        </span>
      </Tooltip>

      <DeleteTabModel
        visible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        tab={data}
        isLoading={closeTabisLoading}
      />
    </>
  );
}
