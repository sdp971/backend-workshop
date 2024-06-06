import { useState, useEffect } from 'react';
import useAPI from '../api/useApi.js';
import { DataGrid } from '@mui/x-data-grid/node';
import { useAuth } from '../context/AuthProvider.jsx';
// import { DeleteOutline } from '@mui/icons-material';
// import { Link } from 'react-router-dom';

function Media() {
  const [data, setData] = useState([]);
  const api = useAPI();
  const { isAdmin } = useAuth();

  const getAllMedia = () => {
    api
      .get(`/api/media`)
      .then((response) => {
        console.log(response)
       
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllMedia();
  },[]);


  // const deleteMedia = () => {

  // }
  
  const columns = [
    { field: 'id', headerName: 'identifiant', width: 150, type: 'number' },
    {
      field: 'title',
      headerName: 'Titre',
      width: 150,
      editable: true,
      type: 'string',
    },
    {
      field: 'editor',
      headerName: 'Editeur',
      width: 350,
      editable: true,
      type: 'string',
    },
    {
      field: 'genre',
      headerName: 'Genre',
      width: 350,
      editable: true,
      type: 'string',
    },
    {
      field: 'language',
      headerName: 'Langue',
      width: 350,
      editable: true,
      type: 'string',
    },
    {
      field: 'sector',
      headerName: 'Secteur',
      width: 350,
      editable: true,
      type: 'string',
    },
    {
      field: 'type',
      headerName: 'Type de media',
      width: 350,
      editable: true,
      type: 'string',
    },
    // {
    //   field: 'action',
    //   headerName: 'Action',
    //   width: 250,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={`/api/media${params.row.id}`}>
    //           <button  type='submit'>
    //             Edit
    //           </button>
    //         </Link>
    //         <DeleteOutline
             
    //           onClick={() => deleteMedia(params.row.id)}
    //         />
    //       </>
    //     );
    //   },
    // },
  ];

 
  
  return (
    <section>
      {isAdmin ? (
        <>
          <h2 className='media-title'>Liste des médias</h2>
          <DataGrid rows={data} columns={columns} />
        </>
      ) : (
        <h2>
          Accès refusé ⛔- Seuls les administrateurs peuvent accéder à cette page
        </h2>
      )}
    </section>
  );
  
}
 


export default Media;
