import React, { useState, useRef } from "react";
import { useField } from "@rocketseat/unform";
import { File, Container } from "./styles";

import api from "../../../services/api";

export default function ImageMeetup() {
  // const [defaultValue, registerField] = useField("banner");

  // const [file, setFile] = useState(defaultValue && defaultValue.id);
  // const [preview, setPreview] = useState(defaultValue && defaultValue.id);

  const ref = useRef();

  async function handleChange(e) {
    e.preventDefault();
    const data = new FormData();

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    data.append("file", e.target.files[0]);

    const response = await api.post("files", data, config);

    console.log(response);
  }

  return (
    <Container>
      <label htmlFor="banner">
        <h1>Selecione sua imagem</h1>
        <input
          type="file"
          id="banner"
          accept="image/*"
          // data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
