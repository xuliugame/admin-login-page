import React, { useEffect } from "react";
import { deleteFiles, getFiles, record } from "../utils/api";
import { Link } from "react-router-dom";
import icon from "../image/icon.png";
import { Button } from "react-bootstrap";

function Files(props) {
  const [file, setFile] = React.useState([]);
  useEffect(() => {
    getFiles().then((res) => {
      setFile(res);
    });
  }, []);
  return file.map((item) => <File key={item._id} file={item} />);
}

function File(props) {
  const { file } = props;

  async function deleteFile(name) {
    const temp = window.confirm("Are you sure you want to delete this file?");
    if (temp) {
      const t = await deleteFiles(name);
      if (t) {
        alert("File deleted successfully");
        window.location.reload();
      } else {
        alert("File not deleted");
      }
    }
  }

  return (
    <div className="m-0-a w-75 mt-5 border p-3">
      <div className="d-flex justify-content-between">
        <a
          href={`/uploads/${file.name}`}
          download
          onClick={() => record({ name: file.name })}
        >
          <p title={file.createdAt}>
            {isImage(file.name) ? (
              <img
                src={`/uploads/${file.name}`}
                alt={file.name}
                width="30"
                height="30"
              />
            ) : (
              <img src={icon} alt="" />
            )}
            <span className="ms-2">{file.name}</span>
          </p>
        </a>
        {window.localStorage.getItem("isAdmin") === "true" && (
          <Button
            type={"button"}
            className="btn-danger btn-sm"
            onClick={() => deleteFile(file.name)}
          >
            delete?
          </Button>
        )}
      </div>

      {file.openers && (
        <ul>
          {file.openers.map((item) => (
            <li className="border ps-3 pt-1 pb-1 mt-2 mb-2" key={item.name}>
              {item.name}: {new Date(item.time).toDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function isImage(name) {
  const ext = name.split(".").pop();
  return ["jpg", "jpeg", "png", "gif"].includes(ext);
}

export default Files;
