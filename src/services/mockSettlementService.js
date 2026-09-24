import { mockTransactionDetailData } from "../mockData";

// Servicio mock para proporcionar datos de settlements
const SAMPLE = [
  {
    transactionId: "TXN005",
    billerAccount: "Personal Movil",
    sub: "BAC - 0010101010101010",
    date: "2025-11-11T11:08:20Z",
    amount: 210000,
    status: "Processing",
    accountId: "20123456",
    partyId: "P-001",
    agreementId: "AGR-1",
  },
  {
    transactionId: "TXN004",
    billerAccount: "Personal Movil",
    sub: "BAC - 0010101010101010",
    date: "2025-11-10T11:08:20Z",
    amount: 210000,
    status: "Failed",
    accountId: "20123456",
    partyId: "P-001",
    agreementId: "AGR-1",
  },
  {
    transactionId: "TXN003",
    billerAccount: "Personal Movil",
    sub: "BAC - 0010101010101010",
    date: "2025-11-09T11:08:20Z",
    amount: 210000,
    status: "Failed",
    accountId: "20123456",
    partyId: "P-002",
    agreementId: "AGR-2",
  },
  {
    transactionId: "TXN002",
    billerAccount: "Personal Movil",
    sub: "BAC - 0010101010101010",
    date: "2025-11-08T11:08:20Z",
    amount: 210000,
    status: "Paid",
    accountId: "20123456",
    partyId: "P-003",
    agreementId: "AGR-3",
  },
  {
    transactionId: "TXN010",
    billerAccount: "Personal Movil",
    sub: "BAC - 0010101010101010",
    date: "2025-11-07T11:08:20Z",
    amount: 210000,
    status: "Processing",
    accountId: "20123456",
    partyId: "P-004",
    agreementId: "AGR-4",
  },
];

export function fetchMockSettlements({ status, accountId, settlementId, cuit, dateRange }) {
  // Filtrar según parámetros; si status === 'All' devolver todo
  let rows = SAMPLE.slice();
  if (status && status !== "All") rows = rows.filter((r) => r.status === status);
  if (accountId) rows = rows.filter((r) => r.accountId && r.accountId.includes(accountId.replace(/\D/g, "")));
  // settlementId y cuit no están en mocks reales; se pueden filtrar por transactionId simuladamente
  if (settlementId) rows = rows.filter((r) => r.transactionId.includes(settlementId));
  if (dateRange && dateRange.length === 2) {
    const start = dateRange[0].startOf("day");
    const end = dateRange[1].endOf("day");
    rows = rows.filter((r) => {
      const d = new Date(r.date);
      return d >= start.toDate() && d <= end.toDate();
    });
  }
  return rows;
}

export async function fetchAccountDetailsMock(record) {
  return {
    ...mockTransactionDetailData,
    accountId: record?.accountId || mockTransactionDetailData.accountId,
    accountNumber: record?.accountNumber || mockTransactionDetailData.accountNumber,
    creationDate: record?.creationDate || mockTransactionDetailData.creationDate,
    creationTime: record?.creationTime || mockTransactionDetailData.creationTime,
    currentStatus: record?.status || mockTransactionDetailData.currentStatus,
    status: record?.status || mockTransactionDetailData.status,
    settlementAccount: record?.settlementAccount || mockTransactionDetailData.settlementAccount,
    partyId: record?.partyId || mockTransactionDetailData.partyId,
    agreementId: record?.agreementId || mockTransactionDetailData.agreementId,
    amount: record?.amount || mockTransactionDetailData.amount,
    financialBreakdown: mockTransactionDetailData.financialBreakdown,
    concentrationItems: mockTransactionDetailData.concentrationItems,
    taxItems: mockTransactionDetailData.taxItems,
  };
}
