-- CreateTable
CREATE TABLE `mt_brands` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mt_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `display_order` INTEGER NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mt_colors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mt_genders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(20) NULL,
    `name` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mt_product_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NULL,
    `image_url` TEXT NULL,
    `is_primary` TINYINT NULL DEFAULT 0,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `product_id`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mt_product_variants` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NULL,
    `color_id` INTEGER NULL,
    `size_id` INTEGER NULL,
    `sku` VARCHAR(100) NULL,
    `stock` INTEGER NULL,
    `price` DECIMAL(12, 2) NULL,
    `discount_price` DECIMAL(12, 2) NULL,
    `discount_percent` DECIMAL(5, 2) NULL,
    `discount_start` DATETIME(0) NULL,
    `discount_end` DATETIME(0) NULL,

    INDEX `color_id`(`color_id`),
    INDEX `size_id`(`size_id`),
    UNIQUE INDEX `uk_variant`(`product_id`, `color_id`, `size_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mt_products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NULL,
    `description` TEXT NULL,
    `category_id` INTEGER NULL,
    `brand_id` INTEGER NULL,
    `base_price` DECIMAL(12, 2) NULL,
    `is_active` TINYINT NULL DEFAULT 1,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `gender_id` INTEGER NULL,

    INDEX `brand_id`(`brand_id`),
    INDEX `category_id`(`category_id`),
    INDEX `fk_product_gender`(`gender_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mt_roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mt_sizes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(10) NULL,
    `description` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mt_statuses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_status` VARCHAR(50) NULL,
    `code` VARCHAR(50) NULL,
    `name` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `is_active` TINYINT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_cart_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cart_id` INTEGER NULL,
    `product_variant_id` INTEGER NULL,
    `qty` INTEGER NULL,

    INDEX `cart_id`(`cart_id`),
    INDEX `product_variant_id`(`product_variant_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_carts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(50) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_order_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NULL,
    `product_variant_id` INTEGER NULL,
    `qty` INTEGER NULL,
    `price` DECIMAL(12, 2) NULL,
    `subtotal` DECIMAL(12, 2) NULL,

    INDEX `order_id`(`order_id`),
    INDEX `product_variant_id`(`product_variant_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(50) NULL,
    `order_date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `idempotency_key` VARCHAR(100) NULL,
    `total_amount` DECIMAL(12, 2) NULL,
    `status` VARCHAR(50) NULL,
    `payment_status` VARCHAR(50) NULL,
    `name` VARCHAR(100) NULL,
    `phone` VARCHAR(20) NULL,
    `address` TEXT NULL,
    `city` VARCHAR(100) NULL,
    `postal_code` VARCHAR(10) NULL,
    `order_status_id` INTEGER NULL,
    `payment_status_id` INTEGER NULL,
    `shipping_cost` DECIMAL(12, 2) NULL,
    `courier` VARCHAR(50) NULL,
    `courier_service` VARCHAR(50) NULL,

    UNIQUE INDEX `tbl_orders_idempotency_key_key`(`idempotency_key`),
    INDEX `fk_order_status`(`order_status_id`),
    INDEX `fk_payment_status`(`payment_status_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NULL,
    `payment_method` VARCHAR(50) NULL,
    `payment_date` DATETIME(0) NULL,
    `amount` DECIMAL(12, 2) NULL,
    `status` VARCHAR(50) NULL,
    `transaction_id` VARCHAR(100) NULL,
    `payment_method_id` INTEGER NULL,
    `receipt_url` TEXT NULL,
    `payment_url` TEXT NULL,
    `va_number` VARCHAR(50) NULL,
    `bank_code` VARCHAR(20) NULL,
    `bank_name` VARCHAR(100) NULL,
    `qr_string` TEXT NULL,
    `payment_id` VARCHAR(100) NULL,
    `expired_at` DATETIME(0) NULL,

    UNIQUE INDEX `tbl_payments_payment_id_key`(`payment_id`),
    INDEX `fk_payment_method`(`payment_method_id`),
    INDEX `order_id`(`order_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_reviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(50) NULL,
    `product_id` INTEGER NULL,
    `rating` INTEGER NULL,
    `comment` TEXT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `product_id`(`product_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_shipments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NULL,
    `courier` VARCHAR(50) NULL,
    `tracking_number` VARCHAR(100) NULL,
    `shipping_date` DATETIME(0) NULL,
    `delivery_date` DATETIME(0) NULL,
    `status` VARCHAR(50) NULL,
    `shipment_status_id` INTEGER NULL,

    INDEX `fk_shipment_status`(`shipment_status_id`),
    INDEX `order_id`(`order_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_user_addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(50) NULL,
    `label` VARCHAR(50) NULL,
    `recipient_name` VARCHAR(100) NULL,
    `phone` VARCHAR(20) NULL,
    `address` TEXT NULL,
    `city` VARCHAR(100) NULL,
    `postal_code` VARCHAR(10) NULL,
    `is_default` TINYINT NULL DEFAULT 0,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_user_roles` (
    `user_id` VARCHAR(50) NOT NULL,
    `role_id` INTEGER NOT NULL,

    INDEX `role_id`(`role_id`),
    PRIMARY KEY (`user_id`, `role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_users` (
    `id` VARCHAR(50) NOT NULL,
    `name` VARCHAR(100) NULL,
    `email` VARCHAR(100) NULL,
    `password` VARCHAR(255) NULL,
    `phone` VARCHAR(20) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_wishlists` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(50) NULL,
    `product_id` INTEGER NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user_id`(`user_id`),
    INDEX `product_id`(`product_id`),
    UNIQUE INDEX `tbl_wishlists_user_id_product_id_key`(`user_id`, `product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
