import { useState, useEffect } from "react";
import api from "../api/axios";

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const { data } = await api.get("/transactions");
      setTransactions(data);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const earnedPoints = transactions
    .filter((t) => t.type === "earned")
    .reduce((total, t) => total + t.points, 0);

  const redeemedPoints = transactions
    .filter((t) => t.type === "redeemed")
    .reduce((total, t) => total + t.points, 0);

  const leftPoints = earnedPoints - redeemedPoints;

  return { transactions, earnedPoints, redeemedPoints, leftPoints, fetchTransactions };
};

export default useTransactions;
