import { Typography, Card, Row, Col } from "antd";
import { TYPE } from "@common/data";

const { Title } = Typography;

export default () => {
  return (
    <div style={{ padding: '16px' }}>
      <Title level={2}>食材对照表</Title>
      <Row gutter={[16, 16]}>
        {TYPE.map((type) => (
          <Col xs={24} sm={12} md={8} lg={6} key={type.material}>
            <Card
              style={{
                backgroundColor: type.color,
                borderColor: type.color,
                color: 'white',
                textAlign: 'center'
              }}
              bodyStyle={{ padding: '12px' }}
            >
              <div style={{ fontWeight: 'bold' }}>{type.name}</div>
              <div>{type.material}</div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
