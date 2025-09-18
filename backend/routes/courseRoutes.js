import express from 'express'
import { getCourses, getPurchasedCourses, purchaseCourses } from '../controllers/courseController.js'

const router = express.Router()



router.get('/courses', getCourses)
router.get('/purchases', getPurchasedCourses)
router.post('/purchases', purchaseCourses)

export default router