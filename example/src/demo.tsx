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
