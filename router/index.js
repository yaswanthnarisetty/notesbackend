import express from "express"
const router = express.Router()
import { CreateNote,EditNote,DeleteNote,GetNoteByCategory,FavoriteStatus } from "../controllers/noteController.js";
// import {Search} from "../controllers/searchController.js";
import {login,register,verifyToken} from "../controllers/authController.js";
import { createCategory,getSingleCategory,getCategories,updateCategory,deleteCategory } from "../controllers/categoryController.js";

router.get("/", (req, res) => {
    console.log("hiiiiiiiiiiii");
    res.send("hello");
  });

router.post("/register",register);

router.post("/login",login );

router.post('/api/notes',CreateNote)
router.put('/api/notes/:id', EditNote)
router.delete('/api/notes/:id', DeleteNote)
//GET /api/notes?category=:categoryId
router.get('/api/notes/category/:categoryId', GetNoteByCategory)
router.patch('/api/notes/:id/favorite', FavoriteStatus)

router.post('/api/categories',createCategory)
router.get('/api/categories/:id', getSingleCategory)
router.get('/api/categories', getCategories)
router.put('/api/categories/:id', updateCategory)
router.delete('/api/categories/:id', deleteCategory)

//router.get("/product/:id",verifyToken,findProduct);

// router.get("/search/:key",verifyToken,Search)



export default router;
