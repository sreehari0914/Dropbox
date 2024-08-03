"use client"
// uploading
import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from "@clerk/nextjs";
import { db, storage } from '@/firebase';
import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';
import DropzoneComponent from 'react-dropzone';
import toast from 'react-hot-toast';

function Dropzone() {
  const maxsize = 20971520;
  const [loading, setLoading] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.onabort = () => {
        console.log("file reading was aborted");
      }

      reader.onerror = () => {
        console.log("file reading has failed");
      }

      reader.onload = async () => {
        await uploadPost(file);
      }

      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;

    setLoading(true);
    const toastid=toast.loading("Uploading...");
    // document added in user/user12345/files
    const docRef = await addDoc(collection(db, "users", user.id, "files"), {  // users and files are collections and user.id is document
      userId: user.id,
      filename: selectedFile.name,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      timestamp: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size,
    });

    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
    
    uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {  //update doc of users with specific userid and specific docref.id
        downloadURL: downloadURL,
      });
    });
    toast.success("Uploaded Successfully",{
      id:toastid
    })
    setLoading(false);
  };

  return (
    <DropzoneComponent
      minSize={0}
      maxSize={maxsize}
      onDrop={onDrop}
    >
      {({ getRootProps, getInputProps, isDragActive, isDragReject, fileRejections }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxsize;

        return (
          <section className="m-4">
            <div {...getRootProps()} className={cn(
              "w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center",
              isDragActive ? "bg-[#035FFE] text-white animate-pulse" : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
            )}>
              <input {...getInputProps()} />
              {!isDragActive && <p>Click here to drop a file to upload!</p>}
              {isDragActive && !isDragReject && <p>Drop to upload this file!</p>}
              {isDragReject && <p>File type not accepted, sorry!</p>}
              {isFileTooLarge && (
                <div className="text-danger mt-2">File is too large</div>
              )}
            </div>
          </section>
        );
      }}
    </DropzoneComponent>
  );
}

export default Dropzone;
