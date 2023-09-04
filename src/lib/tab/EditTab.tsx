import { Button, Tooltip } from "@nextui-org/react";
import { DollarOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import { ConfigProvider, Input, InputNumber, Modal, message } from "antd";

import DropDownCategory from "../category/categoryDropDown";
import { EditIcon } from "../icon";
import router from "next/router";
import { useUpdateTabMutation, useTabQuery } from "@/hooks/useTabApi";
const { TextArea } = Input;

function EditTabModal({
  visible,
  handleCancel,
  setVisible,
  handleOk,
  data,
  changeView,
}: {
  visible: boolean;
  data: any;
  setVisible: Function;
  handleOk: Function | any;
  handleCancel: Function | any;
  changeView: Function;
}) {
  const { tabData, isLoading } = useTabQuery({ tabId: data._id });
  const initialForm = useMemo(() => {
    return {
      person: data.person,
      contact: data.contact,
      amount: data.amount,
      is_borrowed: data.is_borrowed,
      description: data.description,
    };
  }, [tabData]);

  const [formData, setFormData] = useState<any>(initialForm);
  const { updateTab, updateTabisLoading } = useUpdateTabMutation();
  const [missingField, setMissingField] = useState<any>({
    person: false,
    amount: false,
    category: false,
    contact: false,
  });
  const [messageApi, contextHolder] = message.useMessage();

  const [category, setCategory] = useState<any>([data.category]);

  useEffect(() => {
    setFormData(initialForm);
    setCategory([data.category]);
  }, [tabData]);

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
      updateTab({
        reqData: { ...formData, category: Array.from(category).join(", ") },
        tabID: data._id,
        changeView: changeView,
      });

      setVisible(false);
      router.push(`${router.pathname}`, `/tab`);
    } else {
      error("Missing Fields");
    }
  }

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#000000" } }}>
      {contextHolder}
      <Modal
        destroyOnClose
        title="Edit Tab"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <Button
            className="dark"
            onClick={() => handleSubmit()}
            isLoading={updateTabisLoading}
          >
            Save
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

export function EditTab({ data, changeView }: { data: any; changeView: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    router.push(`${router.pathname}?edit=true`, `/tab/${data._id}/edit`);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    router.push(`${router.pathname}`, `/tab`);
    setIsModalOpen(false);
  };
  return (
    <>
      <Tooltip content="Edit">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <EditIcon onClick={showModal} />
        </span>
      </Tooltip>

      <EditTabModal
        setVisible={setIsModalOpen}
        visible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        data={data}
        changeView={changeView}
      />
    </>
  );
}
