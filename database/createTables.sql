drop database test;
create database test;
use test;
create table containers (
	containerid int not null auto_increment,
    name nvarchar(255) not null,
    quantity int,
    valid bool default 1,
    primary key(containerid)
);

create table customers (
	customerid int not null auto_increment,
	name nvarchar(255) not null,
    email nvarchar(255),
    phonenumber varchar(15),
    valid bool default 1,
    primary key(customerid)
);

create table products (
	productid int not null auto_increment,
    name nvarchar(255) not null,
    valid bool default 1,
    primary key(productid)
);

create table resources (
	resourceid int not null auto_increment,
    name nvarchar(255) not null,
    valid bool default 1,
    primary key (resourceid)
);

create table productingredients (
	productingredientid int not null auto_increment,
	productid int not null,
    resourceid int not null,
    quantity double not null,
    valid bool default 1,
    primary key (productingredientid),
    foreign key (productid) references products(productid),
    foreign key (resourceid) references resources(resourceid)
);

create table customercontainers (
	customercontainerid int not null auto_increment,
	containerid int not null,
    customerid int not null,
    valid bool default 1,
    primary key(customercontainerid),
    foreign key (containerid) references containers(containerid),
    foreign key (customerid) references customers(customerid)
);

create table ordertypes (
    ordertypeid int not null auto_increment,
    name nvarchar(255) not null,
    valid bool default 1,
    primary key(ordertypeid)
);

create table orders(
	orderid int not null auto_increment,
    placeddate date not null,
    tobepaiddate date,
    tobedelivereddate date,
    cost double,
    ordertypeid int,
    customerid int not null,
    valid bool default 1,
    foreign key (customerid) references customers(customerid),
    foreign key (ordertypeid) references ordertypes(ordertypeid),
    primary key(orderid)
);

create table orderdetails (
	orderdetailid int not null auto_increment,
    quantity int not null,
    containerid int not null,
    productid int not null,
    orderid int not null,
    valid bool default 1,
    primary key (orderdetailid),
    foreign key (containerid) references containers(containerid),
    foreign key (productid) references products(productid),
    foreign key (orderid) references orders(orderid)
)