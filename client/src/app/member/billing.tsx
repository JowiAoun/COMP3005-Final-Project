import React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {Bill} from "@/entities/bill";
import {BillDialog} from "@/app/member/_components/billDialog";
import {formatDate} from "@/app/utils/functions";

interface BillingProps {
  bills: Bill[];
  setBills: (bills: Bill[]) => void;
}

const Sessions: React.FC<BillingProps> = ({bills, setBills}) => {
  const updateBill = (newBill: Bill) => {
    let newBills: Bill[] = []
    bills.map((bill, _) => {
      if (newBill.id == bill.id) {
        newBills.push(newBill);
      } else {
        newBills.push(bill)
      }
    })

    setBills(newBills);
  }

  return (
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Payment Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills && bills.map((bill, _) => (
            <TableRow key={"bill-"+bill.id}>
              <TableCell className="font-medium">INV{bill.id.toLocaleString('en-us', {
                minimumIntegerDigits: 3,
                useGrouping: false
              })}</TableCell>
              <TableCell>
                {bill.service}
              </TableCell>
              <TableCell>
                {bill!.paid ? <p className="text-green-500">Paid</p> : <p className="text-red-500">Not paid</p>}
              </TableCell>
              <TableCell>
                {
                bill!.method != undefined ?
                  bill!.method
                  : <BillDialog bill={bill} updateBill={updateBill}/>
                }
              </TableCell>
              <TableCell>
                {bill?.paid ? formatDate(bill.paymentDate) : null}
              </TableCell>
              <TableCell className="text-right font-bold">${bill!.amount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Sessions