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
    form
      .validateFields()
      .then(values => {
        onSubmit(values);
        onCancel();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title={clickItem.id ? "编辑事件" : "添加事件"}
      open
      destroyOnClose
      centered
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form
        name="event-form"
        initialValues={clickItem}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        form={form}
        autoComplete="off"
        style={{ margin: "10px 0" }}
      >
        <Form.Item 
          label="类型" 
          name="type" 
          rules={[{ required: true, message: '请选择事件类型' }]}
        >
          <Select options={TYPEMAP} />
        </Form.Item>
        <Form.Item 
          label="备注" 
          name="note" 
          rules={[{ required: true, message: '请输入备注' }]}
        >
          <Input placeholder="请输入备注" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
