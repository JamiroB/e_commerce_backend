const { Router } = require("express");
const { createProductInCart, getAllProductsInCart, purchasedProductInCart } = require("../controllers/productInCart.controller");

const router = Router();

/**
 * @openapi
 * /api/v1/productsincart:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all productsInCart
 *     tags: [productsInCart]
 *     responses:
 *       201:
 *         description: All productsInCart obtained
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All productsInCart obtained
 *       400:
 *         description: Error getting productsInCart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error getting productsInCart
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a productInCart into application
 *     tags: [productsInCart]
 *     requestBody:
 *       description: Required fields to add a product
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/addProductInCart"
 *     responses:
 *       201:
 *         description: productInCart created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/productInCartResponse"
 *       400:
 *         description: Error creating productInCart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error creating productInCart
 * /api/v1/productsincart/purchased:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Buying productsInCart
 *     tags: [productsInCart]
 *     responses:
 *       201:
 *         description: Purchased successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Purchased successfully
 *       400:
 *         description: Error purchasing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error purchasing
 */

router.get("/", getAllProductsInCart);
router.post("/", createProductInCart);
router.post("/purchased", purchasedProductInCart);

module.exports = router;