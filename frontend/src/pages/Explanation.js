// function clickedExp(str) {



//     console.log("in here ???");
//     console.log(str);

//     return (
//       <div>
//         {this.state.isEdit ? (
//           <textarea onBlur={() => { this.state.isEdit = false; }} value={str} type="text" placeholder="Add explanation here ..."
//             style={{ width: '100%', display: 'flex', borderStyle: "none", fontSize: "21px", borderRadius: "10px", WebkitTextSizeAdjust: 'none', textSizeAdjust: 'none', minHeight: '30px' }}
//             cols="200"
//             rows="1"
//             onMouseMove={(e) => {
//               var ob = e.currentTarget;
//               autoTextarea(ob);
//             }}
//             onChange={(e) => {
//               var ob = e.currentTarget;
//               subexp.explanation = ob.value;
//             //   this.forceUpdate();
//               autoTextarea(ob); // make the textarea automatically increase the height based on the text
//             }} />
//         ) : (
//           <div style={{  }} >
//             {str}
//           </div>
//         )}
//       </div>
//     );
//   };