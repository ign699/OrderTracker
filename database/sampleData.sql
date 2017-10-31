/*Create sample products*/

insert into products(name) values('Pierogi ruskie');
insert into products(name) values('Pierogi ser słodki');
insert into products(name) values('Pierogi truskawka');
insert into products(name) values('Pierogi kapusta grzyb');
insert into products(name) values('Uszka mięso');
insert into products(name) values('Uszka grzyb');

/*Create sample clients*/

insert into customers(name) values('Mądel');
insert into customers(name) values('Grosik');
insert into customers(name) values('Bazar');
insert into customers(name) values('Partynia');


/*Create sample containers*/

insert into containers(name) values('tacka');
insert into containers(name) values('kilogram');

/*Associate sample containers with clients*/

insert into customercontainers(containerid, customerid) values(1 , 1);
insert into customercontainers(containerid, customerid)  values(2 , 2);

/*create order types*/

insert into ordertypes(name) values('faktura');

/*Create two orders*/

insert into orders(placeddate, tobepaiddate, tobedelivereddate, cost, ordertypeid, customerid) values(curdate(), curdate(), curdate(), 1894.45, 1, 1);
insert into orders(placeddate, tobepaiddate, tobedelivereddate, cost, ordertypeid, customerid) values(curdate(), curdate(), curdate(), 666.666, 1, 2);

/*Insert details into orders*/

insert into orderdetails(quantity, containerid, productid, orderid) values(1,1,1,1);
insert into orderdetails(quantity, containerid, productid, orderid) values(4,3,3,1);
insert into orderdetails(quantity, containerid, productid, orderid) values(1,1,1,2);
insert into orderdetails(quantity, containerid, productid, orderid) values(4,2,3,2);
