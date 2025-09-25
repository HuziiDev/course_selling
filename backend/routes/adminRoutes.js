import express from 'express'
import { createCourse, signin, signup, updateCourse } from '../controllers/adminController.js'
import adminMiddleware from '../middlewares/admin.js'



const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/course', adminMiddleware, createCourse)
router.put('/update-course', adminMiddleware, updateCourse)

export default router
