-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-06-2021 a las 21:27:44
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `usuariot4g_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_usuario`
--

CREATE TABLE `tbl_usuario` (
  `id_usuario` int(4) NOT NULL,
  `nombre_usuario` varchar(30) NOT NULL,
  `cedula_usuario` int(10) NOT NULL,
  `telefono_usuario` int(10) NOT NULL,
  `mail_usuario` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_usuario`
--

INSERT INTO `tbl_usuario` (`id_usuario`, `nombre_usuario`, `cedula_usuario`, `telefono_usuario`, `mail_usuario`) VALUES
(1, 'santiago', 1724441085, 3650645, 'santiago@gmail.com'),
(2, 'lenin', 1724440890, 3650645, 'lenin@gmail.com'),
(3, 'leandro', 1724489974, 3650645, 'leandro@gmail.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  MODIFY `id_usuario` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
