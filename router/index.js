import express from "express"
const router = express.Router()
import { createNote,editNote,deleteNote,getNotesByCategory,toggleFavoriteStatus, getAllFavorites, getSingleNote } from "../controllers/noteController.js";
// import {Search} from "../controllers/searchController.js";
import {login,register,authenticateUser} from "../controllers/authController.js";
import { createCategory,getSingleCategory,getCategories,updateCategory,deleteCategory } from "../controllers/categoryController.js";

router.get("/", (req, res) => {
    console.log("hiiiiiiiiiiii");
    res.send("hello");
  });

router.post("/register",register);

router.post("/login",login );

router.post('/api/notes',authenticateUser,createNote)
router.put('/api/notes/:id',authenticateUser, editNote)
router.delete('/api/notes/:id',authenticateUser, deleteNote)
//GET /api/notes?category=:categoryId
router.get('/api/notes/category/:categoryId',authenticateUser, getNotesByCategory)
router.patch('/api/notes/:id/favorite',authenticateUser, toggleFavoriteStatus)

router.post('/api/categories',authenticateUser,createCategory)
router.get('/api/categories/:id',authenticateUser, getSingleCategory)
router.get('/api/categories',authenticateUser, getCategories)
router.put('/api/categories/:id',authenticateUser, updateCategory)
router.delete('/api/categories/:id',authenticateUser, deleteCategory)
router.get('/favorites', authenticateUser, getAllFavorites);
router.get('/notes/:id', authenticateUser, getSingleNote);
//router.get("/product/:id",verifyToken,findProduct);

// router.get("/search/:key",verifyToken,Search)



export default router;
