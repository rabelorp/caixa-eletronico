import { ReactNode, useEffect, useState } from "react";
// ** Outros
import axios from "axios";

type Iwithdraw = {
  userId: string;
  amount: number;
};

export type ErrCallbackType = (err: { [key: string]: string }) => void;

const UseWithdraw = (
  { userId, amount }: Iwithdraw,
  errorCallback: ErrCallbackType
) => {
  //   const [userId, setUserId] = useState("63e3ef1cbbb41d3580f80769");
  //   const [amount, setAmount] = useState(150);
  const [withdraw, setWithdraw] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:3000/cash-machine/withdraw/user", {
        userId: userId,
        amount: amount,
      })
      .then((response) => {
        setWithdraw(response.data);
      })
      .catch((err: any) => {
        if (errorCallback) errorCallback(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, amount]);

  return withdraw;
};
export default UseWithdraw;
