import { Button } from "@nextui-org/react";
import { PlusCircleOutlined, DollarOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ConfigProvider, Input, InputNumber, Modal } from "antd";
const { TextArea } = Input;
function AddTransactionModal({
  visible,
  handleCancel,
  handleOk,
}: {
  visible: boolean;
  handleOk: Function | any;
  handleCancel: Function | any;
}) {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#000000" } }}>
      <Modal
        title="Add Transaction"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={<Button className="dark">Add</Button>}
      >
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-row justify-between gap-x-2">
            <Input placeholder="Name" className="w-[60%]"></Input>
            <InputNumber
              min={0}
              placeholder="Amount"
              className="w-[30%]"
              prefix={
                <div className="pr-2">
                  <DollarOutlined />
                </div>
              }
            ></InputNumber>
          </div>
          <TextArea rows={4} placeholder="Description" maxLength={400} />
        </div>
      </Modal>
    </ConfigProvider>
  );
}

export function AddTransaction() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button onClick={showModal}>
        <PlusCircleOutlined /> Add Transaction
      </Button>
      <AddTransactionModal
        visible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
}
