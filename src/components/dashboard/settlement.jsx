import React, { useState } from "react";
import { Form, Modal, Spin, Empty, Alert, Card } from "antd";
import { fetchMockSettlements, fetchAccountDetailsMock } from "../../services/mockSettlementService";
import SearchFilterCard from "./searchFilterCard";
import TransactionTable from "../tables/transactionTable";
import TransactionDetailDrawer from "../drawers/transactionDetailDrawer";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import DynamicBreadcrumb from "../menu/navigationBreadCrumd";

import LoadingOverlay from "../shared/loadingModal";

// Constantes de estilos reutilizables para el layout y las tarjetas del componente.
const STYLES = {
  layout: {
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
  },
  content: {
    padding: 24,
  },
  card: {
    marginBottom: 24,
  },
  alert: {
    marginBottom: 16,
    fontSize: 21,
  },
  emptyState: {
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  emptyStateText: {
    color: "#999",
  },
};

const STATUS_OPTIONS = ["All", "Paid", "Paying", "Pending", "Failed"];

const SettlementManagmentApp = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [drawerItem, setDrawerItem] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [loadingOverlayVisible, setLoadingOverlayVisible] = useState(false);

  const validateDateRange = (range) => {
    if (!range || range.length !== 2) return false;
    const [start, end] = range;
    const diff = end.diff(start, "day");
    return diff >= 0 && diff <= 30;
  };

  const onApply = async () => {
    setError(null);
    try {
      const values = await form.validateFields();
      const { status, dateRange, accountId, settlementId, cuit } = values;
      if (!status || !dateRange || !validateDateRange(dateRange)) {
        return;
      }

      console.log("Applying filters:", { status, dateRange, accountId, settlementId, cuit });
      console.log("Applying values:", { values });

      // setLoading(true);
      setLoadingOverlayVisible(true);
      // Modal.info({
      //   centered: true,
      //   icon: null,
      //   content: (
      //     <div style={{ textAlign: "center", padding: 20, backgroundColor: "black", borderRadius: 8, color: "yellow" }}>
      //       <Spin />
      //       <div style={{ marginTop: 8, fontSize: 16 }}>Loading</div>
      //     </div>
      //   ),
      //   okButtonProps: { style: { display: "none" } },
      // });

      // Simular petición
      const results = await new Promise((res) => {
        setTimeout(async () => {
          const rows = fetchMockSettlements({ status, accountId, settlementId, cuit, dateRange });
          res(rows);
        }, 3000);
      });

      Modal.destroyAll();
      setLoadingOverlayVisible(false);

      if (!results || results.length === 0) {
        setLoadingOverlayVisible(false);
        setData([]);
        setError({
          type: "no-data",
          message: "Searching Account Failed. It looks like the search didn't go through. Please try again.",
        });
      } else {
        setLoadingOverlayVisible(false);
        setError(null);
        setData(results);
      }
    } catch (err) {
      // validation errors handled by antd
    }
  };

  const onReset = () => {
    form.resetFields();
    setData([]);
    setError(null);
  };

  const handleView = async (record) => {
    console.log("handleView called", record);
    const details = await fetchAccountDetailsMock(record);
    console.log("fetched details", details);
    setDrawerItem(details);
    setDrawerVisible(true);
  };

  return (
    <Layout style={STYLES.layout}>
      <Content style={STYLES.content}>
        <DynamicBreadcrumb pageName="Settlement Management" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Card title="Search or Filter" style={STYLES.card}>
            <SearchFilterCard
              form={form}
              onApply={onApply}
              onReset={onReset}
              loading={loading}
              statusOptions={STATUS_OPTIONS}
              // validateDateRange={validateDateRange}
            />
          </Card>
          <div style={{ marginTop: 0 }}>
            {error ? <Alert type="error" message={error.message} /> : null}

            <div style={{ background: "#fff", marginTop: 12, padding: 12, borderRadius: 4 }}>
              {data.length === 0 ? (
                <Empty description="Enter search criteria and click Apply to view Forms" />
              ) : (
                <TransactionTable data={data} onView={handleView} />
              )}
            </div>
          </div>

          <TransactionDetailDrawer visible={drawerVisible} item={drawerItem} onClose={() => setDrawerVisible(false)} />
        </div>
      </Content>
      <LoadingOverlay visible={loadingOverlayVisible} />
    </Layout>
  );
};

export default SettlementManagmentApp;
