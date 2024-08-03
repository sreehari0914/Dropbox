'use client'

import { Copy, Ghost } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAppStore } from "@/store(zustand)/store"
import { User } from "@clerk/nextjs/server"
import { useUser } from "@clerk/clerk-react"
import { db, storage } from "@/firebase"
import { deleteObject,ref} from "firebase/storage"
import { deleteDoc,doc } from "firebase/firestore"
import toast from "react-hot-toast"


export function DeleteModal() {
       const{user}=useUser();
    const [setIsDeleteModelOpen,IsDeleteModelOpen,setFileId,fileId]=
    useAppStore((state)=>[
      state.setIsDeleteModelOpen,
      state.IsDeleteModelOpen,
      state.setFileId,
      state.fileId
    ])
    async function deletefile() {
        if(!user || !fileId) return
        const toastid=toast.loading("Deleting...");
        const fileRef=ref(storage,`users/${user.id}/files/${fileId}`);
       try{
        await deleteObject(fileRef).then(async()=>{
          console.log("DELETED FILE");
          deleteDoc(doc(db,"users",user.id,"files",fileId)).then(()=>{
            console.log("Deleted");
            toast.success("Deleted Successfully",{
              id:toastid
            })
          })
        }).finally(()=>{
          setIsDeleteModelOpen(false);
        })
      
      }
        catch(error){
            console.log(error);
            toast.error("Error deleting document",{
              id:toastid
            })
        };
        
    }
  return (
    <Dialog
    open={IsDeleteModelOpen}
    onOpenChange={(isOpen)=>{
        setIsDeleteModelOpen(isOpen)
    }}
    >
      <DialogTrigger asChild>
        
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete </DialogTitle>
          <DialogDescription>
            This action cannot be undone.this will permanently delete your file
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2 py-3">
             <Button size="sm"
               className="px-3 flex-1"
               variant={"ghost"}
             onClick={()=>setIsDeleteModelOpen(false)}
             >
                <span className="sr-only">Cancel</span>
                  <span>Cancel</span>
             </Button>
             <Button
             type="submit"
             size="sm"
             variant={"destructive"}
             className="px-3 flex-1"
             onClick={()=>deletefile()}             
             
             >
                <span className="sr-only">Delete</span>
                  <span>Delete</span>

             </Button>


        </div>
      
      </DialogContent>
    </Dialog>
  )
}
