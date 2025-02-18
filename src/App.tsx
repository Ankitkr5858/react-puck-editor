import React, { useState } from 'react';
import { Editor } from './Editor';
import { Page } from './Page';

function App() {
  const [data, setData] = useState({
    content: [],
    root: { title: 'Page' }
  });
  const [mode, setMode] = useState<'editor' | 'preview'>('editor');

  return (
    <div className="min-h-screen bg-gray-100">
      {mode === 'editor' ? (
        <Editor 
          initialData={data} 
          onPublish={(newData) => {
            setData(newData);
            setMode('preview');
          }}
        />
      ) : (
        <div>
          <button
            onClick={() => setMode('editor')}
            className="fixed top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Editor
          </button>
          <Page data={data} />
        </div>
      )}
    </div>
  );
}

export default App;