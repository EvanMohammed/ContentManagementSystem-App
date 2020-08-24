
drop database if exists CMS_DB;
create database CMS_DB;
use CMS_DB;
create table departments (
 id INT NOT NULL AUTO_INCREMENT,
 departmentName varchar (20) ,
 primary key (id)
 );
 
 insert into departments (departmentName)
 values ( "engineering");
 
 
 create table Employees (
 id INT NOT NULL AUTO_INCREMENT,
 firstName varchar (20) ,
 lastName varchar (20) ,
 role_id int ,
 manager_id int,
 primary key (id)
 );
 
  insert into Employees (firstName,lastName,manager_id)
 values ("John" , "Wood",1);
  create table employeeRole (
  id int not null auto_increment,
  title varchar (30),
  salary decimal,
  departmentId int ,
  primary key(id));
  
    insert into employeeRole (title, salary)
 values ("engineer" , 3200.32);


-- joinning the id of the department from the employeeRole and department Tables
 use CMS_DB;



select departments.id from employeeRole
inner join departments on employeeRole.departmentID = departments.ID