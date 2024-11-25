// import Product from "../models/Product.js";




// export const Search = async (req, res) => {
//     let result
//     if(req.role === "admin"){
//    result = await Product.find({
//     $or: [
//       { name: { $regex: req.params.key } },
//       { company: { $regex: req.params.key } },
//       { category: { $regex: req.params.key } },
//     ],
//   });
// }
// else{
//     result= await Product.find({
//         $and:[
//             {
//                 userId:req.userId
//             },
//             {
//                 $or: [
//                     { name: { $regex: req.params.key } },
//                     { company: { $regex: req.params.key } },
//                     { category: { $regex: req.params.key } },
//                   ]
//             }
            
//         ]

//     })
    

// }
//   res.send(result);
// };

// export default Search;
