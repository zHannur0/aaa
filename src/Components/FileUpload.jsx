import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useLocation } from "react-router-dom";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get("email");
  const expDate = params.get("expDate");

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const handleUpload = () => {
    if (!file) return;

    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentage = Math.floor((loaded * 100) / total);
        setUploadProgress(percentage);
      },
    };

    const formData = new FormData();
    formData.append("resumes", file);

    axios
      .post(
        `/users/sign-up?email=${email}&expDate=${expDate}`,
        formData,
        config
      )
      .then((response) => {
        setUploadedFile(response.data);
        setFile(null); // Reset the file after successful upload
        setUploadProgress(0); // Reset the upload progress
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const handleRemove = () => {
    setFile(null);
    setUploadProgress(0);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, application/pdf",
    maxSize: 10 * 1024 * 1024,
    multiple: false, // Allow only one file
  });

  return (
    <div className="rounded-[10px] max-w-[1150px] mx-auto bg-white shadow-md text-center h-[660px] pt-[60px] flex flex-col justify-between">
      <div className="w-[530px] mx-[auto]">
        <h1 className="text-[36px] font-bold mb-[28px]">Ваш(-а) резюме</h1>
        <p className="text-[#747474] text-[18px] mb-[30px]">
          Что бы получить данные про вас
        </p>
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center  mx-[auto] h-32 p-4 border-2 border-dashed rounded-md cursor-pointer transition-colors ${
            isDragActive ? "border-blue-500" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex items-center justify-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 16l-1.41 1.41c-.2.2-.3.45-.29.71.01.26.11.51.29.71l7.79 7.79c.2.2.45.29.71.29.26 0 .51-.11.71-.29L16 21m-2-2H8c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v6m-6-6l3 3m-3-3v12"
              />
            </svg>
            <p className="text-gray-500">
              {isDragActive
                ? "Drop the file here ..."
                : "Select a file or drag and drop here"}
            </p>
          </div>
          <p className="text-gray-400 text-sm">
            JPG, PNG or PDF; file size no more than 10MB
          </p>
        </div>
        <div className="mt-4 ">
          <h2 className="text-[14px] font-regular mb-[20px]">File added</h2>
          {file && (
            <div className="flex items-center justify-between p-2 border-b">
              <div className="flex items-center space-x-2">
                <span className="text-blue-500">{file.name}</span>
                <button className="text-red-500" onClick={handleRemove}>
                  Remove
                </button>
                {uploadProgress === 100 && (
                  <a
                    href={URL.createObjectURL(file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    Preview
                  </a>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {uploadProgress !== 100 && (
                  <progress
                    value={uploadProgress || 0}
                    max="100"
                    className="w-full h-2"
                  ></progress>
                )}
                <span>{uploadProgress}%</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-4 bg-[#FBFDFE] w-full py-[20px] px-[50px] rounded-b-[10px] "  style={{boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.10) inset"}}>
        <button
          className="px-4 py-2 border rounded-md text-gray-500 border-gray-100"
          onClick={() => setFile(null)}
        >
          Cancel
        </button>
        <button
          className="py-[12px] px-[24px] rounded-[5px] text-[#0F91D2] text-[14px] font-regular"
          style={{border: '1px solid rgba(0, 0, 0, 0.10)', boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.16)'}}
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
      {uploadedFile && (
        <div className="mt-4">
          <h2>Uploaded File:</h2>
          <div className="flex items-center justify-between p-2 border-b">
            <span>{uploadedFile.name}</span>
            <a
              href={uploadedFile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Preview
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
