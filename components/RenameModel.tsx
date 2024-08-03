'use client'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "@/firebase";
import { useAppStore } from "@/store(zustand)/store";
import { useUser } from "@clerk/clerk-react";
import { updateDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export function RenameModel() {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const [IsRenameModelOpen, setIsRenameModelOpen, fileId, filename] =
    useAppStore((state) => [
      state.IsRenameModelOpen,
      state.setIsRenameModelOpen,
      state.fileId,
      state.filename,
    ]);

  const renameFile = async () => {
    if (!user || !fileId) {
      return;
    }
    const toastid=toast.loading("Renaming...");
    await updateDoc(doc(db, "users", user.id, "files", fileId), {
      filename: input,
      
    });
    toast.success("Renamed Successfully",{
      id:toastid
    })
    setIsRenameModelOpen(false); // Close the dialog after renaming
  };

  return (
    <Dialog
      open={IsRenameModelOpen}
      onOpenChange={(isOpen) => {
        setIsRenameModelOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
       
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename the file</DialogTitle>
          <Input
            id="Link"
            defaultValue={filename ?? ""} // Provide a default value for filename
            onChange={(e) => setInput(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                renameFile();
              }
            }}
          />
          <div className="flex justify-end space-x-2 py-3">
            <Button
              size="sm"
              className="px-3"
              variant={"ghost"}
              onClick={() => setIsRenameModelOpen(false)}
            >
              <span className="sr-only">Cancel</span>
              <span>Cancel</span>
            </Button>
            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={() => renameFile()}
            >
              <span className="sr-only">Rename</span>
              <span>Rename</span>
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}


