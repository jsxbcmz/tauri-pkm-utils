import { useState, useEffect, useCallback, useMemo } from "react";
import { Table, Input, Modal, Form, Select, Button, Popconfirm, message, Space } from "antd";
import fsUtils from "@utils/fs";
import { TYPE } from "@common/data";

const PokemonInfo = () => {
  const [infoList, setInfoList] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPokemonInfo = async () => {
      try {
        await fsUtils.readJson("1", setInfoList);
      } catch (error) {
        console.error("Failed to load pokemon info:", error);
        message.error("加载宝可梦信息失败");
      } finally {
        setLoading(false);
      }
    };

    loadPokemonInfo();
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchName(e.target.value);
  }, []);

  const handleEdit = useCallback((record = {}) => {
    setEditItem(record);
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback(async (id) => {
    try {
      const updatedList = infoList.filter(item => item.id !== id);
      await fsUtils.writeJson("1", updatedList);
      setInfoList(updatedList);
      message.success("宝可梦信息已删除");
    } catch (error) {
      console.error("Failed to delete pokemon info:", error);
      message.error("删除宝可梦信息失败");
    }
  }, [infoList]);

  const handleSubmit = useCallback(async (values) => {
    try {
      const { moves = [], special = "" } = values;
      const updatedList = [...infoList];
      
      if (editItem.id) {
        // 编辑现有记录
        const index = updatedList.findIndex(item => item.id === editItem.id);
        if (index !== -1) {
          updatedList[index] = { ...updatedList[index], ...values };
        }
      } else {
        // 添加新记录
        const newRecord = {
          ...values,
          id: Date.now() + Math.floor(Math.random() * 1000), // 避免重复ID
        };
        updatedList.push(newRecord);
      }

      await fsUtils.writeJson("1", updatedList);
      setInfoList(updatedList);
      setIsModalOpen(false);
      message.success(editItem.id ? "宝可梦信息已更新" : "宝可梦信息已添加");
    } catch (error) {
      console.error("Failed to submit pokemon info:", error);
      message.error("提交宝可梦信息失败");
    }
  }, [infoList, editItem]);

  const columns = useMemo(() => [
    {
      title: "名字",
      dataIndex: "name",
      width: "150px",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "技能类型",
      dataIndex: "moves",
      render: (moves) => moves ? moves.join(", ") : "",
      width: "200px",
    },
    {
      title: "注意备注",
      dataIndex: "special",
      render: (special) => special || "-",
    },
    {
      title: "操作",
      key: "action",
      width: "120px",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <Popconfirm
            title="确定删除?"
            okText="是"
            cancelText="否"
            onConfirm={() => handleDelete(record.id)}
          >
            <a style={{ color: 'red' }}>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ], [handleEdit, handleDelete]);

  const filteredData = useMemo(() => {
    if (!searchName) return infoList;
    return infoList.filter(item => 
      item.name.toLowerCase().includes(searchName.toLowerCase())
    );
  }, [infoList, searchName]);

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Input
          onChange={handleSearchChange}
          value={searchName}
          style={{ width: "200px", marginRight: '10px' }}
          placeholder="搜索宝可梦名字"
        />
        <Button type="primary" onClick={() => handleEdit()}>
          新增
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
      />

      <InfoModal
        editItem={editItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

const InfoModal = ({ editItem, isOpen, onClose, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue({
        ...editItem,
        moves: editItem.moves || [],
      });
    }
  }, [editItem, isOpen, form]);

  const onFinish = () => {
    form
      .validateFields()
      .then(values => {
        onSubmit(values);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title={editItem.id ? "编辑宝可梦信息" : "新增宝可梦信息"}
      open={isOpen}
      destroyOnClose
      onOk={onFinish}
      onCancel={() => {
        onClose();
        form.resetFields();
      }}
      okText="确认"
      cancelText="取消"
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
        style={{ margin: "10px 0" }}
      >
        <Form.Item 
          label="名字" 
          name="name" 
          rules={[{ required: true, message: '请输入宝可梦名字' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="技能类型" name="moves">
          <Select 
            mode="multiple" 
            showSearch 
            allowClear
            placeholder="选择技能类型"
          >
            {TYPE.map((type) => (
              <Select.Option key={type.name} value={type.name}>
                {type.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="special" label="注意备注">
          <Input.TextArea placeholder="注意备注" rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PokemonInfo;
