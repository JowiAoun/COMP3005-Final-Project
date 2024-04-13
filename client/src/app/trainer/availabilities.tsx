import React, {useState} from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {TrainerAvailabilities} from "@/entities/trainer";
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {capitalizeFirstLetter, generateTimeSlots} from "@/app/utils/functions";

interface AvailabilitiesProps {
  defaultAvailabilities: TrainerAvailabilities[];
}

const Availabilities: React.FC<AvailabilitiesProps> = ({defaultAvailabilities}) => {
  const [selectedDay, setSelectedDay] = useState<string>("monday");
  const [availabilities, setAvailabilities] = useState(defaultAvailabilities);
  const [tempAvailabilities, setTempAvailabilities] = useState(availabilities);
  const timeSlots = generateTimeSlots("08:00", "20:00");

  const saveAvailabilities = () => {
    setAvailabilities(tempAvailabilities);
    //! save `availabilities` to database here
  }

  const filteredAvailabilities = availabilities
    ? availabilities
      .filter(availability => availability.day === selectedDay)
      .map(({ startTime, endTime }) => [startTime, endTime])
    : [];

  const handleSwitchClick = (checked: boolean, index: number) => {
    if (checked) {
      setTempAvailabilities(availabilities => [
        ...(availabilities || []),
        {
          day: selectedDay,
          startTime: timeSlots[index][0],
          endTime: timeSlots[index][1],
          occupied: false
        }
      ]);
    } else {
      setTempAvailabilities(availabilities => {
        const availabilityIndex = availabilities.findIndex(
          availability =>
            availability.day === selectedDay &&
            availability.startTime === timeSlots[index][0] &&
            availability.endTime === timeSlots[index][1]
        );
        if (availabilityIndex !== -1) {
          const updatedAvailabilities = [...availabilities];
          updatedAvailabilities.splice(availabilityIndex, 1);
          return updatedAvailabilities;
        } else {
          return availabilities;
        }
      });
    }
  }

  const slotExists = (targetSlot: string[]) => {
    return filteredAvailabilities.some(slot => slot.every((time, index) => time === targetSlot[index]));
  };

  return (
    <>
      <RadioGroup defaultValue="monday" onValueChange={setSelectedDay}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="monday" id="r1" />
          <Label htmlFor="r1">Monday</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="tuesday" id="r2" />
          <Label htmlFor="r2">Tuesday</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="wednesday" id="r3" />
          <Label htmlFor="r3">Wednesday</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="thursday" id="r4" />
          <Label htmlFor="r4">Thursday</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="friday" id="r5" />
          <Label htmlFor="r5">Friday</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="saturday" id="r6" />
          <Label htmlFor="r6">Saturday</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="sunday" id="r7" />
          <Label htmlFor="r7">Sunday</Label>
        </div>
      </RadioGroup>

      <div>
        <h2 className="font-bold text-lg mt-4">Availabilities for {selectedDay}:</h2>
        {filteredAvailabilities.length > 0 ? (
          <ul>
            {filteredAvailabilities.map((availability, index) => (
              <li key={index}>
                <p>{availability[0]} - {availability[1]}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No availabilities for {selectedDay}.</p>
        )}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Edit Availabilities</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Availabilities for {capitalizeFirstLetter(selectedDay)}</DialogTitle>
            <DialogDescription>
              Make changes to your available work hours.<br/>
              Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-72 rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">Times ({capitalizeFirstLetter(selectedDay)})</h4>
              {timeSlots.map((slot, index) => (
                <React.Fragment key={index}>
                  <div className="text-sm">
                    {slot[0]} - {slot[1]}
                    <Switch
                      id={`toggle-${index}`}
                      className="right-0 ml-[12rem]"
                      onCheckedChange={(checked: boolean) => handleSwitchClick(checked, index)}
                      defaultChecked={slotExists(slot)}
                    />
                  </div>
                  <Separator className="my-2"/>
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
          <DialogFooter>
            <DialogClose>
              <Button
                onClick={() => saveAvailabilities()}
              >
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Availabilities;
