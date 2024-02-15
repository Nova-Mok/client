import { useDropzone } from "react-dropzone";


const FileUpload = () => {
    const onDrop = (acceptedFiles) => {
      // Handle the uploaded files here (e.g., send them to the server)
      console.log("Accepted Files:", acceptedFiles);
    };
  
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
  
    return (
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <p>Drag & drop your CSV file here, or click to select one</p>
      </div>
    );
  };
  
  const dropzoneStyles = {
    border: "2px dashed #ccc",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
  };
  