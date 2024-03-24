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

interface BillingProps {
  bills: Bill[];
}

const Sessions: React.FC<BillingProps> = ({bills}) => {
  return (
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills && bills.map((bill, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">INV{index.toLocaleString('en-us', {
                minimumIntegerDigits: 3,
                useGrouping: false
              })}</TableCell>
              <TableCell>{bill!.paid ? "Paid" : "Not paid"}</TableCell>
              <TableCell>{bill!.method != undefined ? bill!.method : "N/A"}</TableCell>
              <TableCell className="text-right">${bill!.amount.toLocaleString('en-US', {
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