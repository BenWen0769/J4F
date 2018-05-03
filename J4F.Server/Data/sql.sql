Use J4F

GO

if exists ( select * 
 from  sysobjects
 where name = 'product'
 and type = 'U')
 drop table product

Create table product(
	id int primary key identity(1,1),
	name nvarchar(20),
	category nvarchar(20),
	[status] int,
	pictureid int,
	isdel bit,
	addDate date,
	addIP nvarchar(15)
)