import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as React from "react";

interface PasswordDialogProps {
  handleSetPassword: (currGuessedPassword: string, newPassword: string) => void;
}

export const PasswordDialog: React.FC<PasswordDialogProps> = ({handleSetPassword}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Modify password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modify Password</DialogTitle>
          <DialogDescription>
            Make changes to your password here.<br/>When saved, you will be logged out.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password-current" className="text-right">
              Password
            </Label>
            <Input
              type="password"
              id="password-current"
              placeholder="••••••••"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password-new" className="text-right">
              New Password
            </Label>
            <Input
              type="password"
              id="password-new"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => handleSetPassword("a", "b")}>Apply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
