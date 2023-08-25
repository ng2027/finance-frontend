import { Button, Tooltip } from "@nextui-org/react";

import { useState } from "react";
import { ConfigProvider, Input, Modal, Typography } from "antd";
import { WarningTwoTone } from "@ant-design/icons";
import { DeleteIcon } from "../icon";
import router from "next/router";
import { useDeleteSubscriptionMutation } from "@/hooks/useSubscriptionApi";
function DeleteSubscriptionModel({
  visible,
  handleCancel,
  handleOk,
  subscription,
  isLoading,
}: {
  visible: boolean;
  subscription: any;
  handleOk: Function | any;
  handleCancel: Function | any;
  isLoading: boolean;
}) {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#000000" } }}>
      <Modal
        destroyOnClose
        title="Delete Subscription"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Delete"
        okType="danger"
        footer={
          <Button
            className="dark"
            color="danger"
            onClick={() => handleOk()}
            isLoading={isLoading}
            //   isDisabled={updateTransactionisLoading}
          >
            Delete
          </Button>
        }
      >
        <p>
          <WarningTwoTone twoToneColor="#FF0000" /> Are you sure you want to
          delete this subscription: <b>{subscription.name}?</b>
        </p>
      </Modal>
    </ConfigProvider>
  );
}

export function DeleteSubscription({ data }: { data: any }) {
  const { deleteSubscription, deleteSubscriptionisLoading } =
    useDeleteSubscriptionMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    router.push(
      `${router.pathname}?delete=true`,
      `/subscription/${data._id}/delete`
    );
  };
  const handleOk = () => {
    deleteSubscription({ subscriptionID: data._id });
    router.push(`${router.pathname}`, `/subscription`);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    router.push(`${router.pathname}`, `/subscription`);
    setIsModalOpen(false);
  };
  return (
    <>
      <Tooltip color="danger" content="Delete">
        <span className="text-lg text-danger cursor-pointer active:opacity-50">
          <DeleteIcon onClick={showModal} />
        </span>
      </Tooltip>

      <DeleteSubscriptionModel
        visible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        subscription={data}
        isLoading={deleteSubscriptionisLoading}
      />
    </>
  );
}
