import { useState } from "react";
import Raid from "../src/pages/raid-6x";
import Menu from "../src/pages/menu";
import EditPokemonInfo from "../src/pages/editPokemonInfo";
import { Tabs } from "antd";
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState("1");

  const renderContemt = () => {
    switch (activeTab) {
      case "2":
        return <EditPokemonInfo />;
      case "3":
        return <Menu />;
      default:
        return <Raid />;
    }
  };
  return (
    <div style={{ margin: "0 10px" }}>
      <Tabs
        defaultActiveKey="1"
        onChange={setActiveTab}
        items={[
          {
            label: `6星团战`,
            key: "1",
          },
          {
            label: `宝可梦信息更新`,
            key: "2",
          },
          {
            label: `闪耀力对应材料`,
            key: "3",
          },
          
        ]}
      />

      {renderContemt()}
    </div>
  );
}

export default App;
