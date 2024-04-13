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
import {Routine} from "@/entities/member";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import { XIcon } from "lucide-react"

interface RoutinesProps {
  routines: Routine[];
  setRoutines: (routines: Routine[]) => void;
}

const Routines: React.FC<RoutinesProps> = ({routines, setRoutines}) => {
  const [formData, setFormData] = useState<Routine>({
    name: "",
    description: "",
    id: -1,
  });

  const handleChange = (event: any) => {
    const { id, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = () => {
    if (formData.name !== '' && formData.description !== '') {
      setRoutines([...routines, formData]);
      // console.log(routines);

      //! SERVER: EDIT ROUTINES --> Use `routines`
    }
  };

  const handleRedButtonClick = (index: number) => {
    const routineToDelete = routines[index];
    const updatedRoutines = routines.filter((_, i) => i !== index);
    setRoutines(updatedRoutines);

    //! SERVER: DELETE USER GOAL --> Use `goalToDelete`
  };

  return (
    <Table>
      <TableCaption>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-[100%]">Create new Routine</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create new Routine</AlertDialogTitle>
              <AlertDialogDescription>
                Add a new routine here! Save when you're done.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <>
              <div className="space-y-1">
                <Label htmlFor="name">Title</Label>
                <Input required id="name" type="text" placeholder="Evening Routine" onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="description">Description</Label>
                <Textarea required id="description" className="h-20" placeholder="Pushups (12x3), Pullups (8x2), 4km Run" onChange={handleChange} />
              </div>
            </>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit}>Save</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Title</TableHead>
          <TableHead>Description & Exercises</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {routines && routines.map((routine, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{routine.name}</TableCell>
            <TableCell>{routine.description}</TableCell>
            <TableCell className="text-right">
              <button onClick={() => handleRedButtonClick(index)}>
                <XIcon className="text-red-500"/>
              </button>
            </TableCell>
          </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}

export default Routines;