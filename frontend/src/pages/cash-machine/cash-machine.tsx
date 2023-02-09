// ** React
import { Fragment, useEffect, useState, SyntheticEvent } from "react";

import { useForm, Controller } from "react-hook-form";

// ** MUI
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";

// ** Outros
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import UseWithdraw from "@/hooks/useWithdraw/useWithdraw";

interface Ibalance {
  balance: number;
  item: number;
}
type Iwithdraw = {
  userId: string;
  amount: number;
};

const CashMachine = () => {
  const [userId, setUserId] = useState("63e3ef1cbbb41d3580f80769");
  const [balance, setBalance] = useState([]);
  const [amount, setAmount] = useState<number>(0);
  const [withdraw, setWithdraw] = useState<any>([]);
  useEffect(() => {
    axios
      .post("http://localhost:3000/cash-machine/balance/user", {
        userId: userId,
      })
      .then((response) => {
        setBalance(response.data.balance);
      });
  }, [userId]);

  const schema = yup.object().shape({
    amount: yup.number().required(),
  });

  const defaultValues: Iwithdraw = {
    userId: "",
    amount: 0,
  };

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (amount > 0) {
      const withdrawUser = () => {
        axios
          .post("http://localhost:3000/cash-machine/withdraw/user", {
            userId: userId,
            amount: amount,
          })
          .then((response) => {
            setWithdraw([response.data.withdraw]);
          });
      };
      withdrawUser();
    }
  }, [userId, amount]);

  const onSubmit = (withdraw: Iwithdraw) => {
    const { amount } = withdraw;
    setAmount(amount);
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Card>
          <CardHeader title="Seu saldo"></CardHeader>
          <CardContent>
            <Typography> R$ {balance}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={5}>
        <Card>
          <CardHeader title="Seu Extrato"></CardHeader>
          <CardContent>
            <Typography>Saque: R$ 150 - 22/02/2023 - 19:30:01</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title="Sacar algum valor"></CardHeader>
          <CardContent>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="amount"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      value={value}
                      onBlur={onBlur}
                      label="Valor"
                      onChange={onChange}
                      error={Boolean(errors.amount)}
                    />
                  )}
                />
                {errors.amount && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors.amount.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{ mb: 7 }}
              >
                Sacar
              </Button>
            </form>
            <Grid item xs={5}>
              <Card>
                <CardHeader title="Retire seu dinheiro!"></CardHeader>
                <CardContent>
                  {withdraw.map((items: any, index: any) => {
                    return (
                      <ul key={index}>
                        {Object.keys(items).map((key) => {
                          return (
                            <li key={key + index}>
                              {items[key]} Nota de R$: {key}
                            </li>
                          );
                        })}
                      </ul>
                    );
                  })}
                </CardContent>
              </Card>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CashMachine;
