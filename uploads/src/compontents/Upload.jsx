import React from "react";
import { Button, Form } from "react-bootstrap";
import { uploadFile } from "../utils/api";

function Upload(props) {
  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data.get("file"));
    // props.onSubmit(event.target.files);
    // }
    if (!data.get("file")) return;
    const temp = await uploadFile(data);

    if (temp) {
      alert("File uploaded successfully");
      window.location.reload();
    } else {
      alert("File upload failed");
    }
  }
  return (
    <Form className="w-75 m-0-a" onSubmit={handleSubmit}>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>File input</Form.Label>
        <Form.Control type="file" name="file" />
      </Form.Group>
      <Button type="submit">Upload</Button>
    </Form>
  );
}

export default Upload;
