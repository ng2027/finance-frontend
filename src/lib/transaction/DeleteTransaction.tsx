import { Button, Tooltip } from "@nextui-org/react";

import { useState } from "react";
import { ConfigProvider, Input, Modal, Typography } from "antd";
import { WarningTwoTone } from "@ant-design/icons";
import { DeleteIcon } from "../icon";
import router from "next/router";
import { useDeleteTransactionMutation } from "@/hooks/useTransactionApi";
function DeleteTransactionModel({
  visible,
  handleCancel,
  handleOk,
  transaction,
  isLoading,
}: {
  visible: boolean;
  transaction: any;
  handleOk: Function | any;
  handleCancel: Function | any;
  isLoading: boolean;
}) {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#000000" } }}>
      <Modal
        destroyOnClose
        title="Delete Transaction"
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
          delete this transaction: <b>{transaction.name}?</b>
        </p>
      </Modal>
    </ConfigProvider>
  );
}

export function DeleteTransaction({ data }: { data: any }) {
  const { deleteTransaction, deleteTransactionisLoading } =
    useDeleteTransactionMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    router.push(
      `${router.pathname}?delete=true`,
      `/transaction/${data._id}/delete`
    );
  };
  const handleOk = () => {
    deleteTransaction({ transactionID: data._id });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    router.push(`${router.pathname}`, `/transaction`);
    setIsModalOpen(false);
  };
  return (
    <>
      <Tooltip color="danger" content="Delete transaction">
        <span className="text-lg text-danger cursor-pointer active:opacity-50">
          <DeleteIcon onClick={showModal} />
        </span>
      </Tooltip>

      <DeleteTransactionModel
        visible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        transaction={data}
        isLoading={deleteTransactionisLoading}
      />
    </>
  );
}
