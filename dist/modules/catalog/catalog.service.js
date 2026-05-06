"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CatalogService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../shared/database/prisma.service.js");
const email_service_js_1 = require("../../shared/email/email.service.js");
const notification_service_js_1 = require("../notification/notification.service.js");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let CatalogService = CatalogService_1 = class CatalogService {
    prisma;
    emailService;
    notificationService;
    logger = new common_1.Logger(CatalogService_1.name);
    constructor(prisma, emailService, notificationService) {
        this.prisma = prisma;
        this.emailService = emailService;
        this.notificationService = notificationService;
    }
    async onModuleInit() {
        const storageDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'storage');
        const requiredPaths = [
            path.join(storageDir, 'catalog', 'images'),
            path.join(storageDir, 'cache', 'kommerce')
        ];
        for (const dir of requiredPaths) {
            try {
                if (!fs.existsSync(dir)) {
                    this.logger.log(`Creating storage directory at: ${dir}`);
                    fs.mkdirSync(dir, { recursive: true });
                }
            }
            catch (err) {
                this.logger.error(`Failed to create storage directory ${dir}: ${err.message}`);
            }
        }
    }
    async createProduct(dto) {
        this.logger.log(`Creating new product: ${dto.name}`);
        const product = await this.prisma.product.create({
            data: {
                name: dto.name,
                description: dto.description,
                category_id: dto.categoryId,
                brand_id: dto.brandId,
                base_price: dto.price,
                gender_id: dto.genderId,
                variants: {
                    create: dto.variants.map((v) => ({
                        color_id: v.colorId,
                        size_id: v.sizeId,
                        stock: v.stock,
                        price: v.variantPrice,
                    })),
                },
            },
            include: { variants: true, category: true, images: true },
        });
        const result = this.formatProductImages(product);
        this.notifyAllUsersNewProduct(result).catch(err => this.logger.error(`Failed to notify users about new product: ${err.message}`));
        return result;
    }
    async notifyAllUsersNewProduct(product) {
        const users = await this.prisma.user.findMany();
        this.logger.log(`Sending new product notifications to ${users.length} users...`);
        for (const user of users) {
            if (user.id) {
                await this.notificationService.createNotification(user.id, 'Koleksi Baru! ✨', `Produk baru "${product.name}" kini tersedia di Allibaas. Cek sekarang sebelum kehabisan!`).catch(() => { });
                if (user.email) {
                    const primaryImage = product.images?.find(img => img.is_primary) || product.images?.[0];
                    const html = this.emailService.getNewProductTemplate(product.name, Number(product.base_price), primaryImage?.image_url || '', product.description || '');
                    await this.emailService.sendHtmlEmail(user.email, `Koleksi Baru: ${product.name} ✨`, html).catch(() => { });
                }
            }
        }
    }
    async findAll(limit = 10, offset = 0) {
        this.logger.log(`Fetching all products (limit: ${limit}, offset: ${offset})`);
        const products = await this.prisma.product.findMany({
            take: limit,
            skip: offset,
            include: { variants: true, category: true, brand: true, images: true },
            orderBy: { created_at: 'desc' },
        });
        return products.map(p => this.formatProductImages(p));
    }
    async findOne(id) {
        this.logger.log(`Fetching product details for ID: ${id}`);
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                variants: { include: { color: true, size: true } },
                category: true,
                images: true,
                reviews: {
                    include: { user: { select: { name: true } } },
                    orderBy: { created_at: 'desc' }
                }
            },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return this.formatProductImages(product);
    }
    async updateProduct(id, data) {
        this.logger.log(`Updating product ID: ${id}`);
        const updateData = {};
        if (data.name)
            updateData.name = data.name;
        if (data.description)
            updateData.description = data.description;
        if (data.price)
            updateData.base_price = data.price;
        if (data.categoryId)
            updateData.category = { connect: { id: data.categoryId } };
        const product = await this.prisma.product.update({
            where: { id },
            data: updateData,
            include: { variants: true, category: true },
        });
        return product;
    }
    async deleteProduct(id) {
        this.logger.log(`Deleting product ID: ${id}`);
        await this.prisma.productVariant.deleteMany({ where: { product_id: id } });
        await this.prisma.productImage.deleteMany({ where: { product_id: id } });
        await this.prisma.review.deleteMany({ where: { product_id: id } });
        await this.prisma.product.delete({ where: { id: id } });
        return { success: true };
    }
    async uploadImages(productId, files) {
        this.logger.log(`Uploading ${files.length} images for product ID: ${productId}`);
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            include: { images: true }
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        const baseUrl = process.env.APP_URL || 'https://allibaas.id';
        const imageRecords = files.map((file, index) => {
            const isPrimary = (product.images.length === 0 && index === 0) ? 1 : 0;
            return {
                product_id: productId,
                image_url: `${baseUrl}/catalog/images/${file.filename}`,
                is_primary: isPrimary
            };
        });
        await this.prisma.productImage.createMany({
            data: imageRecords
        });
        return this.findOne(productId);
    }
    async deleteImage(imageId) {
        this.logger.log(`Deleting image ID: ${imageId}`);
        const image = await this.prisma.productImage.findUnique({
            where: { id: imageId }
        });
        if (!image)
            throw new common_1.NotFoundException('Image not found');
        if (image.image_url) {
            const fs = await import('fs');
            const path = await import('path');
            const filename = image.image_url.split('/').pop();
            if (!filename) {
                this.logger.warn(`Could not extract filename from URL: ${image.image_url}`);
                return;
            }
            const storageDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'storage');
            const filePath = path.join(storageDir, 'catalog', 'images', filename);
            try {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
            catch (err) {
                this.logger.error(`Failed to delete file: ${filePath}`, err);
            }
        }
        await this.prisma.productImage.delete({
            where: { id: imageId }
        });
        return { success: true };
    }
    async setPrimaryImage(imageId) {
        this.logger.log(`Setting image ID: ${imageId} as primary`);
        const image = await this.prisma.productImage.findUnique({
            where: { id: imageId }
        });
        if (!image)
            throw new common_1.NotFoundException('Image not found');
        await this.prisma.productImage.updateMany({
            where: { product_id: image.product_id },
            data: { is_primary: 0 }
        });
        await this.prisma.productImage.update({
            where: { id: imageId },
            data: { is_primary: 1 }
        });
        return { success: true };
    }
    async search(query, limit = 10, offset = 0) {
        this.logger.log(`Searching products with query: "${query}"`);
        const products = await this.prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: query } },
                    { description: { contains: query } },
                    { category: { name: { contains: query } } },
                ],
            },
            take: limit,
            skip: offset,
            include: {
                variants: true,
                category: true,
                brand: true,
                images: true
            },
            orderBy: { created_at: 'desc' },
        });
        return products.map(p => this.formatProductImages(p));
    }
    async findProductsByGender(genderCode, limit = 10, offset = 0) {
        this.logger.log(`Finding products by gender code: ${genderCode}`);
        const products = await this.prisma.product.findMany({
            where: {
                gender: { code: genderCode },
                is_active: 1,
            },
            take: limit,
            skip: offset,
            include: {
                variants: true,
                category: true,
                brand: true,
                images: true,
            },
            orderBy: { created_at: 'desc' },
        });
        return products.map(p => this.formatProductImages(p));
    }
    async getRelatedProducts(id, limit = 10) {
        this.logger.log(`Fetching related products for ID: ${id}`);
        const product = await this.findOne(id);
        const products = await this.prisma.product.findMany({
            where: {
                id: { not: id },
                category_id: product.category_id,
                gender_id: product.gender_id,
                is_active: 1,
            },
            take: limit,
            include: {
                variants: true,
                category: true,
                brand: true,
                images: true,
            },
        });
        return products.map(p => this.formatProductImages(p));
    }
    async seed(count = 100) {
        this.logger.log(`Starting database seed process (target products: ${count})`);
        const bcrypt = await import('bcryptjs');
        const pass = await bcrypt.default.hash('password123', 10);
        let user = await this.prisma.user.findUnique({ where: { email: 'test@example.com' } });
        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    id: 'USR-TEST',
                    email: 'test@example.com',
                    password: pass,
                    name: 'Mr. Tester',
                    roles: {
                        create: { role: { connect: { id: 2 } } }
                    }
                }
            });
        }
        let category = await this.prisma.mtCategory.findFirst();
        if (!category) {
            category = await this.prisma.mtCategory.create({ data: { name: 'Pakaian Pria', display_order: 1 } });
        }
        let brand = await this.prisma.mtBrand.findFirst();
        if (!brand) {
            brand = await this.prisma.mtBrand.create({ data: { name: 'Al-Fatih Exclusive', description: 'Premium Brand' } });
        }
        let color = await this.prisma.mtColor.findFirst();
        if (!color) {
            color = await this.prisma.mtColor.create({ data: { name: 'Putih' } });
        }
        let size = await this.prisma.mtSize.findFirst();
        if (!size) {
            size = await this.prisma.mtSize.create({ data: { name: 'XL', description: 'Extra Large' } });
        }
        let gender = await this.prisma.mtGender.findFirst();
        if (!gender) {
            gender = await this.prisma.mtGender.create({ data: { code: 'M', name: 'Male' } });
        }
        const productsToCreate = [
            { name: 'Koko Kurta Modern', description: 'Koko kurta dengan bahan katun premium yang nyaman.' },
            { name: 'Gamis Ikhwan Basic', description: 'Gamis pria model basic untuk ibadah harian.' },
            { name: 'Sirwal Outdoor', description: 'Celana sirwal tangguh untuk aktivitas luar ruangan.' },
        ];
        const createdProducts = [];
        for (const p of productsToCreate) {
            const oldProducts = await this.prisma.product.findMany({ where: { name: p.name } });
            for (const oldP of oldProducts) {
                await this.prisma.productVariant.deleteMany({ where: { product_id: oldP.id } });
                await this.prisma.productImage.deleteMany({ where: { product_id: oldP.id } });
                await this.prisma.review.deleteMany({ where: { product_id: oldP.id } });
                await this.prisma.product.delete({ where: { id: oldP.id } });
            }
            const product = await this.prisma.product.create({
                data: {
                    name: p.name,
                    description: p.description,
                    category_id: category.id,
                    brand_id: brand.id,
                    base_price: 150000,
                    gender_id: gender.id,
                    variants: {
                        create: [
                            { color_id: color.id, size_id: size.id, stock: 50, price: 150000 }
                        ]
                    },
                    images: {
                        create: [
                            {
                                image_url: p.name === 'Koko Kurta Modern' ? 'catalog/images/koko_modern.png' :
                                    p.name === 'Gamis Ikhwan Basic' ? 'catalog/images/gamis_ikhwan.png' :
                                        'catalog/images/sirwal_outdoor.png',
                                is_primary: 1
                            }
                        ]
                    }
                },
                include: { variants: true, category: true, images: true }
            });
            if (product) {
                createdProducts.push(product.name ?? 'Unknown');
            }
        }
        return {
            message: 'Seed and preparation executed successfully.',
            seededProducts: createdProducts
        };
    }
    formatProductImages(product) {
        if (product && product.images) {
            product.images = product.images.map(img => ({
                ...img,
                image_url: img.image_url && !img.image_url.startsWith('http') && !img.image_url.startsWith('/')
                    ? `/${img.image_url}`
                    : img.image_url
            }));
        }
        return product;
    }
};
exports.CatalogService = CatalogService;
exports.CatalogService = CatalogService = CatalogService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        email_service_js_1.EmailService,
        notification_service_js_1.NotificationService])
], CatalogService);
//# sourceMappingURL=catalog.service.js.map