const { Router } = require("express");
const { getAllOrders } = require("../controllers/order.controller");

const router = Router();

/**
 * @openapi
 * /api/v1/order:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       201:
 *         description: All orders obtained
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All orders obtained
 *       400:
 *         description: Error getting orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error getting orders
 */

router.get("/", getAllOrders);

module.exports = router;