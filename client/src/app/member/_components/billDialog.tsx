import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {Bill} from "@/entities/bill";
import React, {useState} from "react";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"

interface BillDialogProps {
  bill: Bill,
  updateBill: (bill: Bill) => void;
}

export const BillDialog: React.FC<BillDialogProps> = ({bill, updateBill}) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Credit Card");

  const handleRadioChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const handlePay = () => {
    updateBill({...bill, paid: true, method: selectedValue});
    toast("Thank you!", {
      description: "Your payment has been accepted.",
      action: {
        label: "Close",
        onClick: () => {},
      },
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="relative px-8 size-5 text-xs">Pay Now</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Payment for INV{bill.id.toLocaleString('en-us', {minimumIntegerDigits: 3})}</AlertDialogTitle>
          <AlertDialogHeader>
            {bill.service}
          </AlertDialogHeader>
          <AlertDialogDescription>
            Amount to pay: ${bill.amount} <br/><br/>
            <RadioGroup defaultValue={selectedValue}>
              Please select a mode of payment:
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Credit Card" id="r1" onClick={handleRadioChange}/>
                <Label htmlFor="r1">Credit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Debit Card" id="r2" onClick={handleRadioChange}/>
                <Label htmlFor="r2">Debit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="e-Transfer" id="r3" onClick={handleRadioChange}/>
                <Label htmlFor="r3">e-Transfer</Label>
              </div>
            </RadioGroup>
          </AlertDialogDescription>
          <AlertDialogFooter>
            <Checkbox id="terms" onClick={() => setTermsAccepted(!termsAccepted)}/>
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I allow a payment of ${bill.amount} to be made
            </label>
          </AlertDialogFooter>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handlePay} disabled={!termsAccepted}>Pay</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}