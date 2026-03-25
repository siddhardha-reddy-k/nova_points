import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import { DEMO_TRANSACTIONS_INITIAL } from "../demo/demoData";

const DEMO_TXN_KEY = "demo_transactions";

const loadDemoTransactions = () => {
  try {
    const raw = sessionStorage.getItem(DEMO_TXN_KEY);
    return raw ? JSON.parse(raw) : [...DEMO_TRANSACTIONS_INITIAL];
  } catch {
    return [...DEMO_TRANSACTIONS_INITIAL];
  }
};

const saveDemoTransactions = (txns) => {
  sessionStorage.setItem(DEMO_TXN_KEY, JSON.stringify(txns));
};

const useTransactions = (isDemo = false) => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = useCallback(async () => {
    if (isDemo) {
      setTransactions(loadDemoTransactions());
      return;
    }
    try {
      const { data } = await api.get("/transactions");
      setTransactions(data);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  }, [isDemo]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const addTransaction = useCallback(
    (txn) => {
      if (!isDemo) return;
      const next = [
        { ...txn, id: Date.now(), created_at: new Date().toISOString() },
        ...loadDemoTransactions(),
      ];
      saveDemoTransactions(next);
      setTransactions(next);
    },
    [isDemo],
  );

  const removeTransaction = useCallback(
    (task_id) => {
      if (!isDemo) return;
      const next = loadDemoTransactions().filter(
        (t) => !(t.task_id === task_id && t.type === "earned"),
      );
      saveDemoTransactions(next);
      setTransactions(next);
    },
    [isDemo],
  );

  const earnedPoints = transactions
    .filter((t) => t.type === "earned")
    .reduce((total, t) => total + t.points, 0);

  const redeemedPoints = transactions
    .filter((t) => t.type === "redeemed")
    .reduce((total, t) => total + t.points, 0);

  const leftPoints = earnedPoints - redeemedPoints;

  return {
    transactions,
    earnedPoints,
    redeemedPoints,
    leftPoints,
    fetchTransactions,
    addTransaction,
    removeTransaction,
  };
};

export default useTransactions;
