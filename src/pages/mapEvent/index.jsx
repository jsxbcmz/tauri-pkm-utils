import React, { useState, useEffect } from "react";
import { Button, Select } from "antd";
import fsUtils from "@utils/fs";
import ImgItem from "./imgItem";
import EventItem from "./EventItem";
import Modal from "./Modal";
import "./index.css";

export default () => {
  const [activeKey, setActiveKey] = useState("paldea");
  const [status, setStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [clickItem, setClickItem] = useState({});
  const [x, setX] = useState({});
  const [y, setY] = useState({});
  const [events, setEvents] = useState([]);
  console.log("events", events);
  useEffect(() => {
    fsUtils.readJson("3", setEvents);
  }, []);

  const onChange = (e) => {
    setActiveKey(e);
    setStatus(false);
    setOpen(false);
    setClickItem({});
  };

  const onClickEvent = (e) => {
    if (!status) return;
    setX(e.clientX - 100);
    setY(e.clientY - 32);
    setOpen(true);
    setClickItem({});
  };

  const onClickStatus = () => {
    setStatus(!status);
    setOpen(false);
  };

  const onSubmit = (v) => {
    const newList = [
      ...events,
      {
        x,
        y,
        activeKey,
        id: new Date().valueOf(),
        ...v,
      },
    ];

    fsUtils.writeJson("3", newList, () => {
      fsUtils.readJson("3", setEvents);
    });
  };

  const onDel = (id) => {
    fsUtils.writeJson(
      "3",
      events.filter((i) => i.id !== id),
      () => {
        fsUtils.readJson("3", setEvents);
      }
    );
  };

  return (
    <div className="mapEvent">
      <div>
        <Select
          onChange={onChange}
          value={activeKey}
          style={{ width: "150px" }}
          options={[
            {
              label: "paldea",
              value: "paldea",
              key: "paldea",
            },
            {
              label: "kitakami",
              value: "kitakami",
              key: "kitakami",
            },
            {
              label: "terarium",
              value: "terarium",
              key: "terarium",
            },
          ]}
        />
        <Button onClick={onClickStatus}>{status ? "取消" : "添加"}</Button>
      </div>
      <div className="mapEventMask" onClick={onClickEvent}>
        {events
          .filter((i) => i.activeKey === activeKey)
          .map((i) => (
            <EventItem {...i} onDel={onDel}/>
          ))}
      </div>
      <div>
        <ImgItem type={activeKey} />
      </div>
      {open ? (
        <Modal
          clickItem={clickItem}
          onSubmit={onSubmit}
          onCancel={onClickStatus}
        />
      ) : null}
    </div>
  );
};
