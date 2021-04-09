---
title: 'Post multiple form files to server'
description: 'Pass correcly all form files to a external server. Specially videos.mp4'
date: 'April 09, 2021'
author: 'rojasleon'
---

# Post multiple form files to server

Some typescript code:

```typescript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [files, setFiles] = useState<FileList>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!files) {
      return;
    }

    const formData = new FormData();

    [...files].map((file, i) => formData.append('file', file));

    try {
      const { data } = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(data);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/hello');

      console.log(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          accept="video/mp4,video/x-m4v,video/*"
          multiple
          onChange={({ target: { files } }) => {
            // make sure at least one video is uploaded
            if (!files) {
              return;
            }

            setFiles(files);
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
```
