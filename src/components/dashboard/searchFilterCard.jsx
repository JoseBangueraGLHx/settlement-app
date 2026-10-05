// import React, { useRef } from "react";
// import { Row, Col, Form, Input, Select, DatePicker, Space, Button, Typography, Tooltip } from "antd";
// import { CheckCircleFilled, QuestionCircleOutlined } from "@ant-design/icons";

// const { Text } = Typography;
// const { RangePicker } = DatePicker;
// const { Option } = Select;

// // Regla de negocio: rango de fechas máximo de 30 días
// const validateDateRange = (range) => {
//   if (!range || range.length !== 2) return false;
//   const [start, end] = range;
//   if (!start || !end) return false;
//   const diff = end.diff(start, "day");
//   return diff >= 0 && diff <= 30;
// };

// const SearchFilterCard = ({ form, onApply, onReset, loading, statusOptions }) => {
//   const accountRef = useRef(null);
//   const settlementRef = useRef(null);

//   const statusValue = Form.useWatch("status", form);
//   const dateRangeValue = Form.useWatch("dateRange", form);

//   const isApplyDisabled = !statusValue || !validateDateRange(dateRangeValue);

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//       <Form form={form} layout="vertical">
//         <Row gutter={[24, 20]}>
//           <Col span={8}>
//             <Form.Item shouldUpdate>
//               {() => {
//                 const val = form.getFieldValue("accountId") || "";
//                 const valid = val && val.length === 8;
//                 const display = val ? `CUIT - ${val}` : "";
//                 return (
//                   <Form.Item
//                     name="accountId"
//                     label="Account ID"
//                     rules={[{ len: 8, message: "Must be exactly 8 characters" }]}
//                   >
//                     <Input
//                       ref={accountRef}
//                       placeholder="CUIT - 20123456789"
//                       value={display}
//                       onChange={(e) => {
//                         let text = e.target.value || "";
//                         if (text.startsWith("CUIT -")) text = text.slice("CUIT -".length).trimStart();
//                         text = text.replace(/\D/g, "");
//                         if (text.length > 8) text = text.slice(0, 8);
//                         form.setFieldsValue({ accountId: text });
//                         setTimeout(() => {
//                           const node = accountRef.current?.input || accountRef.current;
//                           try {
//                             const len = text ? `CUIT - ${text}`.length : 0;
//                             if (node && node.setSelectionRange) node.setSelectionRange(len, len);
//                           } catch (err) {}
//                         }, 0);
//                       }}
//                       inputMode="numeric"
//                       style={{ width: "100%" }}
//                       suffix={valid ? <CheckCircleFilled style={{ color: "#40B394" }} /> : null}
//                     />
//                   </Form.Item>
//                 );
//               }}
//             </Form.Item>
//           </Col>

//           <Col span={8}>
//             <Form.Item shouldUpdate>
//               {() => {
//                 const val = form.getFieldValue("settlementId") || "";
//                 const valid = val && val.length === 8;
//                 const display = val ? `STL-${val}` : "";
//                 return (
//                   <Form.Item
//                     name="settlementId"
//                     label="Settlement ID"
//                     rules={[
//                       { required: false, message: "Settlement ID is required" },
//                       { len: 8, message: "Must be exactly 8 characters" },
//                     ]}
//                   >
//                     <Input
//                       ref={settlementRef}
//                       placeholder="STL-10449200"
//                       value={display}
//                       onChange={(e) => {
//                         let text = e.target.value || "";
//                         if (text.startsWith("STL-")) text = text.slice("STL-".length);
//                         text = text.replace(/\D/g, "");
//                         if (text.length > 8) text = text.slice(0, 8);
//                         form.setFieldsValue({ settlementId: text });
//                         setTimeout(() => {
//                           const node = settlementRef.current?.input || settlementRef.current;
//                           try {
//                             const len = text ? `STL-${text}`.length : 0;
//                             if (node && node.setSelectionRange) node.setSelectionRange(len, len);
//                           } catch (err) {}
//                         }, 0);
//                       }}
//                       style={{ width: "100%" }}
//                       suffix={valid ? <CheckCircleFilled style={{ color: "#40B394" }} /> : null}
//                     />
//                   </Form.Item>
//                 );
//               }}
//             </Form.Item>
//           </Col>
//         </Row>

//         <Row gutter={[24, 20]}>
//           <Col span={8}>
//             <Form.Item name="status" label="Status" rules={[{ required: true, message: "Status is required" }]}>
//               <Select placeholder="All">
//                 {statusOptions.map((s) => (
//                   <Option key={s} value={s}>
//                     {s}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           </Col>

//           <Col span={8}>
//             <Form.Item
//               name="dateRange"
//               label={
//                 <span>
//                   Date{" "}
//                   <Tooltip title="Selecciona un rango de fechas de máximo 30 días">
//                     <QuestionCircleOutlined style={{ marginLeft: 4, color: "#999" }} />
//                   </Tooltip>
//                 </span>
//               }
//               rules={[
//                 { required: true, message: "Date is required" },
//                 {
//                   validator(_, value) {
//                     if (validateDateRange(value)) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(new Error("Date range must be maximum 30 days"));
//                   },
//                 },
//               ]}
//             >
//               <RangePicker
//                 style={{ width: "100%" }}
//                 onChange={(dates) => {
//                   form.setFieldsValue({ dateRange: dates });
//                   form.validateFields(["dateRange"]);
//                 }}
//               />
//             </Form.Item>
//             <Text type="secondary" style={{ fontSize: 11, marginTop: -12, display: "block" }}>
//               Invoices displayed are limited to a maximum of 30 days old
//             </Text>
//           </Col>

//           {/* Action Buttons */}
//           <Col xs={24} sm={8} md={6} style={{ display: "flex", alignItems: "center", paddingTop: 10 }}>
//             <Space size="middle" style={{ paddingBottom: "3%" }}>
//               <Button
//                 type="primary"
//                 onClick={onApply}
//                 disabled={isApplyDisabled || loading}
//                 style={{
//                   backgroundColor: isApplyDisabled ? "#E5E5E5" : "#FFC72C",
//                   borderColor: isApplyDisabled ? "#E5E5E5" : "#FFC72C",
//                   color: isApplyDisabled ? "#A0A0A0" : "#000000",
//                   fontWeight: 600,
//                   height: 40,
//                   padding: "0 24px",
//                   borderRadius: 6,
//                   boxShadow: "none",
//                 }}
//               >
//                 Apply
//               </Button>
//               <Tooltip title="Reset all filters to default values ​​to perform new searches.">
//                 <Button
//                   onClick={onReset}
//                   style={{
//                     height: 40,
//                     padding: "0 24px",
//                     borderRadius: 6,
//                     borderColor: "#D9D9D9",
//                   }}
//                 >
//                   Reset
//                 </Button>
//               </Tooltip>
//             </Space>
//           </Col>
//         </Row>
//       </Form>
//     </div>
//   );
// };

// export default SearchFilterCard;

import React from "react";
import { Row, Col, Form, Input, Select, DatePicker, Space, Button, Typography, Tooltip } from "antd";
import { CheckCircleFilled, QuestionCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

// Regla de negocio: rango de fechas máximo de 30 días
const validateDateRange = (range) => {
  if (!range || range.length !== 2) return false;
  const [start, end] = range;
  if (!start || !end) return false;
  const diff = end.diff(start, "day");
  return diff >= 0 && diff <= 30;
};

/**
 * Input numérico que muestra un prefijo (ej. "CUIT - ") apenas el usuario empieza a tipear.
 * Al Form le llega solo el número (ej. "11111111"), sin el prefijo.
 */
const PrefixedNumericInput = React.forwardRef(
  ({ value = "", onChange, prefixText, maxLength = 8, ...rest }, ref) => {
    const display = value ? `${prefixText}${value}` : "";
    const isValid = value.length === maxLength;

    const handleChange = (e) => {
      let text = e.target.value || "";
      if (text.startsWith(prefixText)) text = text.slice(prefixText.length);
      text = text.replace(/\D/g, "").slice(0, maxLength);
      onChange?.(text);
    };

    return (
      <Input
        {...rest}
        ref={ref}
        value={display}
        onChange={handleChange}
        inputMode="numeric"
        style={{ width: "100%" }}
        // <span /> en vez de null: si el suffix alterna entre null y un elemento,
        // AntD re-monta el input y se pierde el foco mientras se tipea
        suffix={isValid ? <CheckCircleFilled style={{ color: "#40B394" }} /> : <span />}
      />
    );
  }
);

PrefixedNumericInput.displayName = "PrefixedNumericInput";

const SearchFilterCard = ({ form, onApply, onReset, loading, statusOptions }) => {
  const statusValue = Form.useWatch("status", form);
  const dateRangeValue = Form.useWatch("dateRange", form);

  const isApplyDisabled = !statusValue || !validateDateRange(dateRangeValue);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Form form={form} layout="vertical">
        <Row gutter={[24, 20]}>
          <Col span={8}>
            <Form.Item
              name="accountId"
              label="Account ID"
              // Si en Figma el campo es obligatorio (asterisco rojo), agrega:
              // { required: true, message: "Account ID is required" },
              rules={[{ len: 8, message: "Must be exactly 8 characters" }]}
              extra="Must be exactly 8 characters"
            >
              <PrefixedNumericInput prefixText="CUIT - " placeholder="CUIT - 00000000" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="settlementId"
              label="Settlement ID"
              rules={[{ len: 8, message: "Must be exactly 8 characters" }]}
            >
              <PrefixedNumericInput prefixText="STL - " placeholder="STL - 00000000" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[24, 20]}>
          <Col span={8}>
            <Form.Item name="status" label="Status" rules={[{ required: true, message: "Status is required" }]}>
              <Select placeholder="All">
                {statusOptions.map((s) => (
                  <Option key={s} value={s}>
                    {s}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="dateRange"
              label={
                <span>
                  Date{" "}
                  <Tooltip title="Selecciona un rango de fechas de máximo 30 días">
                    <QuestionCircleOutlined style={{ marginLeft: 4, color: "#999" }} />
                  </Tooltip>
                </span>
              }
              rules={[
                { required: true, message: "Date is required" },
                {
                  validator(_, value) {
                    if (validateDateRange(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Date range must be maximum 30 days"));
                  },
                },
              ]}
            >
              <RangePicker
                style={{ width: "100%" }}
                onChange={(dates) => {
                  form.setFieldsValue({ dateRange: dates });
                  form.validateFields(["dateRange"]);
                }}
              />
            </Form.Item>
            <Text type="secondary" style={{ fontSize: 11, marginTop: -12, display: "block" }}>
              Invoices displayed are limited to a maximum of 30 days old
            </Text>
          </Col>

          {/* Action Buttons */}
          <Col xs={24} sm={8} md={6} style={{ display: "flex", alignItems: "center", paddingTop: 10 }}>
            <Space size="middle" style={{ paddingBottom: "3%" }}>
              <Button
                type="primary"
                onClick={onApply}
                disabled={isApplyDisabled || loading}
                style={{
                  backgroundColor: isApplyDisabled ? "#E5E5E5" : "#FFC72C",
                  borderColor: isApplyDisabled ? "#E5E5E5" : "#FFC72C",
                  color: isApplyDisabled ? "#A0A0A0" : "#000000",
                  fontWeight: 600,
                  height: 40,
                  padding: "0 24px",
                  borderRadius: 6,
                  boxShadow: "none",
                }}
              >
                Apply
              </Button>
              <Tooltip title="Reset all filters to default values to perform new searches.">
                <Button
                  onClick={onReset}
                  style={{
                    height: 40,
                    padding: "0 24px",
                    borderRadius: 6,
                    borderColor: "#D9D9D9",
                  }}
                >
                  Reset
                </Button>
              </Tooltip>
            </Space>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchFilterCard;
