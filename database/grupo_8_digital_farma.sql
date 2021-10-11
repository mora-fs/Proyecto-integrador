CREATE DATABASE grupo_8_digital_farma;
CREATE TABLE Products (
	id_product INT UNIQUE AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(20), 
    price SMALLINT, 
    description TEXT, 
    discount TINYINT, 
    capacity TINYINT, 
    image VARCHAR(20)
);
CREATE TABLE Brands (
	id_brand INT UNIQUE AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(20)
);
CREATE TABLE Products_Brands (
	id INT UNIQUE AUTO_INCREMENT PRIMARY KEY, 
    id_product INT, 
    id_brand INT, 
    CONSTRAINT FOREIGN KEY (id_product) REFERENCES Products(id_product),
	CONSTRAINT FOREIGN KEY (id_brand) REFERENCES Brands(id_brand)
);
CREATE TABLE Categories (
	id_category INT UNIQUE AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(20)
);
CREATE TABLE Products_Categories (
	id INT UNIQUE AUTO_INCREMENT PRIMARY KEY,
    id_product INT, 
    id_category INT, 
    FOREIGN KEY (id_product) REFERENCES Products(id_product), 
    FOREIGN KEY (id_category) REFERENCES Categories(id_category)
);
CREATE TABLE Users (
    id INT UNIQUE AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(15),
    lastName VARCHAR(30),
    password VARCHAR(50),
    email VARCHAR(40),
    employee TINYINT,
    profileImage VARCHAR(50)
);