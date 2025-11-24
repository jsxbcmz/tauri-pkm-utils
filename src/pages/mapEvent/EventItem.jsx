import React from "react";
import { Tooltip, Button } from "antd";
import "./index.css";
import { TYPEMAP } from "./Modal";

export default (props) => {
  const { x, y, note, activeKey, type, id, onDel } = props;
  return (
    <Tooltip
      title={
        <span>
          {note}
          <Button
            size="small"
            type="link"
            onClick={() => {
              onDel(id);
            }}
          >
            删除
          </Button>
        </span>
      }
    >
      <div
        key={`${x}_${y}_${activeKey}_${id}`}
        className="eventItem"
        style={{
          backgroundColor: TYPEMAP.find((i) => i.value === type)?.color,
          left: x - 4,
          top: y - 4,
        }}
      />
    </Tooltip>
  );
};
