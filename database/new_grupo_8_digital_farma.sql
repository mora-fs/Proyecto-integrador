-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-10-2021 a las 15:13:17
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `new_grupo_8_digital_farma`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Cuidado Bucal'),
(2, 'Cuidado Corporal'),
(3, 'Cuidado Facial'),
(4, 'Verano'),
(5, 'Capilar'),
(6, 'Higiene');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `price` smallint(6) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `discount` tinyint(4) DEFAULT NULL,
  `capacity` tinyint(4) DEFAULT NULL,
  `image` varchar(60) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `brand` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `discount`, `capacity`, `image`, `category_id`, `brand`) VALUES
(20, 'Johnson´s Aceite de Bebé', 300, 'Aceite para bebés puro. 100ml. Humecta y suaviza.', 25, 30, 'product-1633987924117.jpg', 6, 'Johnson & Johnson'),
(21, 'Acondicionador Dove Nutritive Secrets', 400, 'Acondicionador Dove Nutritive Secrets. Linea RITUAL DETOX.  Hecho con matcha y leche de arroz.', 12, 20, 'product-1633988076422.jpg', 5, 'Dove'),
(22, 'Shampoo Control Caspa - Head & Shoulders', 350, 'Shampoo para control de caspa y grasa. Elimina el exceso de grasa en el cuero cabelludo. 375ml', 5, 50, 'product-1633988274049.jpg', 5, 'Head & Shoulders'),
(23, 'Afeitadora Gillete PrestoBarba', 850, 'Afeitadora Gillete Prestobarba Sensitive 3. Hasta 40 afeitadas suaves. 4 unidades. La mejor afeitadora del mercado', 20, 20, 'afeitadora.jpg', 1, 'Gillete'),
(24, 'Alcohol en aerosol - AKTIOL', 300, 'Alcohol en aerosol con glicerina. Alcohol 70%. 143ml.', 25, 30, 'product-1634139758438.jpg', 6, 'Aktiol'),
(25, 'Alcohol en Gel', 250, 'Alcohol en gel Anti-Bacteriano Gezzi. 50g. Elimina el 99,9% de las bacterias y virus.', 25, 127, 'product-1634140230399.jpg', 6, 'Gezzi'),
(27, 'Barbijo', 150, 'Barbijos Atom-Protect. Hecho con nanotecnologia que previene el paso de todos los virus y bacterias', 10, 127, 'product-1634246733533.jpg', 6, NULL),
(28, 'Barbijo Descartable', 100, 'Barbijo descartable. En pedidos de hasta 500 unidades. 20 unidades por caja.', 5, 127, 'product-1634246811961.jpg', 6, NULL),
(29, 'Blanqueador Oral-B', 500, 'Blanqueador de dientes Oral-B 3D White Luxe. Para dientes mas blancos y brillantes', 10, 30, 'product-1634246888802.jpg', 1, NULL),
(30, 'Cepillo para Bebé', 450, 'Cepillo para bebés marca Chicco. Trae cepillo y peine.', 10, 30, 'product-1634246980532.jpg', 2, NULL),
(31, 'Cepillo Dental', 200, 'Cepillo de dientes Colgate Twister 2 en 1. Para dientes más sanos', 10, 40, 'product-1634247046842.jpg', 1, NULL),
(32, 'Cepillo de Pelo', 300, 'Cepillo para el pelo, cuadrado. Linea Studio - 9', 25, 30, 'product-1634247106729.jpg', 5, NULL),
(33, 'Dentifrico Colgate Luminous White', 300, 'Dentifrico Colgate Luminous White con Carbon Activado. Para una sonrisa deslumbrante!', 15, 40, 'product-1634247185880.jpg', 1, NULL),
(34, 'Desodorante Dove', 100, 'Desodorante Dove Invisible Dry. No deja manchas. 48hs de acción ', 10, 50, 'product-1634247250929.jpg', 2, NULL),
(36, 'Hidratante Corporal', 350, 'Hidratante corporal La Roche-Posay. Para pieles sanas e hidratadas. 400ml', 30, 20, 'product-1634248338596.jpg', 2, NULL),
(37, 'Jabon Liquido Dove', 275, 'Jabon Liquido Dove antibacterial. Enjuaga, limpia y protege', 22, 50, 'product-1634248537060.jpg', 6, NULL),
(38, 'Pañales Premium Pampers', 550, 'Pañales Premium Care Pants linea Pampers. 34 unidades. Con cintura elastica', 25, 127, 'product-1634248603124.jpg', 6, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(15) DEFAULT NULL,
  `lastName` varchar(30) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `employee` tinyint(4) DEFAULT NULL,
  `profileImage` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `lastName`, `password`, `email`, `employee`, `profileImage`) VALUES
(31, 'Bautista', 'Llobeta', '$2a$10$8g3PVZd6eFwV5GGuxtooVeYS6Y7U8zZxuaTeglhldvn0muJmj2Ue2', 'bautillobeta@gmail.com', 1, 'user-1633992932966.jpg'),
(32, 'Usuario', 'Random', '$2a$10$Rn6UZBLyjo4pg8I49sqZgure7pHOl8jCiozOZv1V6vWiziMR.Unva', 'user@gmail.com', 0, 'user-1634249101738.png'),
(33, 'usuario', 'cualquiera', '$2a$10$.d24DgKRoP2fxiNtmhnMdOkNCA5ezRwPPU5vE38xrNGlC1Hj4DPkO', 'email@gmail.com', 0, 'user-1634256702355.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_category` (`category_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
