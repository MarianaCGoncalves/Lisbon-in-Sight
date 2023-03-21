-- Create the database with the name: lisDB
-- Then run the create table bellow

create table appuser (
    usr_id serial,
    usr_name varchar(60) not null,
    usr_pass varchar(200) not null, 
    --adicionar email.
    usr_token varchar(200),
    primary key (usr_id));

create table route(
    rou_id serial,
    rou_use_id int not null,
    rot_name varchar(60),
    primary key (rou_id)
);

create table rating(
    rat_id serial,
    rat_use_id int not null,
    rat_rou_id int not null,
    rat_comm varchar(200),
    rat_score int,
    primary key (rat_id)
);

create table local(
    loc_id serial,
    loc_name varchar(60),
    /*loc_coordinates */
);

create table routelocal(
    rl_id serial,
    rl_rou_id int not null,
    rl_loc_id int not null,
    primary key (rl_id)
);

create table media(
    med_id serial,
    med_url varchar(120),
    primary key (med_id)
);

create table localmedia(
    lm_id serial,
    lm_med_id int not null,
    lm_loc_id int not null,
    primary key (lm_id)
);

create table status(
    st_id serial,
    st_name varchar(60),
    primary key (st_id)
);

create table routestatus(
    rs_id serial,
    rs_rou_id int not null,
    rs_st_id int not null,

);

alter table rating
add constraint rating_fk_appuser
foreign key (rat_use_id) references appuser(usr_id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table rating
add constraint rating_fk_route
foreign key (rat_rou_id) references route(rou_id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table route
add constraint route_fk_appuser
foreign key (rou_use_id) references appuser(usr_id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table routelocal
add constraint routelocal_fk_route
foreign key (rl_rou_id) references route(rou_id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table routelocal
add constraint routelocal_fk_local
foreign key (rl_loc_id) references local(loc_id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table localmedia
add constraint localmedia_fk_local
foreign key (lm_loc_id) references local(loc_id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table localmedia
add constraint localmedia_fk_media
foreign key (lm_med_id) references media(med_id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table routestatus
add constraint routestatus_fk_route
foreign key (rs_rou_id) references route(rou_id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table routestatus
add constraint routestatus_fk_status
foreign key (rs_st_id) references status(st_id)
ON DELETE NO ACTION ON UPDATE NO ACTION;
