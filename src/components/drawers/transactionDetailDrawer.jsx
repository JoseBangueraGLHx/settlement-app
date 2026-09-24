// import React from "react";
// import { Drawer, Spin, Typography, Tag, Collapse, Table, Row, Col, Button, Divider } from "antd";
// import { ArrowLeftOutlined } from "@ant-design/icons";

// const { Text, Title } = Typography;

// const styles = {
//   subText: {
//     color: "#737373",
//     fontSize: 14,
//     marginBottom: 4,
//   },
//   mainValue: {
//     fontSize: 15,
//     fontWeight: 400,
//     color: "#1f2937",
//   },
//   secondaryValue: {
//     fontSize: 11,
//     color: "#4b5563",
//     marginTop: 2,
//     fontWeight: "bold",
//   },
//   card: {
//     background: "#f5f5f5",
//     border: "1px solid #e5e7eb",
//     borderRadius: 8,
//     padding: 16,
//     marginTop: 16,
//   },
//   row: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "8px 0",
//     borderBottom: "1px solid #e5e7eb",
//   },
//   lastRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "8px 0 0",
//   },
// };

// const statusColors = {
//   Paid: "green",
//   Pending: "orange",
//   Processing: "blue",
//   Failed: "red",
//   Reversed: "purple",
//   Verified: "green",
// };

// const renderStatusTag = (value) => <Tag color={statusColors[value] || "default"}>{value}</Tag>;

// const itemStyle = {
//   backgroundColor: "#fff",
//   borderRadius: 8,
//   marginBottom: 12,
//   border: "none",
//   boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
// };

// const TransactionDetailDrawer = ({ visible, item, onClose }) => {
//   if (!visible && !item) return null;

//   const data = item || {};
//   const financialBreakdown = data.financialBreakdown || [];
//   const concentrationItems = data.concentrationItems || [];
//   const taxItems = data.taxItems || [];

//   const firstGroupItems = [
//     {
//       key: "financial",
//       label: <strong style={{ fontWeight: 600 }}>Financial Breakdown</strong>,
//       style: itemStyle,
//       children: (
//         <div style={{ ...styles.card, backgroundColor: "#fff", border: "1px solid #e5e7eb" }}>
//           {financialBreakdown.map((row, index) => (
//             <div
//               key={`${row.label}-${index}`}
//               style={index === financialBreakdown.length - 1 ? styles.lastRow : styles.row}
//             >
//               <span style={{ color: "#4b5563" }}>{row.label}</span>
//               <div style={{ textAlign: "right" }}>
//                 <div style={{ fontWeight: 600 }}>{row.value}</div>
//                 <div style={{ color: "#6b7280", fontSize: 12 }}>{row.currency}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ),
//     },
//   ];

//   const advancedGroupItems = [
//     {
//       key: "concentration",
//       label: <strong style={{ fontWeight: 600 }}>Concentration Items</strong>,
//       style: itemStyle,
//       children: (
//         <div style={{ backgroundColor: "#fff", display: "flex", flexDirection: "column", gap: 20 }}>
//           {concentrationItems.map((item, index) => (
//             <div key={index} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//               {/* Tarjeta Gris Superior */}
//               <div
//                 style={{
//                   backgroundColor: "#f3f4f6", // Gris ligeramente más visible
//                   borderRadius: 10,
//                   padding: "16px 14px",
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <div>
//                   <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 6 }}>Billing Descriptor</div>
//                   <div style={{ fontWeight: 600, fontSize: 13, color: "#111827" }}>{item.billingDescriptor}</div>
//                 </div>

//                 <div style={{ textAlign: "right" }}>
//                   <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 6 }}>Current Status</div>
//                   {renderStatusTag(item.status)}
//                 </div>
//               </div>

//               {/* Fila Inferior */}
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   padding: "0 10px 8px 10px", // Padding lateral e inferior para dar aire
//                 }}
//               >
//                 <div>
//                   <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 6 }}>Batch Code</div>
//                   <div style={{ fontWeight: 600, fontSize: 13, color: "#111827" }}>{item.batchCode}</div>
//                 </div>

//                 <div style={{ textAlign: "right" }}>
//                   <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 6 }}>Entry Type</div>
//                   <div style={{ fontWeight: 600, fontSize: 13, color: "#111827" }}>{item.entryType}</div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ),
//     },
//     {
//       key: "tax",
//       label: <strong style={{ fontWeight: 600 }}>Tax Items & Nested Data</strong>,
//       style: itemStyle,
//       children: (
//         <div style={{ ...styles.card, backgroundColor: "#fff", border: "1px solid #e5e7eb" }}>
//           <Table
//             size="small"
//             bordered
//             pagination={false}
//             dataSource={taxItems}
//             columns={[
//               {
//                 title: "Tax Component",
//                 dataIndex: "taxComponent",
//                 key: "taxComponent",
//                 sorter: (a, b) => a.taxComponent.localeCompare(b.taxComponent),
//               },
//               {
//                 title: "Rate",
//                 dataIndex: "rate",
//                 key: "rate",
//                 sorter: (a, b) => parseFloat(a.rate) - parseFloat(b.rate),
//               },
//               {
//                 title: "Amount",
//                 dataIndex: "amount",
//                 key: "amount",
//               },
//             ]}
//             rowKey={(record) => `${record.taxComponent}-${record.amount}`}
//           />
//         </div>
//       ),
//     },
//   ];

//   return (
//     <Drawer
//       title={
//         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <div>
//             <Title level={4} style={{ margin: 0, fontWeight: 600 }}>
//               Transaction Details
//             </Title>
//             <Text type="secondary" style={{ fontSize: 12 }}>
//               View complete information about this transaction
//             </Text>
//           </div>
//         </div>
//       }
//       placement="right"
//       width={640}
//       open={visible}
//       onClose={onClose}
//       destroyOnClose
//       closeIcon={<span style={{ fontSize: 18 }}>×</span>}
//       style={{ backgroundColor: "#F5F5F5" }}
//       footer={
//         <div style={{ padding: "12px 16px", backgroundColor: "#fff" }}>
//           <Button icon={<ArrowLeftOutlined />} onClick={onClose}>
//             Back
//           </Button>
//         </div>
//       }
//     >
//       {item ? (
//         <div style={{ padding: "0 16px" }}>
//           <Row gutter={16} style={{ marginTop: 10, marginBottom: 4 }}>
//             <Col span={12}>
//               <div style={styles.subText}>Account ID</div>
//               <div style={styles.mainValue}>{data.accountId || "Acme Corporation"}</div>
//               <div style={styles.secondaryValue}>{data.accountNumber || "POS-99D23401"}</div>
//             </Col>

//             <Col span={12}>
//               <Row gutter={8}>
//                 <Col span={12}>
//                   <div style={styles.subText}>Creation Date</div>
//                   <div style={styles.mainValue}>{data.creationDate || "01-05-2026"}</div>
//                   <div style={styles.secondaryValue}>{data.creationTime || "04:30:00"}</div>
//                 </Col>
//                 <Col span={12}>
//                   <div style={styles.subText}>Current Status</div>
//                   <div style={styles.mainValue}>{data.currentStatus || data.status || "Pending"}</div>
//                 </Col>
//               </Row>
//             </Col>
//           </Row>

//           <Divider />

//           <div style={{ ...styles.card, marginBottom: 16, backgroundColor: "#fff", border: "1px solid #e5e7eb" }}>
//             <Title level={4} style={{ margin: "0 0 12px" }}>
//               Main Settlement Info
//             </Title>
//             <Row gutter={[16, 12]}>
//               <Col span={12}>
//                 <Text type="secondary">Party ID</Text>
//               </Col>
//               <Col span={12} style={{ textAlign: "right" }}>
//                 <Text strong>{data.partyId || "P-001"}</Text>
//               </Col>

//               <Col span={12}>
//                 <Text type="secondary">Agreement ID</Text>
//               </Col>
//               <Col span={12} style={{ textAlign: "right" }}>
//                 <Text strong>{data.agreementId || "AGR-1"}</Text>
//               </Col>

//               <Col span={12}>
//                 <Text type="secondary">Settlement Account</Text>
//               </Col>
//               <Col span={12} style={{ textAlign: "right" }}>
//                 <Text strong>{data.settlementAccount || "1234567890"}</Text>
//               </Col>
//             </Row>
//           </div>

//           <div style={{ marginBottom: 16 }}>
//             <Collapse
//               defaultActiveKey={["financial"]}
//               ghost
//               expandIconPosition="end"
//               items={firstGroupItems}
//               style={{ background: "transparent" }}
//             />

//             <div
//               style={{
//                 fontWeight: 700,
//                 fontSize: 14,
//                 color: "#1f2937",
//                 margin: "16px 0 8px 4px",
//               }}
//             >
//               Advanced Data
//             </div>

//             <Collapse ghost expandIconPosition="end" items={advancedGroupItems} style={{ background: "transparent" }} />
//           </div>
//         </div>
//       ) : (
//         <Spin />
//       )}
//     </Drawer>
//   );
// };

// export default TransactionDetailDrawer;

import React from "react";
import { Drawer, Spin, Typography, Tag, Collapse, Table, Row, Col, Button, Divider } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const EMPTY = "-"; // placeholder neutro, nunca datos falsos con apariencia real

const styles = {
  subText: { color: "#737373", fontSize: 14, marginBottom: 4 },
  mainValue: { fontSize: 15, fontWeight: 400, color: "#1f2937" },
  secondaryValue: { fontSize: 11, color: "#4b5563", marginTop: 2, fontWeight: "bold" },
  card: { background: "#f5f5f5", border: "1px solid #e5e7eb", borderRadius: 8, padding: 16, marginTop: 16 },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #e5e7eb",
  },
  lastRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0 0" },
};

const statusColors = {
  Paid: "green",
  Pending: "orange",
  Processing: "blue",
  Failed: "red",
  Reversed: "purple",
};

// Estados con colores custom exactos (fondo + texto), vía style
const customStatusStyles = {
  Verified: {
    color: "rgba(1, 102, 48, 1)",
    backgroundColor: "rgba(246, 255, 237, 1)",
    borderColor: "rgba(183, 235, 143, 1)",
  },
};

const renderStatusTag = (value) => {
  const customStyle = customStatusStyles[value];

  if (customStyle) {
    return <Tag style={customStyle}>{value || EMPTY}</Tag>;
  }

  return <Tag color={statusColors[value] || "default"}>{value || EMPTY}</Tag>;
};

const itemStyle = {
  backgroundColor: "#fff",
  borderRadius: 8,
  marginBottom: 12,
  border: "none",
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
};

// --- Subcomponentes reutilizables: la cabecera (label) es siempre fija, el contenido varía ---

// Campo del resumen superior (Account ID, Creation Date, Current Status...)
const SummaryField = ({ label, value, secondary }) => (
  <>
    <div style={styles.subText}>{label}</div>
    <div style={styles.mainValue}>{value ?? EMPTY}</div>
    {secondary !== undefined && <div style={styles.secondaryValue}>{secondary ?? EMPTY}</div>}
  </>
);

// Fila label/valor dentro de "Main Settlement Info" (Party ID, Agreement ID, Settlement Account...)
const InfoRow = ({ label, value }) => (
  <>
    <Col span={12}>
      <Text type="secondary">{label}</Text>
    </Col>
    <Col span={12} style={{ textAlign: "right" }}>
      <Text strong>{value ?? EMPTY}</Text>
    </Col>
  </>
);

const FinancialBreakdownList = ({ items }) => (
  // <div style={{ ...styles.card, backgroundColor: "#fff", border: "1px solid #e5e7eb" }}>
  <div>
    {items.map((row, index) => (
      <div key={`${row.label}-${index}`} style={index === items.length - 1 ? styles.lastRow : styles.row}>
        <span style={{ color: "#4b5563" }}>{row.label}</span>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 600 }}>{row.value ?? EMPTY}</div>
          <div style={{ color: "#6b7280", fontSize: 12 }}>{row.currency}</div>
        </div>
      </div>
    ))}
  </div>
);

const ConcentrationItemCard = ({ item }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    <div
      style={{
        backgroundColor: "#f3f4f6",
        borderRadius: 10,
        padding: "16px 14px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 6 }}>Billing Descriptor</div>
        <div style={{ fontWeight: 600, fontSize: 13, color: "#111827" }}>{item.billingDescriptor ?? EMPTY}</div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 6 }}>Current Status</div>
        {renderStatusTag(item.status)}
      </div>
    </div>

    <div style={{ display: "flex", justifyContent: "space-between", padding: "0 10px 8px 10px" }}>
      <div>
        <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 6 }}>Batch Code</div>
        <div style={{ fontWeight: 600, fontSize: 13, color: "#111827" }}>{item.batchCode ?? EMPTY}</div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 6 }}>Entry Type</div>
        <div style={{ fontWeight: 600, fontSize: 13, color: "#111827" }}>{item.entryType ?? EMPTY}</div>
      </div>
    </div>
  </div>
);

const TAX_COLUMNS = [
  {
    title: "Tax Component",
    dataIndex: "taxComponent",
    key: "taxComponent",
    sorter: (a, b) => a.taxComponent.localeCompare(b.taxComponent),
  },
  { title: "Rate", dataIndex: "rate", key: "rate", sorter: (a, b) => parseFloat(a.rate) - parseFloat(b.rate) },
  { title: "Amount", dataIndex: "amount", key: "amount" },
];

const TaxItemsTable = ({ items, note }) => (
  // <div style={{ ...styles.card, backgroundColor: "#fff", border: "1px solid #e5e7eb" }}>
  <div>
    <Table
      size="small"
      bordered
      pagination={false}
      dataSource={items}
      columns={TAX_COLUMNS}
      rowKey={(record) => `${record.taxComponent}-${record.amount}`}
    />

    <div
      style={{
        fontSize: 12,
        color: "#6b7280",
        marginTop: 8,
        lineHeight: 1.5,
      }}
    >
      {note}
    </div>
  </div>
);

const TransactionDetailDrawer = ({
  visible,
  item,
  onClose,
  title = "Transaction Details",
  description = "View complete information about this transaction",
}) => {
  if (!visible && !item) return null;

  const data = item || {};
  const financialBreakdown = data.financialBreakdown || [];
  const concentrationItems = data.concentrationItems || [];
  const taxItems = data.taxItems || [];

  // Cabeceras fijas del resumen superior — el valor de cada una viene de `data`
  const summaryFields = [
    { key: "accountId", label: "Account ID", value: data.accountId, secondary: data.accountNumber },
    { key: "creationDate", label: "Creation Date", value: data.creationDate, secondary: data.creationTime },
    { key: "currentStatus", label: "Current Status", value: data.currentStatus ?? data.status },
  ];

  // Cabeceras fijas de "Main Settlement Info" — agregar un campo nuevo es agregar una línea aquí
  const mainSettlementFields = [
    { key: "partyId", label: "Party ID", value: data.partyId },
    { key: "agreementId", label: "Agreement ID", value: data.agreementId },
    { key: "settlementAccount", label: "Settlement Account", value: data.settlementAccount },
  ];

  // Nota al pie de la tabla de impuestos, construida con datos reales de la transacción
  const taxNote = `* Tax calculated based on agreement ${data.agreementId ?? EMPTY} jurisdiction "${
    data.jurisdiction ?? EMPTY
  }". Final reconciliation subject to monthly audit.`;

  const firstGroupItems = [
    {
      key: "financial",
      label: <strong style={{ fontWeight: 600 }}>Financial Breakdown</strong>,
      style: itemStyle,
      children: <FinancialBreakdownList items={financialBreakdown} />,
    },
  ];

  const advancedGroupItems = [
    {
      key: "concentration",
      label: <strong style={{ fontWeight: 600 }}>Concentration Items</strong>,
      style: itemStyle,
      children: (
        // <div style={{ backgroundColor: "#fff", display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          {concentrationItems.map((concentrationItem, index) => (
            <ConcentrationItemCard key={index} item={concentrationItem} />
          ))}
        </div>
      ),
    },
    {
      key: "tax",
      label: <strong style={{ fontWeight: 600 }}>Tax Items & Nested Data</strong>,
      style: itemStyle,
      children: <TaxItemsTable items={taxItems} note={taxNote} />,
    },
  ];

  return (
    <Drawer
      title={
        <div>
          <Title level={4} style={{ margin: 0, fontWeight: 600 }}>
            {title}
          </Title>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {description}
          </Text>
        </div>
      }
      placement="right"
      width={640}
      open={visible}
      onClose={onClose}
      destroyOnClose
      closeIcon={<span style={{ fontSize: 18 }}>×</span>}
      style={{ backgroundColor: "#F5F5F5" }}
      footer={
        <div style={{ padding: "12px 16px", backgroundColor: "#fff" }}>
          <Button icon={<ArrowLeftOutlined />} onClick={onClose}>
            Back
          </Button>
        </div>
      }
    >
      {item ? (
        <div style={{ padding: "0 16px" }}>
          <Row gutter={16} style={{ marginTop: 10, marginBottom: 4 }}>
            <Col span={12}>
              <SummaryField {...summaryFields[0]} />
            </Col>
            <Col span={12}>
              <Row gutter={8}>
                <Col span={12}>
                  <SummaryField {...summaryFields[1]} />
                </Col>
                <Col span={12}>
                  <SummaryField {...summaryFields[2]} />
                </Col>
              </Row>
            </Col>
          </Row>

          <Divider />

          <div style={{ ...styles.card, marginBottom: 16, backgroundColor: "#fff", border: "1px solid #e5e7eb" }}>
            <Title level={4} style={{ margin: "0 0 12px" }}>
              Main Settlement Info
            </Title>
            <Row gutter={[16, 12]}>
              {mainSettlementFields.map((field) => (
                <InfoRow key={field.key} label={field.label} value={field.value} />
              ))}
            </Row>
          </div>

          <div style={{ marginBottom: 16 }}>
            <Collapse
              defaultActiveKey={["financial"]}
              ghost
              expandIconPosition="end"
              items={firstGroupItems}
              style={{ background: "transparent" }}
            />

            <div style={{ fontWeight: 700, fontSize: 14, color: "#1f2937", margin: "16px 0 8px 4px" }}>
              Advanced Data
            </div>

            <Collapse ghost expandIconPosition="end" items={advancedGroupItems} style={{ background: "transparent" }} />
          </div>
        </div>
      ) : (
        <Spin />
      )}
    </Drawer>
  );
};

export default TransactionDetailDrawer;
