"use client"
import React, {useState} from "react";
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {Room} from "@/entities/session";

interface EquipmentProps {
  rooms: Room[];
}

const Equipment: React.FC<EquipmentProps> = ({rooms}) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(-1)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? rooms.find((room) => room.roomNumber === value)?.roomNumber
            : "Select room..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search rooms..." />
          <CommandEmpty>No rooms found.</CommandEmpty>
          <CommandGroup>
            {rooms.map((room) => (
              <CommandItem
                key={room.roomNumber}
                value={room.roomNumber.toString()}
                onSelect={(currentValue) => {
                  setValue(parseInt(currentValue) === value ? -1 : parseInt(currentValue))
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === room.roomNumber ? "opacity-100" : "opacity-0"
                  )}
                />
                {room.roomNumber}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default Equipment;
