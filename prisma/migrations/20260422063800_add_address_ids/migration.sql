/*
  Warnings:

  - You are about to drop the column `city` on the `tbl_orders` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `tbl_user_addresses` table. All the data in the column will be lost.

*/
-- AlterTable for tbl_user_addresses
ALTER TABLE `tbl_user_addresses` DROP COLUMN `city`,
    ADD COLUMN `city_id` VARCHAR(50) NULL,
    ADD COLUMN `city_name` VARCHAR(100) NULL,
    ADD COLUMN `district_id` VARCHAR(50) NULL,
    ADD COLUMN `district_name` VARCHAR(100) NULL,
    ADD COLUMN `province_id` VARCHAR(50) NULL,
    ADD COLUMN `province_name` VARCHAR(100) NULL;

-- AlterTable for tbl_orders
ALTER TABLE `tbl_orders` DROP COLUMN `city`,
    ADD COLUMN `city_id` VARCHAR(50) NULL,
    ADD COLUMN `city_name` VARCHAR(100) NULL,
    ADD COLUMN `district_id` VARCHAR(50) NULL,
    ADD COLUMN `district_name` VARCHAR(100) NULL,
    ADD COLUMN `province_id` VARCHAR(50) NULL,
    ADD COLUMN `province_name` VARCHAR(100) NULL;
