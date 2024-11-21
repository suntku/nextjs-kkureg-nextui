-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `citizen_id` VARCHAR(191) NOT NULL,
    `prefix` VARCHAR(45) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `familyname` VARCHAR(191) NOT NULL,
    `middlename` VARCHAR(191) NULL,
    `prefix_en` VARCHAR(45) NOT NULL,
    `name_en` VARCHAR(191) NOT NULL,
    `familyname_en` VARCHAR(191) NOT NULL,
    `middlename_en` VARCHAR(191) NULL,
    `account_status` ENUM('A', 'I', 'W', 'C') NOT NULL DEFAULT 'I',
    `faculty_id` VARCHAR(191) NULL,
    `faculty_name` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `created_user_id` INTEGER NOT NULL,
    `updated_user_id` INTEGER NOT NULL,
    `phone_number` VARCHAR(45) NULL,
    `sso_id` VARCHAR(45) NULL,
    `sso_hash_id` LONGTEXT NULL,
    `sso_account_type` VARCHAR(45) NULL,
    `user_key` VARCHAR(200) NOT NULL,
    `current_role` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log_login` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `action_type` VARCHAR(50) NOT NULL,
    `status` ENUM('A', 'I', 'W', 'C') NOT NULL DEFAULT 'A',
    `ip` VARCHAR(50) NULL,
    `ua` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `message` VARCHAR(255) NULL,

    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
