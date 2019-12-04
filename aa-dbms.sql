-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 04, 2019 at 01:56 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aa-dbms`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `adminSumProc` ()  SELECT A.Date,A.maxName,A.maxTrans,B.minName, B.minTrans from
(SELECT t1.Date, Name as maxName, maxTrans from adminSummary t1 inner JOIN ( select Date,max(maxTrans) Max from adminSummary GROUP BY Date) t2 on t1.Date=t2.date and t1.maxTrans=t2.Max) as A
JOIN
(SELECT t3.Date, Name as minName, minTrans from adminSummary t3 inner JOIN ( select Date,min(minTrans) Min from adminSummary GROUP BY Date) t4 on t3.Date=t4.date and t3.minTrans=t4.Min) as B
ON A.Date=B.Date
ORDER BY `A`.`Date` DESC$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `admin`
-- (See below for the actual view)
--
CREATE TABLE `admin` (
`type` varchar(6)
,`name` varchar(20)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `adminSummary`
-- (See below for the actual view)
--
CREATE TABLE `adminSummary` (
`SID` int(11)
,`Name` varchar(20)
,`Date` varchar(10)
,`no_of_orders` bigint(21)
,`maxTrans` int(11)
,`minTrans` int(11)
);

-- --------------------------------------------------------

--
-- Table structure for table `buyer`
--

CREATE TABLE `buyer` (
  `Bid` int(11) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `Location` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `buyer`
--

INSERT INTO `buyer` (`Bid`, `Name`, `Location`) VALUES
(12, 'Joe', 'Kolkata, Bengal'),
(13, 'Rocky Bhai', 'Wakanda, Rio'),
(1234, 'Allen', 'Bangalore, Karnataka');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `Cid` int(11) NOT NULL,
  `Category` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`Cid`, `Category`) VALUES
(200, 'Mobiles'),
(201, 'TV'),
(202, 'Gaming Consoles'),
(203, 'Laptops'),
(204, 'Headphones');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `Lid` int(11) NOT NULL,
  `Password` varchar(70) NOT NULL,
  `Type` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`Lid`, `Password`, `Type`) VALUES
(12, '$2b$05$2/BwbCO0C0FJhNBf2UGjm.1CgsMGvYUzLizSZi.PCyJagUkZWdi8e', 'buyer'),
(13, '$2b$05$aLXnzjC2jJKFt/yyXLHoOuWNeFIoqCyq1WgYofRRRPaGi/jXahZFC', 'buyer'),
(22, '$2b$05$xj.BHAdkdiaOSFbJn3KZleFoNKfefI0BZSBwsxTHrUjnq17pDNFNu', 'seller'),
(23, '$2b$05$OhWC95VPyTO0e5usMgzw0.OC7gfWanmPo.vNbYaJwrUio.utdaSve', 'seller'),
(123, '$2b$05$iP/GKVwPRef82yPWnhV57eHF211LuS6xsgGakXi.jPjubfo.6FUUi', 'admin'),
(1234, '$2b$05$Pj/2mE1D.aU7C/3UTJ6bZObU10O0CRasXIJ6b8QGHvgE38mYWhF/6', 'buyer'),
(12345, '$2b$05$Loq4CgHtsv2nEmgKFuEosubGxhtn/oaxczZxPb9rk67/UnJLAUGEe', 'seller');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `Oid` int(20) NOT NULL,
  `Bid` int(11) NOT NULL,
  `Sid` int(11) NOT NULL,
  `Pid` int(11) NOT NULL,
  `Date` timestamp NOT NULL DEFAULT current_timestamp(),
  `Price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`Oid`, `Bid`, `Sid`, `Pid`, `Date`, `Price`) VALUES
(12, 1234, 22, 18, '2019-11-21 14:13:44', 11999),
(13, 12, 22, 17, '2019-11-21 14:15:46', 69999),
(14, 12, 22, 18, '2019-11-21 14:31:22', 11999),
(15, 1234, 22, 13, '2019-11-21 14:55:27', 53999),
(16, 1234, 12345, 21, '2019-11-21 14:55:32', 99999),
(17, 1234, 22, 18, '2019-11-28 16:45:19', 11999),
(18, 1234, 22, 18, '2019-11-28 16:46:24', 11999),
(19, 1234, 12345, 21, '2019-11-28 16:46:28', 100),
(20, 1234, 22, 19, '2019-11-28 16:46:45', 42000),
(22, 1234, 12345, 24, '2019-11-28 16:59:04', 2000),
(23, 1234, 12345, 27, '2019-11-29 01:40:18', 65000),
(25, 13, 23, 31, '2019-11-29 01:44:09', 30000),
(26, 1234, 12345, 29, '2019-11-29 04:21:41', 10000),
(27, 1234, 22, 16, '2019-11-29 04:22:59', 19999),
(28, 1234, 22, 18, '2019-12-01 09:51:59', 11999),
(29, 1234, 12345, 21, '2019-12-01 09:52:04', 105),
(30, 1234, 12345, 21, '2019-12-04 05:45:05', 105);

--
-- Triggers `orders`
--
DELIMITER $$
CREATE TRIGGER `reduceQuant` AFTER INSERT ON `orders` FOR EACH ROW UPDATE products set Quantity=( SELECT quantity-1 from products where pid=new.pid) where pid=new.pid
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `Pid` int(11) NOT NULL,
  `Sid` int(11) NOT NULL,
  `Cid` int(11) NOT NULL,
  `Pname` varchar(50) NOT NULL,
  `Descripton` varchar(300) NOT NULL,
  `Price` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`Pid`, `Sid`, `Cid`, `Pname`, `Descripton`, `Price`, `Quantity`) VALUES
(13, 22, 200, 'Oneplus 7T', 'Nebula blue, 12GB RAM', 53999, 9),
(14, 22, 203, 'Predator helios 300', 'GTX 1660 graphics card, 144Hz display', 78999, 3),
(15, 22, 204, 'Audiotechnica', 'High end audio equipment.', 1500, 7),
(16, 22, 202, 'PS4', '1TB storage, Sony\'s gaming station', 19999, 1),
(17, 22, 201, 'Sony Bravia', 'Ultra HD curved screen.', 69999, 1),
(18, 22, 200, 'Realme 3', 'Snapdragon 660, 6GB ram', 11999, 15),
(19, 22, 201, 'Samsung QLED ', '55 inch, Ultra HD', 42000, 2),
(20, 22, 203, 'HP Pavilion 15', 'GTX 1650, 8GB ram', 79999, 7),
(21, 12345, 200, 'iPhone XS ', 'Last year\'s iPhone', 105, 27),
(24, 12345, 201, 'LG TV', 'Android TV', 2000, 11),
(25, 12345, 203, 'Alienware', 'Best laptop to ever existed', 150000, 2),
(27, 12345, 202, 'Google Stadia', 'Google way to go for gaming', 65000, 3),
(28, 12345, 204, 'Skull Candy', 'Bass heavy', 12000, 20),
(29, 12345, 200, 'Redmi Note10', 'Xiaomi\'s new phone', 10000, 24),
(30, 12345, 200, 'Oppo', 'Oppo\'s phone', 20000, 23),
(31, 23, 202, 'XBox One S', 'Free Game bundle', 30000, 9);

-- --------------------------------------------------------

--
-- Table structure for table `seller`
--

CREATE TABLE `seller` (
  `Sid` int(11) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `Contact` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `seller`
--

INSERT INTO `seller` (`Sid`, `Name`, `Contact`) VALUES
(22, 'Robert', 98547612),
(23, 'Tyrion', 112233),
(12345, 'Abbas', 865426314);

-- --------------------------------------------------------

--
-- Structure for view `admin`
--
DROP TABLE IF EXISTS `admin`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `admin`  AS  select 'buyer' AS `type`,`buyer`.`Name` AS `name` from `buyer` union select 'seller' AS `seller`,`seller`.`Name` AS `name` from `seller` ;

-- --------------------------------------------------------

--
-- Structure for view `adminSummary`
--
DROP TABLE IF EXISTS `adminSummary`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `adminSummary`  AS  select `o`.`Sid` AS `SID`,`s`.`Name` AS `Name`,date_format(`o`.`Date`,'%m-%d-%Y') AS `Date`,count(0) AS `no_of_orders`,max(`o`.`Price`) AS `maxTrans`,min(`o`.`Price`) AS `minTrans` from (`orders` `o` join `seller` `s`) where `s`.`Sid` = `o`.`Sid` group by `o`.`Sid`,date_format(`o`.`Date`,'%m-%d-%Y') order by 3 desc ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buyer`
--
ALTER TABLE `buyer`
  ADD PRIMARY KEY (`Bid`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`Cid`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`Lid`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`Oid`),
  ADD KEY `Bid` (`Bid`),
  ADD KEY `Sid` (`Sid`),
  ADD KEY `Pid` (`Pid`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`Pid`,`Sid`) USING BTREE,
  ADD KEY `Sid` (`Sid`),
  ADD KEY `Cid` (`Cid`);

--
-- Indexes for table `seller`
--
ALTER TABLE `seller`
  ADD PRIMARY KEY (`Sid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `Cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=205;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `Oid` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `Pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `buyer`
--
ALTER TABLE `buyer`
  ADD CONSTRAINT `buyer_ibfk_1` FOREIGN KEY (`Bid`) REFERENCES `login` (`Lid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`Bid`) REFERENCES `buyer` (`Bid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`Sid`) REFERENCES `seller` (`Sid`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`Pid`) REFERENCES `products` (`Pid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`Sid`) REFERENCES `seller` (`Sid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`Cid`) REFERENCES `categories` (`Cid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `seller`
--
ALTER TABLE `seller`
  ADD CONSTRAINT `seller_ibfk_1` FOREIGN KEY (`Sid`) REFERENCES `login` (`Lid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
