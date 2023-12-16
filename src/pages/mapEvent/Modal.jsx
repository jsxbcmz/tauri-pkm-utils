import React from "react";
import { Modal, Form, Select, Input } from "antd";

export const TYPEMAP = [
  {
    label: "捕捉怪",
    value: "1",
    color: "#9F1922",
  },
  {
    label: "太晶怪",
    value: "2",
    color: "#484C53",
  },
  {
    label: "其他",
    value: "other",
    color: "#723ECC",
  },
];

export default (props) => {
  const { clickItem, onCancel, onSubmit } = props;
  const [form] = Form.useForm();

  const onOk = () => {
    onSubmit(form.getFieldsValue());
    onCancel();
  };

  return (
    <Modal
      title={"添加"}
      open
      destroyOnClose
      centered
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form
        name="basic"
        initialValues={clickItem}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 18,
        }}
        form={form}
        autoComplete="off"
        style={{ margin: "10px 0" }}
      >
        <Form.Item label="类型" name="type" required>
          <Select options={TYPEMAP} />
        </Form.Item>
        <Form.Item label="备注" name="note" required>
          <Input placeholder="备注" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
