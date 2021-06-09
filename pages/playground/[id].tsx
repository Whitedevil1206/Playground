import React from 'react';
import EditorComp from '../../components/EditorComp';
import { useRouter } from 'next/router';

type File = {
  name: string;
  language: string;
  value: string;
};

const Playground: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [filesData, setFilesData] = React.useState<null | File[]>(null);

  const getFileData = async () => {
    if (sessionStorage.getItem('idcr') !== id) {
      const res = await fetch(
        `https://playgroundserv.herokuapp.com/databaseR/${id}`
      );
      const data = await res.json();
      setFilesData(data.allFiles);
    } else {
      const res = await fetch(
        `https://playgroundserv.herokuapp.com/instasave/${id}`
      );
      const data = await res.json();
      setFilesData(data);
    }
  };

  React.useEffect(() => {
    if (!id) {
      return;
    }
    getFileData();
  }, [id]);

  if (filesData) {
    return (
      <div className="background">
        <EditorComp files={filesData} id={id} />
      </div>
    );
  } else {
    return (
      <div className="background">
        <p>Fetching</p>
      </div>
    );
  }
};

export default Playground;
