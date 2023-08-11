import { Button, Tooltip } from "@nextui-org/react";
import { PlusCircleOutlined, DollarOutlined } from "@ant-design/icons";
import { useState } from "react";
import {
  Checkbox,
  ConfigProvider,
  Input,
  InputNumber,
  Modal,
  Typography,
  message,
} from "antd";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useUpdateTransactionMutation } from "@/hooks/useTransactionApi";
import DropDownCategory from "../category/categoryDropDown";
import { EditIcon } from "../icon";
import router from "next/router";
const { TextArea } = Input;
const { Text } = Typography;
function EditTransactionModel({
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
    amount: data.amount,
    transaction_is_spending: data.transaction_is_spending,
    description: data.description,
  };
  const [formData, setFormData] = useState<any>(initialForm);
  const { updateTransaction, updateTransactionisLoading } =
    useUpdateTransactionMutation();
  const [missingField, setMissingField] = useState<any>({
    name: false,
    amount: false,
    category: false,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [dateChange, setDateChange] = useState(false);
  const [category, setCategory] = useState<any>([data.category]);
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
      updateTransaction({
        reqData: {
          ...formData,
          category: Array.from(category).join(", "),
          date: dateChange,
        },
        transactionID: data._id,
      });
      setVisible(false);
      resetModal();
    } else {
      error("Missing Fields");
    }
  }

  function resetModal() {
    setDateChange(false);
  }
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#000000" } }}>
      {contextHolder}
      <Modal
        destroyOnClose
        title="Edit Transaction"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <Button
            className="dark"
            onClick={() => handleSubmit()}
            isLoading={updateTransactionisLoading}
          >
            Save
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
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-x-2 items-center">
              <span id="clicktype">Select Category:</span>
              <DropDownCategory
                selectedKeys={category}
                setSelectedKeys={setCategory}
                filter={false}
                selectMissing={missingField.category}
              />
            </div>
            <div className="flex flex-row gap-x-2 items-center">
              <Text type="secondary">Update Date?</Text>
              <Checkbox
                checked={dateChange}
                onChange={() => setDateChange((prev) => !prev)}
              ></Checkbox>
            </div>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
}

export function EditTransaction({ data }: { data: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    router.push(
      `${router.pathname}?edit=true`,
      `/transaction/${data._id}/edit`
    );
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    router.push(`${router.pathname}`, `/transaction`);
    setIsModalOpen(false);
  };
  return (
    <>
      <Tooltip content="Edit transaction">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <EditIcon onClick={showModal} />
        </span>
      </Tooltip>
      <EditTransactionModel
        setVisible={setIsModalOpen}
        visible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        data={data}
      />
    </>
  );
}
