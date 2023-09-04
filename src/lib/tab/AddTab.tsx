import { Button } from "@nextui-org/react";
import { PlusCircleOutlined, DollarOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { ConfigProvider, Input, InputNumber, Modal, message } from "antd";

import { useCreateTabMutation } from "@/hooks/useTabApi";
import DropDownCategory from "../category/categoryDropDown";
const { TextArea } = Input;
function AddTabModal({
  visible,
  handleCancel,
  setVisible,
  handleOk,
  isBorrowed,
  changeView,
}: {
  visible: boolean;
  isBorrowed: boolean;
  setVisible: Function;
  handleOk: Function | any;
  handleCancel: Function | any;
  changeView: Function;
}) {
  const initialForm = {
    person: "",
    contact: "",
    amount: null,
    is_borrowed: isBorrowed,
    description: "",
  };
  const [formData, setFormData] = useState<any>(initialForm);
  const { createTab, createTabisLoading } = useCreateTabMutation();
  const [missingField, setMissingField] = useState<any>({
    person: false,
    amount: false,
    category: false,
    contact: false,
  });
  const [messageApi, contextHolder] = message.useMessage();

  const [category, setCategory] = useState<any>(["64c9d4f7caeeac7b98a1fbea"]);
  useEffect(() => {
    setFormData((prev: any) => ({
      ...prev,
      is_borrowed: isBorrowed,
    }));
  }, [isBorrowed]);
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
      is_borrowed: !prev.is_borrowed,
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
    var personMiss = false;
    var amountMiss = false;
    var categoryMiss = false;
    var contactMiss = false;

    if (formData.person.replace(/\s+/g, "") == "") {
      personMiss = true;
    }
    if (formData.contact.replace(/\s+/g, "") == "") {
      contactMiss = true;
    }
    if (formData.amount == 0 || !formData.amount) {
      amountMiss = true;
    }
    if (Array.from(category).join(", ") == "") {
      categoryMiss = true;
    }
    setMissingField({
      person: personMiss,
      amount: amountMiss,
      category: categoryMiss,
      contact: contactMiss,
    });
    if (!personMiss && !amountMiss && !categoryMiss && !contactMiss) {
      createTab({
        ...formData,
        category: Array.from(category).join(", "),
      });
      changeView(formData.is_borrowed);
      setVisible(false);

      resetModal();
    } else {
      error("Missing Fields");
    }
  }

  function resetModal() {
    setFormData(initialForm);
    setCategory(["64c9d4f7caeeac7b98a1fbea"]);
  }
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#000000" } }}>
      {contextHolder}
      <Modal
        destroyOnClose
        title="Add New Tab"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <Button
            className="dark"
            onClick={() => handleSubmit()}
            isLoading={createTabisLoading}
          >
            Add
          </Button>
        }
      >
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-row justify-between gap-x-2">
            <Input
              placeholder="Person"
              status={missingField.person ? "error" : ""}
              name="person"
              className="w-[60%]"
              value={formData.person}
              onChange={handleChange}
            ></Input>{" "}
          </div>
          <div className="flex flex-row justify-between gap-x-2">
            <Input
              placeholder="Contact"
              status={missingField.contact ? "error" : ""}
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-[50%]"
            ></Input>
            <Button
              size="sm"
              className={`relative left-1.5 ${
                formData.is_borrowed ? "bg-red-200" : "bg-green-200"
              }`}
              onClick={() => handleTypechange()}
            >
              {formData.is_borrowed ? "Borrow" : "Lend"}
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

export function AddTab({
  isBorrowed,
  changeView,
}: {
  changeView: Function;
  isBorrowed: boolean;
}) {
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
        <PlusCircleOutlined /> <span className="hidden sm:block">Add Tab</span>
      </Button>
      <AddTabModal
        setVisible={setIsModalOpen}
        visible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        isBorrowed={isBorrowed}
        changeView={changeView}
      />
    </>
  );
}
