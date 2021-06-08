import React from 'react';
import styles from '../styles/FileComp.module.css';

type File = {
  name: string;
  language: string;
  value: string;
};

type Props = {
  files: File[];
  setter: any;
  fileAdder: any;
  fileDeleter: any;
  currentFile: File;
};

const FileComp: React.FC<Props> = ({
  files,
  setter,
  fileAdder,
  fileDeleter,
  currentFile,
}) => {
  const [inputBx, setInputBx] = React.useState(false);
  const [inputData, setInputData] = React.useState('');

  const handleChange = (e) => {
    setInputData(e.target.value);
  };

  const handleDelete = (name) => {
    fileDeleter(name);
  };

  const handleSubmit = () => {
    let regex = /[^\\]*\.(\w+)$/;
    let file = {};
    let total = inputData.match(regex);
    console.log(total[1]);
    if (total[1] == 'js') {
      file = {
        name: inputData,
        language: 'javascript',
        value: '',
      };
    }
    if (total[1] == 'css') {
      file = {
        name: inputData,
        language: 'css',
        value: '',
      };
    }
    if (total[1] == 'html') {
      file = {
        name: inputData,
        language: 'html',
        value: '',
      };
    }
    if (total[1] == 'ts') {
      file = {
        name: inputData,
        language: 'typescript',
        value: '',
      };
    }
    if (total[1] == 'cpp') {
      file = {
        name: inputData,
        language: 'cpp',
        value: '',
      };
    }
    if (total[1] == 'java') {
      file = {
        name: inputData,
        language: 'java',
        value: '',
      };
    }
    if (total[1] == 'php') {
      file = {
        name: inputData,
        language: 'php',
        value: '',
      };
    }
    if (total[1] == 'scss') {
      file = {
        name: inputData,
        language: 'scss',
        value: '',
      };
    }
    if (total[1] == 'go') {
      file = {
        name: inputData,
        language: 'go',
        value: '',
      };
    }
    if (total[1] == 'py') {
      file = {
        name: inputData,
        language: 'python',
        value: '',
      };
    }
    fileAdder(file);
    setInputData('');
    setInputBx(false);
  };

  if (!inputBx) {
    return (
      <div className={styles.container}>
        <h3>Files</h3>
        <ul className={styles.filelist}>
          {files.map((item) => {
            return (
              <div
                className={styles.list}
                key={Math.random() * Math.random() * 2346}
              >
                <li onClick={() => setter(item.name)}>{item.name}</li>
                <button
                  disabled={currentFile.name == item.name}
                  onClick={() => handleDelete(item.name)}
                >
                  X
                </button>
              </div>
            );
          })}
          <li onClick={() => setInputBx(true)} className={styles.add}>
            +
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className={styles.Icontainer}>
        <input
          type="text"
          placeholder="Unique file name"
          value={inputData}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Create File</button>
      </div>
    );
  }
};

export default FileComp;
