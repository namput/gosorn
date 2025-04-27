interface Transaction {
    id: number;
    type: "deposit" | "withdraw" | "promotion";
    amount: number;
    description: string;
    date: string;
    status: "completed" | "pending";
  }
  
  const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
    const { date, type, description, amount, status } = transaction;
  
    const formatType = (type: Transaction["type"]) => {
      switch (type) {
        case "deposit":
          return "เติมเงิน";
        case "withdraw":
          return "ถอนเงิน";
        case "promotion":
          return "โปรโมชัน";
        default:
          return "-";
      }
    };
  
    return (
      <tr className="border-b dark:border-gray-700">
        <td className="p-3">{date}</td>
        <td className="p-3 capitalize">{formatType(type)}</td>
        <td className="p-3">{description}</td>
        <td className={`p-3 text-right ${amount > 0 ? "text-green-500" : "text-red-500"}`}>
          {amount > 0 ? "+" : ""}{amount.toLocaleString()} บาท
        </td>
        <td className="p-3 text-center">
          {status === "completed" ? (
            <span className="text-green-500 font-semibold">สำเร็จ</span>
          ) : (
            <span className="text-yellow-500 font-semibold">รอดำเนินการ</span>
          )}
        </td>
      </tr>
    );
  };
  
  export default TransactionItem;
  