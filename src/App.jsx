import { Menu } from "antd";
import { Route, Routes, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Raid from "@pages/raid";
import nav from "./nav";
import "./App.css";

function App() {
  const items = nav.map((i) => {
    return {
      key: i.path,
      label: <Link to={i.path}>{i.title}</Link>,
    };
  });

  return (
    <div className="g-flexbox">
      <BrowserRouter>
        <Menu
          style={{
            width: 100,
          }}
          mode="inline"
          items={items}
          defaultSelectedKeys={["/raid"]}
        />
        <div className="container">
          <Routes>
            {nav.map((i) => {
              return (
                <Route key={i.path} path={i.path} element={<i.component />} />
              );
            })}
            <Route key="/" path="/" element={<Raid />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
