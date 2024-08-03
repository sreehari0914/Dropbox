import {create} from "zustand"

interface AppState{
    IsDeleteModelOpen:boolean;
    setIsDeleteModelOpen:(open:boolean)=>void;
    IsRenameModelOpen:boolean;
    setIsRenameModelOpen:(open:boolean)=>void;

    fileId:string|null;
    setFileId:(fileId:string)=>void;

    filename:string|null;
    setFilename:(fileId:string)=>void;


}// define the types for typescript using interface while using typescript

export const useAppStore = create<AppState>((set) => ({
    fileId: null,
    setFileId: (fileId) => set((state) => ({ fileId })),
    filename: "",
    setFilename: (filename) => set((state) => ({ filename })),
    IsDeleteModelOpen: false,
    setIsDeleteModelOpen: (open) => set((state) => ({ IsDeleteModelOpen: open })),
    IsRenameModelOpen: false,
    setIsRenameModelOpen: (open) => set((state) => ({ IsRenameModelOpen: open })),
  }));
  