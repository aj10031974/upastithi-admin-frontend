import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

import Loader from "react-js-loader";
import { useState, useEffect } from "react";

import { GridToolbar } from '@mui/x-data-grid';

// const columns = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'Name', headerName: 'Name', width: 300 },
//   { field: 'CollegeName', headerName: 'College Name', width: 300 },
//   {
//     field: 'Experience',
//     headerName: 'Experience',
//     type: 'number',
//     width: 200,
//   },
//   {
//     field: 'TotalLecturesTaken',
//     headerName: 'Total Lectures Taken',
//     description: 'This column has a value getter and is not sortable.',
//     // sortable: false,
//     type:'number',
//     width: 200,

//   },
// ];

// const rows = [
//   { id: 1, Name: 'Shantanu Jain', CollegeName: 'Pune Insitutute Of Computer Technology', Experience: 35, TotalLecturesTaken:10 },
//   { id: 2, Name: 'Shanty J', CollegeName: 'Cersei', Experience: 42 , TotalLecturesTaken: 11},
//   { id: 3, Name: 'Shan', CollegeName: 'Jaime', Experience: 45 , TotalLecturesTaken: 11},
//   { id: 4, Name: 'Stark', CollegeName: 'Arya', Experience: 16 , TotalLecturesTaken: 11},
//   { id: 5, Name: 'Targaryen', CollegeName: 'Daenerys', Experience: null , TotalLecturesTaken: 11},
//   { id: 6, Name: 'Melisandre', CollegeName: null, Experience: 150 , TotalLecturesTaken: 11},
//   { id: 7, Name: 'Clifford', CollegeName: 'Ferrara', Experience: 44 , TotalLecturesTaken: 11},
//   { id: 8, Name: 'Frances', CollegeName: 'Rossini', Experience: 36 , TotalLecturesTaken: 11},
//   { id: 9, Name: 'Roxie', CollegeName: 'Harvey', Experience: 65 , TotalLecturesTaken: 12},
// ];
export default function DataTable({ row, cols }) {
  const [rows, setrows] = useState(row)
  const [columns, setcolumns] = useState(cols)
  useEffect(() => {
    setrows(row)
    setcolumns(cols)
  
    
  }, [])
  
  return (
    <div style={{ height: 600, width: "100%" }}>
      {row["length"] == 0 || cols["length"] == 0 ? (
        <div>
          <div classname="row">
            <div classname="col-12 grid-margin">
              <div classname="card">
                <div classname="card-body">
                  <Loader
                    type="spinner-cub"
                    bgColor={"#808080"}
                    // title={"Loading"}
                    color={"#808080"}
                    size={50}
                    
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <DataGrid
          rows={row}
          columns={cols}
          pageSize={10}
          rowsPerPageOptions={[5,10]}
          checkboxSelection
          style={{ background: "#fff" }}
          loading={false}
          autoPageSize={true}
          components={{ Toolbar: GridToolbar }}
          filterModel={{
            items: [
              { columnField: 'name', operatorValue: 'contains', value: 'Tanvesh' },
            ],
          }}
          // disableSelectionOnClick
          // experimentalFeatures={{ newEditingApi: true }}
        />
      )}
    </div>
  );
}
