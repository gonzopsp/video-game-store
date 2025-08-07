CREATE TABLE videogame(
    id SERIAL PRIMARY KEY,
    genre INT ,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(2020),
    image varchar(255),
    price INT,
    stock INT

);

CREATE TABLE genre(
    id SERIAL PRIMARY KEY,
    name varchar(25) NOT NULL
);


CREATE TABLE sale(
    id SERIAL PRIMARY KEY,
    buyer INT NOT NULL,
    videogame INT NOT NULL,
    totalprice INT
);


CREATE TABLE users(
    email varchar(55) PRIMARY KEY,
    name varchar(55),
    password varchar(64),
    role INT
);

CREATE TABLE role(
    id INT PRIMARY KEY,
    name varchar(8) NOT NULL
);



INSERT INTO genre(id,name) VALUES(0,'Acción');
INSERT INTO genre(id,name) VALUES(1,'Plataformas');
INSERT INTO genre(id,name) VALUES(2,'FPS');
INSERT INTO genre(id,name) VALUES(3,'Estratégia');

SELECT * FROM genre


INSERT INTO role(id,name) VALUES(0,'Cliente');
INSERT INTO role(id,name) VALUES(1,'Vendedor');
INSERT INTO role(id,name) VALUES(4,'Admin');

SELECT * FROM role;

INSERT INTO users(email,name,password,role) VALUES('admin','admin','admin',4);





INSERT INTO videogame(genre,name,price,stock) VALUES(1,'Overcooked 2',10000,20);
INSERT INTO videogame(genre,name,description,image,price,stock) VALUES(0,'The Last of Us™ Part I','Descubre el galardonado juego que inspiró la aclamada serie de televisión. Guía a Joel y Ellie en su travesía por una América posapocalíptica y encuentra aliados y enemigos inolvidables en The Last of Us™. ','data/img/the-last-of-us-part-1.jpg',50000,5);



