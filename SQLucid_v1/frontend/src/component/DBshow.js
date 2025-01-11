// import React from 'react'
// import { DataGrid } from '@mui/x-data-grid';

// function DBSelect() {
//     return (
//         <Box sx={{ minWidth: 20 }} style={{width: '100%'}}>
//           <FormControl fullWidth>
//             <InputLabel id="demo-simple-select-label">DataBase</InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               value={age}
//               label="DataBase"
//               onChange={handleChange}
//             >
//               <MenuItem value={10}>Dessert</MenuItem>
//               <MenuItem value={20}>Student</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//       );
// }

// function TBSelect() {
//     return (
//         <Box sx={{ minWidth: 20 }} style={{width: '100%'}}>
//           <FormControl fullWidth>
//             <InputLabel id="demo-simple-select-label">Table</InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               value={age}
//               label="Table"
//               onChange={handleChange}
//             >
//               <MenuItem value={10}>Dessert</MenuItem>
//               <MenuItem value={20}>Price</MenuItem>
//               <MenuItem value={30}>Brand</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//       );
//     }
// }

// const columns = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'firstName', headerName: 'First name', width: 130 },
//   { field: 'lastName', headerName: 'Last name', width: 130 },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 90,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.getValue(params.id, 'firstName') || ''} ${
//         params.getValue(params.id, 'lastName') || ''
//       }`,
//   },
// ];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];



// export default class DBshow extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         dbID: '',
//         // table = id + content
//         tables: []
//       };
      
//   }

//   componentDidMount() {
//     this.timerID = setInterval(
//       () => this.tick(),
//       1000
//     );
//   }

//   componentWillUnmount() {
//     clearInterval(this.timerID);
//   }

//   tick() {
//     this.setState({
//       date: new Date()
//     });
//   }

//   render() {
//     return (
//       <div>
//           <div style={{height:'20%', width:'100%', display: 'flex', justifyContent: 'space-around'}}>

//               <div style={{ width:'40%', display: 'flex', justifyContent: 'flex-start', textAlign: 'center', alignItems: 'center' }}>
//                   <Typography variant="h3">DataBase</Typography>
//               </div>

//               <div style={{ width:'20%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
//                   <DBSelect />
//               </div>

//               <div style={{ width:'20%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
//                   <TBSelect />
//               </div>
              
//           </div>

//           <div style={{height:'80%', width:'100%', display: 'flex', justifyContent: 'space-around'}}>
//             <DataGrid
//               rows={rows}
//               columns={columns}
//               pageSize={5}
//               rowsPerPageOptions={[5]}
//               checkboxSelection
//             />
//           </div>
//       </div>
//     );
//   }
// }
  
// //   ReactDOM.render(
// //     <Clock />,
// //     document.getElementById('example')
// //   );