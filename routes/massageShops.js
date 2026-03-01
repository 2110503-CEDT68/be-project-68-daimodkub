const express = require('express');
const { getMassageShops, getMassageShop, createMassageShop, updateMassageShop, deleteMassageShop } = require('../controllers/massageShops');

const reservationRouter = require('./reservations');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     MassageShop:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - tel
 *         - opentime
 *         - closetime
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
 *           example: 609bda561452242d88d36e37
 *         ลำดับ:
 *           type: string
 *           description: Ordinal number
 *           example: "1"
 *         name:
 *           type: string
 *           description: Massage shop name
 *         address:
 *           type: string
 *           description: Street address
 *         district:
 *           type: string
 *           description: District
 *         province:
 *           type: string
 *           description: province
 *         postalcode:
 *           type: string
 *           description: 5-digit postal code
 *         tel:
 *           type: string
 *           description: Telephone number
 *         opentime:
 *           type: string
 *           example: "09:00"
 *         closetime:
 *           type: string
 *           example: "22:00"
 *         region:
 *           type: string
 *           description: region
 *       example:
 *         id: 609bda561452242d88d36e37
 *         ลำดับ: "1"
 *         name: Happy Massage
 *         address: 121 ถ.สุขุมวิท
 *         district: บางนา
 *         province: กรุงเทพมหานคร
 *         postalcode: 10110
 *         tel: 02-2187000
 *         opentime: "09:00"
 *         closetime: "22:00"
 *         region: กรุงเทพมหานคร (Bangkok)
 */

/**
 * @swagger
 * tags:
 *   name: MassageShops
 *   description: The massageShops managing API
 */

/**
 * @swagger
 * /massageShops:
 *   get:
 *     summary: Returns the list of all the massageShops
 *     tags: [MassageShops]
 *     responses:
 *       200:
 *         description: The list of the massageShops
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MassageShop'
 */

/**
 * @swagger
 * /massageShops:
 *   post:
 *     summary: Create a new massageShop
 *     tags: [MassageShops]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MassageShop'
 *     responses:
 *       201:
 *         description: The massageShop was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MassageShop'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /massageShops/{id}:
 *   get:
 *     summary: Get the massageShop by id
 *     tags: [MassageShops]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The massageShop id
 *     responses:
 *       200:
 *         description: The massageShop description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MassageShop'
 *       404:
 *         description: The massageShop was not found
 */

/**
 * @swagger
 * /massageShops/{id}:
 *   put:
 *     summary: Update the massageShop by the id
 *     tags: [MassageShops]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The massageShop id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MassageShop'
 *     responses:
 *       200:
 *         description: The massageShop was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MassageShop'
 *       404:
 *         description: The massageShop was not found
 *       500:
 *         description: Some error happened
 */

/**
 * @swagger
 * /massageShops/{id}:
 *   delete:
 *     summary: Remove the massageShop by id
 *     tags: [MassageShops]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The massageShop id
 *     responses:
 *       200:
 *         description: The massageShop was deleted
 *       404:
 *         description: The massageShop was not found
 */

const { protect, authorize } = require('../middleware/auth');

router.use('/:massageShopId/reservations', reservationRouter);

router.route('/').get(getMassageShops).post(protect, authorize('admin'), createMassageShop);
router.route('/:id').get(getMassageShop).put(protect, authorize('admin'), updateMassageShop).delete(protect, authorize('admin'), deleteMassageShop);

module.exports = router;
