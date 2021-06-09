import Editor from '@monaco-editor/react';
import React from 'react';
import SplitPane from 'react-split-pane';
import styles from '../styles/EditorComp.module.css';
import FileComp from './FileComp';
import dynamic from 'next/dynamic';

type File = {
  name: string;
  language: string;
  value: string;
};

type Props = {
  files: File[];
  id: string | string[];
};

const DynamicTerminal = dynamic(() => import('./Terminal'), { ssr: false });

const EditorComp: React.FC<Props> = ({ files, id }) => {
  const editorRef = React.useRef<any>(null);
  const [fileName, setFileName] = React.useState<string>(files[0].name);
  const instaSaveData = React.useRef(files);
  const [nof, setNof] = React.useState(instaSaveData.current.length);
  const [feedback, setFeedback] = React.useState('SAVE');
  const [instaColour, setInstaColour] = React.useState('lightgreen');

  const file: File = instaSaveData.current.find(
    (item) => item.name == fileName
  );

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }

  const saveInsta = async (newData: File[]) => {
    const res = await fetch(
      `https://playgroundserv.herokuapp.com/instasave/${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      }
    );
    sessionStorage.setItem('idcr', id as string);
    localStorage.setItem('idr', id as string);
    const data = await res.json();
    setInstaColour('lightgreen');
  };

  function handleEditorChange(value: string, event) {
    instaSaveData.current = instaSaveData.current.map((item) => {
      if (item.name == file.name) {
        return Object.assign({}, item, {
          value: `${value}`,
        });
      } else {
        return item;
      }
    });

    setInstaColour('red');
    saveInsta(instaSaveData.current);
  }

  const saveToDb = async () => {
    const res = await fetch(
      `https://playgroundserv.herokuapp.com/databaseR/${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(instaSaveData.current),
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.createdAt) {
      setFeedback('SAVED');
    } else {
      setFeedback('ERROR');
    }
  };

  function showValue() {
    setFeedback('SAVING');
    saveToDb();
  }

  function addFile(newfile: File) {
    instaSaveData.current.push(newfile);
    setFileName(newfile.name);
    setNof(instaSaveData.current.length);
  }

  function deleteFile(name: string) {
    instaSaveData.current = instaSaveData.current.filter(
      (item) => item.name !== name
    );
    setNof(instaSaveData.current.length);
  }

  return (
    <>
      <SplitPane split="vertical" primary="second" size="85%">
        <div>
          <FileComp
            files={instaSaveData.current}
            currentFile={file}
            setter={setFileName}
            fileAdder={addFile}
            fileDeleter={deleteFile}
          />
          <p style={{ color: 'white' }}>No of files:{nof} </p>
        </div>
        <SplitPane split="horizontal" primary="first" size="80%">
          <div className={styles.editorpanel}>
            <div className={styles.btn}>
              <button onClick={showValue}>{feedback}</button>
              <button style={{ background: instaColour }}>'</button>
              {instaSaveData.current.map((item) => {
                return (
                  <button
                    disabled={fileName === item.name}
                    onClick={() => setFileName(item.name)}
                    key={Math.random() * Math.random() * 649}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            <Editor
              height="100%"
              width="100%"
              path={file.name}
              defaultLanguage={file.language}
              defaultValue={file.value}
              theme="vs-dark"
              onMount={handleEditorDidMount}
              onChange={handleEditorChange}
              options={{ wordWrap: 'on', scrollBeyondLastLine: false }}
            />
          </div>
          <div>
            <DynamicTerminal />
          </div>
        </SplitPane>
      </SplitPane>
    </>
  );
};

export default EditorComp;
