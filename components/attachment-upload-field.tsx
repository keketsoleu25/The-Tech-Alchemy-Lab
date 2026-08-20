"use client";

import { ChangeEvent, DragEvent, useId, useState } from "react";

import {
  FILE_INPUT_ACCEPT,
  MAX_UPLOAD_FILES,
  MAX_UPLOAD_SIZE_BYTES,
  validateUploadCandidate,
} from "@/lib/upload-config";

type AttachmentUploadFieldProps = {
  files: File[];
  onChange: (files: File[]) => void;
  disabled?: boolean;
};

function fileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
export function AttachmentUploadField({ files, onChange, disabled = false }: AttachmentUploadFieldProps) {
  const inputId = useId();
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  function addFiles(incoming: File[]) {
    setError("");
    const combined = [...files, ...incoming];
    if (combined.length > MAX_UPLOAD_FILES) {
      setError(`Choose no more than ${MAX_UPLOAD_FILES} files per request.`);
      return;
    }

    for (const file of incoming) {
      const validationError = validateUploadCandidate(file);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    onChange(combined);
  }

  function selectFiles(event: ChangeEvent<HTMLInputElement>) {
    addFiles(Array.from(event.target.files || []));
    event.target.value = "";
  }

  function dropFiles(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    if (!disabled) addFiles(Array.from(event.dataTransfer.files));
  }

  return (
    <section className="attachment-field" aria-labelledby={`${inputId}-title`}>
      <div className="attachment-heading">
        <div>
          <h3 id={`${inputId}-title`}>Supporting files</h3>
          <p>Documents, screenshots, logos and reference images.</p>
        </div>
        <span>{files.length}/{MAX_UPLOAD_FILES}</span>
      </div>

      <div
        className={`attachment-dropzone ${dragging ? "is-dragging" : ""}`}
        onDragEnter={(event) => { event.preventDefault(); if (!disabled) setDragging(true); }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setDragging(false)}
        onDrop={dropFiles}
      >
        <input
          id={inputId}
          type="file"
          multiple
          accept={FILE_INPUT_ACCEPT}
          onChange={selectFiles}
          disabled={disabled}
        />
        <label htmlFor={inputId}>
          <span aria-hidden="true">＋</span>
          <strong>Choose files</strong>
          <small>or drag them here</small>
        </label>
        <p>PDF, Word, Excel, PowerPoint, TXT, CSV, JPG, PNG or WebP · 10 MB each</p>
      </div>

      {files.length > 0 ? <ul className="attachment-list">
        {files.map((file, index) => <li key={`${file.name}-${file.lastModified}-${index}`}>
          <span aria-hidden="true">{file.type.startsWith("image/") ? "IMG" : "DOC"}</span>
          <div><strong>{file.name}</strong><small>{fileSize(file.size)}</small></div>
          <button type="button" disabled={disabled} onClick={() => onChange(files.filter((_, fileIndex) => fileIndex !== index))} aria-label={`Remove ${file.name}`}>Remove</button>
        </li>)}
      </ul> : null}

      {error ? <p className="attachment-error" role="alert">{error}</p> : null}
      <p className="attachment-privacy">Files are uploaded to private storage only when you submit this form. Do not include passwords or card details.</p>
      <span className="sr-only">Maximum individual file size: {MAX_UPLOAD_SIZE_BYTES} bytes.</span>
    </section>
  );
}
