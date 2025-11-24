import React, { useState, useEffect, useCallback } from "react";
import { Button, Select, message } from "antd";
import fsUtils from "@utils/fs";
import ImgItem from "./imgItem";
import EventItem from "./EventItem";
import Modal from "./Modal";
import "./index.css";

const MAP_OPTIONS = [
  { label: "paldea", value: "paldea", key: "paldea" },
  { label: "kitakami", value: "kitakami", key: "kitakami" },
  { label: "terarium", value: "terarium", key: "terarium" },
];

export default () => {
  const [activeKey, setActiveKey] = useState("paldea");
  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickItem, setClickItem] = useState({});
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        await fsUtils.readJson("3", setEvents);
      } catch (error) {
        console.error("Failed to load events:", error);
        message.error("加载事件失败");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const handleMapChange = useCallback((value) => {
    setActiveKey(value);
    setIsAdding(false);
    setIsModalOpen(false);
    setClickItem({});
  }, []);

  const handleMapClick = useCallback((e) => {
    if (!isAdding) return;
    
    const newPosition = {
      x: e.clientX - 100,
      y: e.clientY - 32
    };
    
    setClickPosition(newPosition);
    setIsModalOpen(true);
    setClickItem({});
  }, [isAdding]);

  const toggleAddingMode = useCallback(() => {
    setIsAdding(prev => !prev);
    setIsModalOpen(false);
  }, []);

  const handleSubmit = useCallback(async (values) => {
    try {
      const newEvent = {
        ...clickPosition,
        activeKey,
        id: Date.now() + Math.floor(Math.random() * 1000), // 避免重复ID
        ...values,
      };

      const updatedEvents = [...events, newEvent];
      await fsUtils.writeJson("3", updatedEvents);
      setEvents(updatedEvents);
      message.success("事件已添加");
    } catch (error) {
      console.error("Failed to add event:", error);
      message.error("添加事件失败");
    }
  }, [clickPosition, activeKey, events]);

  const handleDelete = useCallback(async (id) => {
    try {
      const updatedEvents = events.filter(event => event.id !== id);
      await fsUtils.writeJson("3", updatedEvents);
      setEvents(updatedEvents);
      message.success("事件已删除");
    } catch (error) {
      console.error("Failed to delete event:", error);
      message.error("删除事件失败");
    }
  }, [events]);

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>加载中...</div>;
  }

  return (
    <div className="mapEvent">
      <div style={{ marginBottom: '10px' }}>
        <Select
          onChange={handleMapChange}
          value={activeKey}
          style={{ width: "150px", marginRight: '10px' }}
          options={MAP_OPTIONS}
        />
        <Button onClick={toggleAddingMode}>
          {isAdding ? "取消添加" : "添加事件"}
        </Button>
      </div>
      
      <div className="mapEventMask" onClick={handleMapClick}>
        {events
          .filter(event => event.activeKey === activeKey)
          .map(event => (
            <EventItem 
              key={event.id} 
              {...event} 
              onDel={handleDelete} 
            />
          ))}
      </div>
      
      <div>
        <ImgItem type={activeKey} />
      </div>
      
      {isModalOpen && (
        <Modal
          clickItem={clickItem}
          onSubmit={handleSubmit}
          onCancel={toggleAddingMode}
        />
      )}
    </div>
  );
};
