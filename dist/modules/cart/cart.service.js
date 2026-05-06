"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CartService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../shared/database/prisma.service.js");
let CartService = CartService_1 = class CartService {
    prisma;
    logger = new common_1.Logger(CartService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCart(userId) {
        this.logger.log(`Fetching cart for User ID: ${userId}`);
        const cart = await this.prisma.cart.findFirst({
            where: { user_id: userId },
            include: {
                items: {
                    include: {
                        product_variant: {
                            include: {
                                product: {
                                    include: { images: { where: { is_primary: 1 } } }
                                },
                                color: true,
                                size: true,
                            },
                        },
                    },
                },
            },
        });
        if (!cart) {
            return { itemsCount: 0, items: [], totalAmount: 0 };
        }
        return this.transformCart(cart);
    }
    async addItem(userId, variantId, qty, cartId) {
        this.logger.log(`Adding item to cart - User ID: ${userId}, Variant ID: ${variantId}, Qty: ${qty}`);
        const variant = await this.prisma.productVariant.findUnique({
            where: { id: variantId },
        });
        if (!variant)
            throw new common_1.NotFoundException('Product variant not found');
        if ((variant.stock || 0) < qty)
            throw new common_1.BadRequestException('Insufficient stock');
        let cart;
        if (cartId) {
            cart = await this.prisma.cart.findFirst({
                where: { id: cartId, user_id: userId },
            });
            if (!cart)
                throw new common_1.NotFoundException('Cart not found or access denied');
        }
        else {
            cart = await this.prisma.cart.findFirst({ where: { user_id: userId } });
            if (!cart) {
                cart = await this.prisma.cart.create({ data: { user_id: userId } });
            }
        }
        const existingItem = await this.prisma.cartItem.findFirst({
            where: { cart_id: cart.id, product_variant_id: variantId },
        });
        if (existingItem) {
            await this.prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { qty: qty },
            });
        }
        else {
            await this.prisma.cartItem.create({
                data: {
                    cart_id: cart.id,
                    product_variant_id: variantId,
                    qty: qty,
                },
            });
        }
        return this.getCart(userId);
    }
    async incrementItem(userId, variantId, cartId) {
        this.logger.log(`Incrementing cart item qty - User ID: ${userId}, Variant ID: ${variantId}, Cart ID: ${cartId}`);
        const cart = await this.prisma.cart.findFirst({
            where: { id: cartId, user_id: userId },
        });
        if (!cart)
            throw new common_1.NotFoundException('Cart not found or access denied');
        const item = await this.prisma.cartItem.findFirst({
            where: { cart_id: cart.id, product_variant_id: variantId },
        });
        if (item) {
            const variant = await this.prisma.productVariant.findUnique({ where: { id: variantId } });
            if ((variant?.stock || 0) <= (item.qty || 0)) {
                throw new common_1.BadRequestException('Insufficient stock');
            }
            await this.prisma.cartItem.update({
                where: { id: item.id },
                data: { qty: (item.qty || 0) + 1 },
            });
        }
        else {
            await this.prisma.cartItem.create({
                data: { cart_id: cart.id, product_variant_id: variantId, qty: 1 },
            });
        }
        return this.getCart(userId);
    }
    async decrementItem(userId, variantId, cartId) {
        this.logger.log(`Decrementing cart item qty - User ID: ${userId}, Variant ID: ${variantId}, Cart ID: ${cartId}`);
        const cart = await this.prisma.cart.findFirst({
            where: { id: cartId, user_id: userId },
        });
        if (!cart)
            throw new common_1.NotFoundException('Cart not found or access denied');
        const item = await this.prisma.cartItem.findFirst({
            where: { cart_id: cart.id, product_variant_id: variantId },
        });
        if (!item)
            throw new common_1.NotFoundException('Item not found in cart');
        if ((item.qty || 0) > 1) {
            await this.prisma.cartItem.update({
                where: { id: item.id },
                data: { qty: (item.qty || 0) - 1 },
            });
        }
        else {
            await this.prisma.cartItem.delete({
                where: { id: item.id },
            });
        }
        return this.getCart(userId);
    }
    async removeItem(userId, variantId) {
        this.logger.log(`Removing item from cart - User ID: ${userId}, Variant ID: ${variantId}`);
        const cart = await this.prisma.cart.findFirst({ where: { user_id: userId } });
        if (!cart)
            return;
        await this.prisma.cartItem.deleteMany({
            where: { cart_id: cart.id, product_variant_id: variantId },
        });
        return this.getCart(userId);
    }
    async clearCart(userId) {
        this.logger.log(`Clearing cart for User ID: ${userId}`);
        const cart = await this.prisma.cart.findFirst({ where: { user_id: userId } });
        if (!cart)
            return;
        await this.prisma.cartItem.deleteMany({ where: { cart_id: cart.id } });
        return { itemsCount: 0, items: [], totalAmount: 0 };
    }
    transformCart(cart) {
        const items = cart.items.map((item) => ({
            variantId: item.product_variant_id,
            productName: item.product_variant.product.name,
            variantName: `${item.product_variant.color?.name || ''} ${item.product_variant.size?.name || ''}`.trim(),
            imageUrl: item.product_variant.product.images[0]?.image_url || null,
            qty: item.qty,
            price: Number(item.product_variant.price),
            subtotal: Number(item.product_variant.price) * (item.qty || 0),
        }));
        const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0);
        return {
            cartId: cart.id,
            itemsCount: items.length,
            items,
            totalAmount,
        };
    }
};
exports.CartService = CartService;
exports.CartService = CartService = CartService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map