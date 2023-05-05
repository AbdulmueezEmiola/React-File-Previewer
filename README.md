# react-file-preview


The url previewer is built using native html  elements for previewing url of files of the following type

* csv files
* text files
* pdf files
* html files
* image files (supported by the browser)
* audio files (supported by the browser)
* video files (supported by the browser)
* docx, xlsx, pptx files

Also, for unsupported files or when an error occurs, it falls back to using an icon.
# Installation

```python
npm i @codesmith-99/react-file-preview
```

# Usage
Currently, the file supports only urls, in the future hopefully it can be extended to files also.

Basic Usage

```javascript
import React, { useState } from 'react'
import FileViewer from '@codesmith-99/react-file-preview'

export default function Demo() {
  const [file, setFile] = useState<string>('')
  const [mimeType, setMimeType] = useState<string>()
  const [name, setName] = useState<string>('image.jpg')

  return (
    <>
      <div>
        <label>File url</label>
        <br />
        <input type='text' onChange={(e) => setFile(e.target.value)} />
      </div>
      <div>
        <label>File mimeType</label>
        <br />
        <input type='text' onChange={(e) => setMimeType(e.target.value)} value={mimeType} />
      </div>
      <div>
        <label>File name</label>
        <br />
        <input type='text' onChange={(e) => setName(e.target.value)} value={name} />
      </div>
      <div
        style={{
          height: '500px',
          width: '500px',
        }}
      >
        <FileViewer
          loader={undefined}
          mimeType={mimeType}
          src={file}
          onError={(e) => {
            console.log(e)
          }}
          fileName={name}
        />
      </div>
    </>
  )
}

```

# FileViewer Props

| Prop name        |  Type |  Description |
|--------------|:-----:|-----------:|
| src      |  string | The url of the file to be previewed |
| mimetype      |  string (optional) | Used to specify the mimetype of the file and determine how to preview the url, alternatively filename can be used |
| filename      |  string (optional) | The file extension is used to specify the mimetype of the file and determine how to preview the url, alternatively mimetype can be used |
| loader |  ReactNode (optional) | A loader to replace the default loader used by the project |
| onError      |  (e: any) => void (optional) | A callback that can be used to detect if an error has occurred in the loading of the files|
