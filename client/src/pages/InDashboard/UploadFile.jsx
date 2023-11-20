// FileUpload.js
import React, { useState } from "react";
import axios from "axios";

const UploadFile = ({ contract, account }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `870c233f74dcd509026a`,
          pinata_secret_api_key: `e443202ff454a71a8bdec61363ffcf242635f818dcba064a7bb3b0ee90d0e021`,
          "Content-Type": "multipart/form-data",
        },
      });

      const imgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

      // Use formData values from the state
      await contract.addCase(formData.caseId, formData.clientId, formData.lawyerId, formData.judgeId, imgHash);

      alert("Successfully Image Uploaded");
      setFileName("No image selected");
      setFile(null);
    } catch (e) {
      alert("Unable to upload image to Pinata");
    }
  }
};


  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};

export default UploadFile;
