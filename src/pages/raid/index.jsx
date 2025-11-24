import { useState, useEffect, useCallback, useMemo } from "react";
import { Select, Form, Checkbox, Input, Button, Popconfirm, message } from "antd";
import { TYPE, RESTRAINT } from "@common/data";
import fsUtils from "@utils/fs";

function Raid() {
  const [form] = Form.useForm();
  const [selectedType, setSelectedType] = useState("");
  const [bestTypes, setBestTypes] = useState([]);

  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [avoidTypes, setAvoidTypes] = useState([]);
  const [recommendTypes, setRecommendTypes] = useState([]);

  const [history, setHistory] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 获取最佳属性
  const getBestTypes = useCallback((type) => {
    const list = [];
    if (type) {
      Object.keys(RESTRAINT).forEach((attackerType) => {
        Object.keys(RESTRAINT[attackerType]).forEach((defenderType) => {
          if (RESTRAINT[attackerType][defenderType] > 1 && defenderType === type) {
            list.push(attackerType);
          }
        });
      });
    }
    return list;
  }, []);

  // 获取避免/推荐属性
  const getMoveTypes = useCallback((pokemonName, shouldAvoid, list) => {
    const result = [];
    if (!pokemonName) return [];

    const pokemon = list.find(p => p.name === pokemonName);
    if (!pokemon || !pokemon.moves) return [];

    const moves = pokemon.moves;
    moves.forEach(moveType => {
      Object.keys(RESTRAINT[moveType]).forEach(defenderType => {
        if (shouldAvoid ? RESTRAINT[moveType][defenderType] > 1 : RESTRAINT[moveType][defenderType] < 1) {
          result.push(defenderType);
        }
      });
    });

    // 统计类型出现次数
    const counted = result.reduce((acc, type) => {
      const existing = acc.find(item => item.name === type);
      if (existing) {
        existing.num += 1;
      } else {
        acc.push({ name: type, num: 1 });
      }
      return acc;
    }, []);
    
    return counted;
  }, []);

  useEffect(() => {
    setBestTypes(getBestTypes(selectedType));
  }, [selectedType, getBestTypes]);

  useEffect(() => {
    setAvoidTypes(getMoveTypes(selectedPokemon, true, pokemonList));
    setRecommendTypes(getMoveTypes(selectedPokemon, false, pokemonList));
  }, [selectedPokemon, pokemonList, getMoveTypes]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await Promise.all([
          fsUtils.readJson("1", setPokemonList),
          fsUtils.readJson("2", setHistory)
        ]);
      } catch (error) {
        console.error("Failed to load initial data:", error);
        message.error("加载数据失败");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const newRecord = {
        ...values,
        id: Date.now() + Math.floor(Math.random() * 1000), // 避免重复ID
      };

      const updatedHistory = [...history, newRecord];
      await fsUtils.writeJson("2", updatedHistory);
      setHistory(updatedHistory);
      form.resetFields();
      message.success("记录已添加");
    } catch (error) {
      console.error("Failed to add record:", error);
      message.error("添加记录失败");
    }
  };

  const handleTypeClick = (type) => {
    const newType = selectedType === type ? "" : type;
    setSelectedType(newType);
    form.setFieldsValue({ type: newType });
  };

  const handlePokemonChange = (value) => {
    setSelectedPokemon(value);
    form.setFieldsValue({ name: value });
  };

  const handleDelete = async (id) => {
    try {
      const updatedHistory = history.filter(item => item.id !== id);
      await fsUtils.writeJson("2", updatedHistory);
      setHistory(updatedHistory);
      message.success("记录已删除");
    } catch (error) {
      console.error("Failed to delete record:", error);
      message.error("删除记录失败");
    }
  };

  // 使用 useMemo 优化类型颜色查找
  const getTypeColor = useMemo(() => {
    const colorMap = {};
    TYPE.forEach(type => {
      colorMap[type.name] = type.color;
    });
    return (typeName) => colorMap[typeName] || '#ccc';
  }, []);

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>加载中...</div>;
  }

  return (
    <div className="home">
      <div className="type">
        <div>坑属性：</div>
        <div className="type-conatiner">
          <div style={{ width: "460px", marginRight: "15px" }}>
            <div>选择属性：{selectedType || "未选择"}</div>
            {TYPE.map((type) => (
              <span
                key={type.name}
                className={`type-item ${selectedType === type.name ? "activeType" : ""}`}
                style={{ 
                  background: type.color, 
                  borderColor: type.color,
                  cursor: 'pointer',
                  padding: '4px 8px',
                  margin: '2px',
                  borderRadius: '4px'
                }}
                onClick={() => handleTypeClick(type.name)}
              >
                {type.name}
              </span>
            ))}
          </div>
          <div style={{ width: "290px" }}>
            <div>最佳属性：</div>
            <div>
              {bestTypes.length > 0 ? (
                bestTypes.map(typeName => {
                  const type = TYPE.find(t => t.name === typeName);
                  return type ? (
                    <span
                      key={typeName}
                      className="type-item"
                      style={{
                        background: type.color,
                        borderColor: type.color,
                        padding: '4px 8px',
                        margin: '2px',
                        borderRadius: '4px'
                      }}
                    >
                      {typeName}
                    </span>
                  ) : null;
                })
              ) : (
                <span>无</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="type-conatiner">
          <div style={{ width: "150px", marginRight: "15px" }}>
            <div>坑宝可梦:</div>
            <Select
              style={{ width: "150px" }}
              showSearch
              placeholder="选择宝可梦"
              value={selectedPokemon}
              onChange={handlePokemonChange}
              allowClear
              optionFilterProp="children"
            >
              {pokemonList.map((pokemon) => (
                <Select.Option key={pokemon.name} value={pokemon.name}>
                  {pokemon.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div style={{ width: "290px", marginRight: "15px" }}>
            <div>避免属性:</div>
            {avoidTypes.length > 0 ? (
              avoidTypes
                .sort((a, b) => b.num - a.num)
                .map((typeInfo) => {
                  const type = TYPE.find(t => t.name === typeInfo.name);
                  const isBest = bestTypes.includes(typeInfo.name);
                  return type ? (
                    <span
                      key={`avoid-${typeInfo.name}`}
                      className={`type-item ${isBest ? "badType" : ""}`}
                      style={{
                        background: type.color,
                        borderColor: type.color,
                        padding: '4px 8px',
                        margin: '2px',
                        borderRadius: '4px'
                      }}
                    >
                      {typeInfo.name}-{typeInfo.num}
                    </span>
                  ) : null;
                })
            ) : (
              <span>无</span>
            )}
          </div>
          <div style={{ width: "290px" }}>
            <div>推荐属性:</div>
            {recommendTypes.length > 0 ? (
              recommendTypes
                .sort((a, b) => b.num - a.num)
                .map((typeInfo) => {
                  const type = TYPE.find(t => t.name === typeInfo.name);
                  const isBest = bestTypes.includes(typeInfo.name);
                  return type ? (
                    <span
                      key={`recommend-${typeInfo.name}`}
                      className={`type-item ${isBest ? "goodType" : ""}`}
                      style={{
                        background: type.color,
                        borderColor: type.color,
                        padding: '4px 8px',
                        margin: '2px',
                        borderRadius: '4px'
                      }}
                    >
                      {typeInfo.name}-{typeInfo.num}
                    </span>
                  ) : null;
                })
            ) : (
              <span>无</span>
            )}
          </div>
        </div>
      </div>

      {selectedPokemon && (
        <div>注意：{pokemonList.find(p => p.name === selectedPokemon)?.special || ''}</div>
      )}

      <Form
        name="raid-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={form}
        onFinish={handleSubmit}
        autoComplete="off"
        style={{ margin: "10px 0" }}
      >
        <Form.Item label="坑属性" name="type" noStyle>
          <Select
            style={{ width: "100px" }}
            showSearch
            placeholder="选择属性"
            allowClear
          >
            {TYPE.map((type) => (
              <Select.Option key={type.name} value={type.name}>
                {type.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="怪" name="name" noStyle>
          <Select
            style={{ width: "150px" }}
            showSearch
            placeholder="选择怪"
            allowClear
            optionFilterProp="children"
          >
            {pokemonList.map((pokemon) => (
              <Select.Option key={pokemon.name} value={pokemon.name}>
                {pokemon.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="成了吗"
          name="success"
          noStyle
          valuePropName="checked"
        >
          <Checkbox>是否成功</Checkbox>
        </Form.Item>
        <Form.Item name="notice" noStyle>
          <Input style={{ width: "200px" }} placeholder="备注" />
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {({ getFieldValue }) => {
            const type = getFieldValue("type");
            const name = getFieldValue("name");
            return (type && name) ? (
              <Form.Item noStyle>
                <Button type="primary" htmlType="submit">
                  添加
                </Button>
              </Form.Item>
            ) : null;
          }}
        </Form.Item>
      </Form>

      <div>历史记录：</div>
      <div
        style={{
          maxHeight: "320px",
          overflowY: "auto",
        }}
      >
        {history
          .filter((record) => {
            if (selectedType && selectedPokemon) {
              return record.type === selectedType && record.name === selectedPokemon;
            }
            return record.type === selectedType || record.name === selectedPokemon;
          })
          .map((record, index) => (
            <div key={record.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
              <span>
                {index + 1}: {record.type} -- {record.name} -- {record?.success ? "成了" : "失败"} -- {record?.notice || ''}
              </span>
              <Popconfirm
                title="确定删除?"
                okText="是"
                cancelText="否"
                onConfirm={() => handleDelete(record.id)}
              >
                <Button type="link" size="small">
                  删除
                </Button>
              </Popconfirm>
            </div>
          ))}
        {history.filter((record) => {
          if (selectedType && selectedPokemon) {
            return record.type === selectedType && record.name === selectedPokemon;
          }
          return record.type === selectedType || record.name === selectedPokemon;
        }).length === 0 && (
          <div>暂无匹配记录</div>
        )}
      </div>
    </div>
  );
}

export default Raid;
