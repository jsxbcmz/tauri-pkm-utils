import { Layout, Menu } from "antd";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Raid from "@pages/raid";
import nav from "./nav";
import "./App.css";

const { Sider, Content } = Layout;

function AppContent() {
  const location = useLocation();
  const selectedKey = location.pathname || "/raid";

  const menuItems = nav.map((item) => ({
    key: item.path,
    label: <Link to={item.path}>{item.title}</Link>,
  }));

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={120} style={{ background: '#fff', paddingTop: '16px' }}>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout style={{ backgroundColor: '#fff' }}>
        <Content style={{ margin: '16px', overflow: 'initial' }}>
          <Routes>
            {nav.map((item) => (
              <Route key={item.path} path={item.path} element={<item.component />} />
            ))}
            <Route key="/" path="/" element={<Raid />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
