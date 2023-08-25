import { Button, Tooltip } from "@nextui-org/react";
import { DollarOutlined, CalendarOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ConfigProvider, Input, InputNumber, Modal, message } from "antd";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import DropDownCategory from "../category/categoryDropDown";
import { EditIcon } from "../icon";
import router from "next/router";
import { useUpdateSubscriptionMutation } from "@/hooks/useSubscriptionApi";
const { TextArea } = Input;

function EditSubscriptionModel({
  visible,
  handleCancel,
  setVisible,
  handleOk,
  data,
}: {
  visible: boolean;
  setVisible: Function;
  handleOk: Function | any;
  handleCancel: Function | any;
  data: any;
}) {
  const initialForm = {
    name: data.name,
    date: data.date,
    amount: data.amount,
    transaction_is_spending: data.transaction_is_spending,
    description: data.description,
  };
  const [formData, setFormData] = useState<any>(initialForm);
  const { updateSubscription, updateSubscriptionisLoading } =
    useUpdateSubscriptionMutation();
  const [missingField, setMissingField] = useState<any>({
    name: false,
    amount: false,
    category: false,
    date: false,
  });
  const [messageApi, contextHolder] = message.useMessage();

  const [category, setCategory] = useState<any>([data.category]);
  function handleChange(e: any) {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  function handleNumberChange(value: any, type: string) {
    setFormData((prev: any) => ({
      ...prev,
      [type]: value,
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
    var dateMiss = false;

    if (formData.name.replace(/\s+/g, "") == "") {
      nameMiss = true;
    }
    if (formData.amount == 0 || !formData.amount) {
      amountMiss = true;
    }
    if (!formData.date) {
      dateMiss = true;
    }
    if (Array.from(category).join(", ") == "") {
      categoryMiss = true;
    }
    setMissingField({
      name: nameMiss,
      amount: amountMiss,
      category: categoryMiss,
      date: dateMiss,
    });
    if (!nameMiss && !amountMiss && !categoryMiss && !dateMiss) {
      updateSubscription({
        reqData: {
          ...formData,
          category: Array.from(category).join(", "),
        },
        subscriptionID: data._id,
      });
      setVisible(false);
      router.push(`${router.pathname}`, `/subscription`);
    } else {
      error("Missing Fields");
    }
  }

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#000000" } }}>
      {contextHolder}
      <Modal
        destroyOnClose
        title="Edit Subscription"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <Button
            className="dark"
            onClick={() => handleSubmit()}
            isLoading={updateSubscriptionisLoading}
          >
            Save
          </Button>
        }
      >
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-row justify-between gap-x-2">
            <Input
              placeholder="Name"
              className="w-[45%]"
              status={missingField.name ? "error" : ""}
              name="name"
              value={formData.name}
              onChange={handleChange}
            ></Input>
            <InputNumber
              className="w-[16%]"
              placeholder="Date"
              value={formData.date}
              onChange={(e) => handleNumberChange(e, "date")}
              status={missingField.date ? "error" : ""}
              name="date"
              min={1}
              max={28}
              prefix={
                <div className="relative right-1.5">
                  <CalendarOutlined />
                </div>
              }
            ></InputNumber>
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
              onChange={(e) => handleNumberChange(e, "amount")}
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

export function EditSubscription({ data }: { data: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    router.push(
      `${router.pathname}?edit=true`,
      `/subscription/${data._id}/edit`
    );
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    router.push(`${router.pathname}`, `/subscription`);
    setIsModalOpen(false);
  };
  return (
    <>
      <Tooltip content="Edit">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <EditIcon onClick={showModal} />
        </span>
      </Tooltip>
      <EditSubscriptionModel
        setVisible={setIsModalOpen}
        visible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        data={data}
      />
    </>
  );
}
