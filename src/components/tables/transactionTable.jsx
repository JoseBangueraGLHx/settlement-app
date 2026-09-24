import React from "react";
import { Table, Tag } from "antd";

const TransactionTable = ({ data, onView }) => {
  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      sorter: (a, b) => a.transactionId.localeCompare(b.transactionId),
    },
    {
      title: "Biller Account",
      dataIndex: "billerAccount",
      key: "billerAccount",
      sorter: (a, b) => a.billerAccount.localeCompare(b.billerAccount),
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <div style={{ fontSize: 12, color: "#888" }}>{record.sub}</div>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      render: (v) => `ARS ${v.toLocaleString()}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (s) => {
        const color = s === "Paid" ? "green" : s === "Failed" ? "red" : s === "Pending" ? "orange" : "blue";
        return <Tag color={color}>{s}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <a
          onClick={() => {
            console.log("Table view clicked", record);
            onView(record);
          }}
        >
          View
        </a>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} rowKey="transactionId" scroll={{ x: "max-content" }} />;
};

export default TransactionTable;
