"use client"
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
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
import {FitnessGoals} from "@/entities/member";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {createFitnessGoals} from "@/app/utils/api";

interface GoalsProps {
  goals?: FitnessGoals[];
}

const Goals: React.FC<GoalsProps> = ({goals}) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [userGoals, setUserGoals] = useState<FitnessGoals[]>(goals || []);
  const [formData, setFormData] = useState<FitnessGoals>({
    goalName: '',
    type: '',
    description: '',
    commitment: 0,
    completed: false,
    deadline: date || new Date(),
  });

  const handleChange = (event: any) => {
    const { id, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = () => {
    setFormData({...formData, deadline: date || new Date()});
    setUserGoals([...userGoals, formData]);
    // console.log(userGoals);
    createFitnessGoals(formData, 1); //! temp
  };

  return (
    <Table>
      <TableCaption>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-[100%]">Create new Goal</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create new Goal</AlertDialogTitle>
              <AlertDialogDescription>
                Add a new goal here! Save when you're done.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <>
              <div className="space-y-1">
                <Label htmlFor="goalName">Title</Label>
                <Input id="goalName" type="text" placeholder="Run a half-marathon" onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="type">Type</Label>
                <Input id="type" type="text" placeholder="Endurance" onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" className="h-20" placeholder="Complete a half-marathon race by September." onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="commitment">Commitment (days per week)</Label>
                <Slider
                  id="commitment"
                  onValueCommit={(value) => handleChange({target: {id: "commitment", value: value[0]}})}
                  defaultValue={[2]}
                  max={6}
                  step={1}
                  className={cn("w-[100%] my-2")}
                />
              </div>
              <div>
                <Label htmlFor="deadline">Deadline</Label><br/>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(day: Date | undefined) => setDate(day)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDate(new Date())}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit}>Save</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[16rem]">Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userGoals && userGoals.map((goal, index) => {
          if (!goal.completed) {
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{goal.goalName}</TableCell>
                <TableCell>{goal.description}</TableCell>
                <TableCell className="text-right">{goal.type}</TableCell>
              </TableRow>
            );
          } else {
            return null;
          }
        })}
      </TableBody>
    </Table>
  );
}

export default Goals;