import { Button } from "@nextui-org/react";
import { PlusCircleOutlined, DollarOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ConfigProvider, Input, InputNumber, Modal, message } from "antd";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useCreateTransactionMutation } from "@/hooks/useTransactionApi";
import DropDownCategory from "../category/categoryDropDown";
const { TextArea } = Input;
function AddTransactionModal({
  visible,
  handleCancel,
  setVisible,
  handleOk,
}: {
  visible: boolean;
  setVisible: Function;
  handleOk: Function | any;
  handleCancel: Function | any;
}) {
  const initialForm = {
    name: "",
    amount: null,
    transaction_is_spending: true,
    description: "",
  };
  const [formData, setFormData] = useState<any>(initialForm);
  const { createTransaction, createTransactionisLoading } =
    useCreateTransactionMutation();
  const [missingField, setMissingField] = useState<any>({
    name: false,
    amount: false,
    category: false,
  });
  const [messageApi, contextHolder] = message.useMessage();

  const [category, setCategory] = useState<any>([]);
  function handleChange(e: any) {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  function handleNumberChange(value: any) {
    setFormData((prev: any) => ({
      ...prev,
      amount: value,
    }));
  }

  function handleTypechange() {
    setFormData((prev: any) => ({
      ...prev,
      transaction_is_spending: !prev.transaction_is_spending,
    }));
  }
  function error(msg: string) {
    messageApi.open({
      type: "error",
      content: msg,
      duration: 5,
    });
  }
  function handleSubmit() {
    var nameMiss = false;
    var amountMiss = false;
    var categoryMiss = false;

    if (formData.name.replace(/\s+/g, "") == "") {
      nameMiss = true;
    }
    if (formData.amount == 0 || !formData.amount) {
      amountMiss = true;
    }
    if (Array.from(category).join(", ") == "") {
      categoryMiss = true;
    }
    setMissingField({
      name: nameMiss,
      amount: amountMiss,
      category: categoryMiss,
    });
    if (!nameMiss && !amountMiss && !categoryMiss) {
      createTransaction({
        ...formData,
        category: Array.from(category).join(", "),
      });
      setVisible(false);
      resetModal();
    } else {
      error("Missing Fields");
    }
  }

  function resetModal() {
    setFormData(initialForm);
    setCategory([]);
  }
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#000000" } }}>
      {contextHolder}
      <Modal
        destroyOnClose
        title="Add New Transaction"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <Button
            className="dark"
            onClick={() => handleSubmit()}
            isLoading={createTransactionisLoading}
          >
            Add
          </Button>
        }
      >
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-row justify-between gap-x-2">
            <Input
              placeholder="Name"
              className="w-[60%]"
              status={missingField.name ? "error" : ""}
              name="name"
              value={formData.name}
              onChange={handleChange}
            ></Input>

            <Button
              isIconOnly
              size="sm"
              className={`relative left-1.5 ${
                formData.transaction_is_spending ? "bg-red-200" : "bg-green-200"
              }`}
              onClick={() => handleTypechange()}
            >
              {formData.transaction_is_spending ? (
                <AiOutlineMinus />
              ) : (
                <AiOutlinePlus />
              )}
            </Button>

            <InputNumber
              min={0}
              value={formData.amount}
              onChange={handleNumberChange}
              name="amount"
              placeholder="Amount"
              className="w-[30%]"
              prefix={
                <div className="pr-2">
                  <DollarOutlined />
                </div>
              }
              status={missingField.amount ? "error" : ""}
            ></InputNumber>
          </div>
          <TextArea
            value={formData.description}
            onChange={handleChange}
            name="description"
            rows={4}
            placeholder="Description"
            maxLength={400}
          />
          <div className="flex flex-row gap-x-2 items-center">
            <span id="clicktype">Select Category:</span>
            <DropDownCategory
              selectedKeys={category}
              setSelectedKeys={setCategory}
              filter={false}
              selectMissing={missingField.category}
            />
          </div>
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
        <PlusCircleOutlined />{" "}
        <span className="hidden sm:block">Add Transaction</span>
      </Button>
      <AddTransactionModal
        setVisible={setIsModalOpen}
        visible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
}
