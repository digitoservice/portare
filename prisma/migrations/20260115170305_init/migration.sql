-- CreateTable
CREATE TABLE `logs` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `action` ENUM('create', 'update', 'delete') NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `data` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` VARCHAR(191) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `ip_address` VARCHAR(191) NULL,
    `user_agent` VARCHAR(191) NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sessions_token_key`(`token`),
    INDEX `sessions_user_id_idx`(`user_id`),
    INDEX `sessions_token_idx`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts` (
    `id` VARCHAR(191) NOT NULL,
    `account_id` VARCHAR(191) NOT NULL,
    `provider_id` VARCHAR(191) NOT NULL,
    `access_token` TEXT NULL,
    `refresh_token` TEXT NULL,
    `id_token` TEXT NULL,
    `access_token_expires_at` DATETIME(3) NULL,
    `refresh_token_expires_at` DATETIME(3) NULL,
    `scope` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `accounts_user_id_idx`(`user_id`),
    UNIQUE INDEX `accounts_provider_id_account_id_key`(`provider_id`, `account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verifications` (
    `id` VARCHAR(191) NOT NULL,
    `identifier` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `verifications_identifier_idx`(`identifier`),
    UNIQUE INDEX `verifications_identifier_value_key`(`identifier`, `value`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `email_verified` BOOLEAN NOT NULL DEFAULT false,
    `image` VARCHAR(191) NULL,
    `username` VARCHAR(191) NOT NULL,
    `display_username` VARCHAR(191) NOT NULL,
    `person_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_person_id_key`(`person_id`),
    INDEX `users_username_idx`(`username`),
    INDEX `users_email_idx`(`email`),
    INDEX `users_person_id_idx`(`person_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `groups_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `roles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` VARCHAR(191) NOT NULL,
    `group` ENUM('user', 'group', 'role', 'permission', 'trip', 'grouping', 'driver', 'aso', 'absentDriver', 'aggregate', 'client', 'unit', 'truck', 'semiTrailer', 'trailerConfiguration', 'trailerType', 'cargo', 'trailerCertificate', 'stoppedVehicle', 'brand', 'mdfe') NOT NULL,
    `code` ENUM('list', 'view', 'create', 'update', 'delete', 'import', 'navigate', 'updateStatus') NOT NULL,
    `guard` ENUM('action', 'page', 'component') NOT NULL,

    UNIQUE INDEX `permissions_group_code_guard_key`(`group`, `code`, `guard`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `people` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NULL,
    `document` VARCHAR(11) NULL,
    `phone_number` VARCHAR(11) NULL,
    `unit_id` INTEGER NULL,
    `aggregate_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `people_document_key`(`document`),
    INDEX `people_name_idx`(`name`),
    INDEX `people_nickname_idx`(`nickname`),
    INDEX `people_document_idx`(`document`),
    INDEX `people_unit_id_idx`(`unit_id`),
    INDEX `people_aggregate_id_idx`(`aggregate_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `drivers` (
    `person_id` INTEGER NOT NULL,
    `cnh` VARCHAR(11) NULL,
    `cnh_mirror` VARCHAR(10) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `drivers_cnh_key`(`cnh`),
    UNIQUE INDEX `drivers_cnh_mirror_key`(`cnh_mirror`),
    PRIMARY KEY (`person_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `started_at` DATETIME(3) NOT NULL,
    `expiration_type` ENUM('quarterly', 'yearly') NOT NULL,
    `driver_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`, `driver_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `absent_drivers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `note` TEXT NULL,
    `started_at` DATETIME(3) NOT NULL,
    `ended_at` DATETIME(3) NOT NULL,
    `status` ENUM('leaveOfAbsence', 'medicalCertificate', 'break', 'vacation') NOT NULL,
    `driver_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `absent_drivers_status_idx`(`status`),
    PRIMARY KEY (`id`, `driver_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `companies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `trade_name` VARCHAR(191) NULL,
    `document` VARCHAR(14) NULL,
    `type` ENUM('cnpj', 'cpf') NOT NULL DEFAULT 'cnpj',
    `address_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `companies_document_key`(`document`),
    INDEX `companies_name_idx`(`name`),
    INDEX `companies_trade_name_idx`(`trade_name`),
    INDEX `companies_document_idx`(`document`),
    INDEX `companies_type_idx`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clients` (
    `company_id` INTEGER NOT NULL,
    `type` ENUM('both', 'origin', 'destination') NOT NULL DEFAULT 'both',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `clients_type_idx`(`type`),
    PRIMARY KEY (`company_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `units` (
    `company_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`company_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aggregates` (
    `company_id` INTEGER NOT NULL,
    `unit_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `aggregates_company_id_idx`(`company_id`),
    INDEX `aggregates_unit_id_idx`(`unit_id`),
    PRIMARY KEY (`company_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `zip_code` VARCHAR(191) NULL,
    `state` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `locale` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `addresses_zip_code_idx`(`zip_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `brands` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `brands_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `licensePlate` VARCHAR(10) NOT NULL,
    `model` VARCHAR(191) NULL,
    `year` VARCHAR(191) NULL,
    `axle` INTEGER NULL,
    `chassis` VARCHAR(17) NULL,
    `renavam` VARCHAR(11) NULL,
    `brand_id` INTEGER NULL,
    `unit_id` INTEGER NULL,
    `aggregate_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `vehicles_licensePlate_key`(`licensePlate`),
    UNIQUE INDEX `vehicles_chassis_key`(`chassis`),
    UNIQUE INDEX `vehicles_renavam_key`(`renavam`),
    INDEX `vehicles_brand_id_idx`(`brand_id`),
    INDEX `vehicles_unit_id_idx`(`unit_id`),
    INDEX `vehicles_aggregate_id_idx`(`aggregate_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stopped_vehicles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `note` TEXT NULL,
    `started_at` DATETIME(3) NOT NULL,
    `ended_at` DATETIME(3) NOT NULL,
    `status` ENUM('maintenance', 'documentation') NOT NULL,
    `vehicle_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`, `vehicle_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trucks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `compressor` BOOLEAN NOT NULL DEFAULT false,
    `compressor_model` VARCHAR(191) NULL,
    `vehicle_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `trucks_vehicle_id_key`(`vehicle_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `semi_trailers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `configuration_id` INTEGER NOT NULL,
    `type_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `semi_trailers_configuration_id_idx`(`configuration_id`),
    INDEX `semi_trailers_type_id_idx`(`type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trailers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fleetNumber` VARCHAR(191) NULL,
    `vehicle_id` INTEGER NOT NULL,
    `semi_trailer_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `trailers_fleetNumber_key`(`fleetNumber`),
    UNIQUE INDEX `trailers_vehicle_id_key`(`vehicle_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trailer_configurations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `number_of_trailers` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `trailer_configurations_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trailer_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `trailer_types_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cargos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `cargos_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trailer_certificates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `started_at` DATETIME(3) NOT NULL,
    `expiration_type` ENUM('quarterly', 'yearly') NOT NULL,
    `trailer_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`, `trailer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groupings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `driver_id` INTEGER NULL,
    `truck_id` INTEGER NULL,
    `semi_trailer_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `groupings_driver_id_truck_id_semi_trailer_id_key`(`driver_id`, `truck_id`, `semi_trailer_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trips` (
    `id` VARCHAR(191) NOT NULL,
    `draft` BOOLEAN NOT NULL DEFAULT false,
    `order` VARCHAR(191) NULL,
    `note` TEXT NULL,
    `departed_at` DATETIME(3) NULL,
    `arrived_at` DATETIME(3) NULL,
    `status` ENUM('scheduled', 'loaded', 'departure', 'terminal', 'unloaded', 'finished', 'canceled') NOT NULL DEFAULT 'scheduled',
    `origin_id` INTEGER NULL,
    `destination_id` INTEGER NULL,
    `driver_id` INTEGER NULL,
    `truck_id` INTEGER NULL,
    `semi_trailer_id` INTEGER NULL,
    `cargo_id` INTEGER NULL,
    `unit_id` INTEGER NULL,
    `aggregate_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `trips_draft_idx`(`draft`),
    INDEX `trips_status_idx`(`status`),
    INDEX `trips_origin_id_idx`(`origin_id`),
    INDEX `trips_destination_id_idx`(`destination_id`),
    INDEX `trips_driver_id_idx`(`driver_id`),
    INDEX `trips_truck_id_idx`(`truck_id`),
    INDEX `trips_semi_trailer_id_idx`(`semi_trailer_id`),
    INDEX `trips_cargo_id_idx`(`cargo_id`),
    INDEX `trips_unit_id_idx`(`unit_id`),
    INDEX `trips_aggregate_id_idx`(`aggregate_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tickets` (
    `id` VARCHAR(191) NOT NULL,
    `note` TEXT NOT NULL,
    `action` ENUM('maintenanceRequest') NOT NULL,
    `reaction` ENUM('pending', 'accepted', 'denied') NOT NULL DEFAULT 'pending',
    `requester_id` INTEGER NOT NULL,
    `acceptor_id` INTEGER NULL,
    `vehicle_id` INTEGER NULL,
    `trip_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `tickets_requester_id_idx`(`requester_id`),
    INDEX `tickets_acceptor_id_idx`(`acceptor_id`),
    INDEX `tickets_vehicle_id_idx`(`vehicle_id`),
    INDEX `tickets_trip_id_idx`(`trip_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `read_at` DATETIME(3) NULL,
    `type` ENUM('server', 'ticket', 'ticketAnswered') NOT NULL,
    `ticket_id` VARCHAR(191) NULL,
    `recipient_id` INTEGER NOT NULL,
    `sender_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `notifications_ticket_id_idx`(`ticket_id`),
    INDEX `notifications_recipient_id_idx`(`recipient_id`),
    INDEX `notifications_sender_id_idx`(`sender_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mdfe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `manifest` VARCHAR(191) NOT NULL,
    `branch` VARCHAR(191) NOT NULL,
    `license_plate` VARCHAR(191) NOT NULL,
    `destinatary` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `invoice` VARCHAR(191) NOT NULL,
    `invoiceIssue` VARCHAR(191) NOT NULL,
    `cte` VARCHAR(191) NOT NULL,
    `cteIssue` VARCHAR(191) NOT NULL,
    `closed_at` DATETIME(3) NULL,
    `note` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `mdfe_manifest_key`(`manifest`),
    INDEX `mdfe_manifest_idx`(`manifest`),
    INDEX `mdfe_branch_idx`(`branch`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GroupRole` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GroupRole_AB_unique`(`A`, `B`),
    INDEX `_GroupRole_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserGroup` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_UserGroup_AB_unique`(`A`, `B`),
    INDEX `_UserGroup_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RolePermission` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RolePermission_AB_unique`(`A`, `B`),
    INDEX `_RolePermission_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SemiTrailerCargo` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SemiTrailerCargo_AB_unique`(`A`, `B`),
    INDEX `_SemiTrailerCargo_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_person_id_fkey` FOREIGN KEY (`person_id`) REFERENCES `people`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `people` ADD CONSTRAINT `people_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `units`(`company_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `people` ADD CONSTRAINT `people_aggregate_id_fkey` FOREIGN KEY (`aggregate_id`) REFERENCES `aggregates`(`company_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `drivers` ADD CONSTRAINT `drivers_person_id_fkey` FOREIGN KEY (`person_id`) REFERENCES `people`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aso` ADD CONSTRAINT `aso_driver_id_fkey` FOREIGN KEY (`driver_id`) REFERENCES `drivers`(`person_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `absent_drivers` ADD CONSTRAINT `absent_drivers_driver_id_fkey` FOREIGN KEY (`driver_id`) REFERENCES `drivers`(`person_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `companies` ADD CONSTRAINT `companies_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `addresses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clients` ADD CONSTRAINT `clients_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `units` ADD CONSTRAINT `units_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aggregates` ADD CONSTRAINT `aggregates_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aggregates` ADD CONSTRAINT `aggregates_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `units`(`company_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_brand_id_fkey` FOREIGN KEY (`brand_id`) REFERENCES `brands`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `units`(`company_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_aggregate_id_fkey` FOREIGN KEY (`aggregate_id`) REFERENCES `aggregates`(`company_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stopped_vehicles` ADD CONSTRAINT `stopped_vehicles_vehicle_id_fkey` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trucks` ADD CONSTRAINT `trucks_vehicle_id_fkey` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `semi_trailers` ADD CONSTRAINT `semi_trailers_configuration_id_fkey` FOREIGN KEY (`configuration_id`) REFERENCES `trailer_configurations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `semi_trailers` ADD CONSTRAINT `semi_trailers_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `trailer_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trailers` ADD CONSTRAINT `trailers_vehicle_id_fkey` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trailers` ADD CONSTRAINT `semi_trailer` FOREIGN KEY (`semi_trailer_id`) REFERENCES `semi_trailers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trailer_certificates` ADD CONSTRAINT `trailer_certificates_trailer_id_fkey` FOREIGN KEY (`trailer_id`) REFERENCES `trailers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groupings` ADD CONSTRAINT `groupings_driver_id_fkey` FOREIGN KEY (`driver_id`) REFERENCES `drivers`(`person_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groupings` ADD CONSTRAINT `groupings_truck_id_fkey` FOREIGN KEY (`truck_id`) REFERENCES `trucks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groupings` ADD CONSTRAINT `groupings_semi_trailer_id_fkey` FOREIGN KEY (`semi_trailer_id`) REFERENCES `semi_trailers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trips` ADD CONSTRAINT `origin_company` FOREIGN KEY (`origin_id`) REFERENCES `clients`(`company_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trips` ADD CONSTRAINT `destination_company` FOREIGN KEY (`destination_id`) REFERENCES `clients`(`company_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trips` ADD CONSTRAINT `trips_driver_id_fkey` FOREIGN KEY (`driver_id`) REFERENCES `drivers`(`person_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trips` ADD CONSTRAINT `trips_truck_id_fkey` FOREIGN KEY (`truck_id`) REFERENCES `trucks`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trips` ADD CONSTRAINT `trips_semi_trailer_id_fkey` FOREIGN KEY (`semi_trailer_id`) REFERENCES `semi_trailers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trips` ADD CONSTRAINT `trips_cargo_id_fkey` FOREIGN KEY (`cargo_id`) REFERENCES `cargos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trips` ADD CONSTRAINT `trips_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `units`(`company_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trips` ADD CONSTRAINT `trips_aggregate_id_fkey` FOREIGN KEY (`aggregate_id`) REFERENCES `aggregates`(`company_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `ticket_requester` FOREIGN KEY (`requester_id`) REFERENCES `people`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `ticket_acceptor` FOREIGN KEY (`acceptor_id`) REFERENCES `people`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_vehicle_id_fkey` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_trip_id_fkey` FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_ticket_id_fkey` FOREIGN KEY (`ticket_id`) REFERENCES `tickets`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notification_recipient` FOREIGN KEY (`recipient_id`) REFERENCES `people`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notification_sender` FOREIGN KEY (`sender_id`) REFERENCES `people`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GroupRole` ADD CONSTRAINT `_GroupRole_A_fkey` FOREIGN KEY (`A`) REFERENCES `groups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GroupRole` ADD CONSTRAINT `_GroupRole_B_fkey` FOREIGN KEY (`B`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserGroup` ADD CONSTRAINT `_UserGroup_A_fkey` FOREIGN KEY (`A`) REFERENCES `groups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserGroup` ADD CONSTRAINT `_UserGroup_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RolePermission` ADD CONSTRAINT `_RolePermission_A_fkey` FOREIGN KEY (`A`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RolePermission` ADD CONSTRAINT `_RolePermission_B_fkey` FOREIGN KEY (`B`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SemiTrailerCargo` ADD CONSTRAINT `_SemiTrailerCargo_A_fkey` FOREIGN KEY (`A`) REFERENCES `cargos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SemiTrailerCargo` ADD CONSTRAINT `_SemiTrailerCargo_B_fkey` FOREIGN KEY (`B`) REFERENCES `semi_trailers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
