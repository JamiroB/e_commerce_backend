const { Router } = require("express");
const { createProduct, getAllProducts } = require("../controllers/products.controller");

const router = Router();

/**
 * @openapi
 * /api/v1/products:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       201:
 *         description: All products obtained
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All products obtained
 *       400:
 *         description: Error getting products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error getting products
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a product into application
 *     tags: [Products]
 *     requestBody:
 *       description: Required fields to add a product
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/product"
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/productResponse"
 *       400:
 *         description: Error creating product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error creating product
 */

router.get("/", getAllProducts);
router.post("/", createProduct);

module.exports = router;
