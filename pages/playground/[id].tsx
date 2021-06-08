import React from 'react';
import EditorComp from '../../components/EditorComp';
import { useRouter } from 'next/router';

const Playground = () => {
  const router = useRouter();
  const { id } = router.query;
  const [filesData, setFilesData] = React.useState(null);

  const getFileData = async () => {
    if (sessionStorage.getItem('idcr') !== id) {
      const res = await fetch(
        `https://playgroundserv.herokuapp.com/databaseR/${id}`
      );
      const data = await res.json();
      if (typeof id === 'string') sessionStorage.setItem('idcr', id);
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
    console.log('id', id);
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
