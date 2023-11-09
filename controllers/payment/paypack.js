const PaypackJs = require("paypack-js").default;
require("dotenv").config();

const paypack = PaypackJs.config({
  client_id: process.env.packID,
  client_secret: process.env.packScret,
});
export const cashIn = (req, res) => {
  paypack
    .cashin({
      number: req.body.number,
      amount: req.body.amount,
      environment: "production",
    })
    .then((response) => {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const cashOut = (req, res) => {
  paypack
    .cashout({
      number: req.body.number,
      amount: req.body.amount,
      environment: "production",
    })
    .then((response) => {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const acountTransactions = (req, res) => {
  paypack
    .transactions({ offset: 0, limit: 100 })
    .then((response) => {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const accountEvents = (req, res) => {
  paypack
    .events({ offset: 0, limit: 100 })
    .then((response) => {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const accountInfo = (req, res) => {
  paypack
    .me()
    .then((response) => {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
