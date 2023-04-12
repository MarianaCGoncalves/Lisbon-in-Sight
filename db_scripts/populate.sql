-- None at the moment,users must be created using the API because of the bcrypt



insert into status (st_name) values('Pessoal');
insert into status (st_name) values('Aprovado');
insert into status (st_name) values('A espera');
insert into status (st_name) values('Rejeitado');


insert into local(loc_name, loc_desc, loc_x, loc_y) values ('Tapada das Necessidades', 'Parque ', 38.708919, -9.169747 );
insert into local(loc_name, loc_desc, loc_x, loc_y) values ('Jardim da Estrela ', 'Jardim ', 38.714742, -9.159373);
insert into local(loc_name, loc_desc, loc_x, loc_y) values ('Jardim Botânico ', 'Jardim ', 38.718283, -9.148578);

insert into local(loc_name, loc_desc, loc_x, loc_y) values ('Village Underground Lisboa', 'Centro Cultural ', 38.700496, -9.178309);
insert into local(loc_name, loc_desc, loc_x, loc_y) values ('Lx Factory ', 'Centro Artistico ', 38.703464, -9.178862);
insert into local(loc_name, loc_desc, loc_x, loc_y) values ('Biblioteca de Alcântara ', 'Biblioteca ', 38.706386, -9.177748);
insert into local(loc_name, loc_desc, loc_x, loc_y) values ('AINORI Galeria de Arte ', 'Galeria de Arte ', 38.705883, -9.175589);

insert into local(loc_name, loc_desc, loc_x, loc_y) values ('Biblioteca Palácio Galveias ', 'Biblioteca ', 38.741591, -9.143937);
insert into local(loc_name, loc_desc, loc_x, loc_y) values ('Museu Caloste Gulbenkian ', 'Museu ', 38.737712, -9.153481);
insert into local(loc_name, loc_desc, loc_x, loc_y) values ('Jardim amnistia ', 'Jardim ', 38.736707, -9.164851);

<<<<<<< HEAD
insert into route (rou_name, rou_use_id) values('Lisboeta', 3);
insert into route (rou_name, rou_use_id) values('Rústica', 2);
insert into route (rou_name, rou_use_id) values ('Artistica', 3);
=======

insert table routelocal(rl_rou_id, rl_loc_id) values (1,1);
insert table routelocal(rl_rou_id, rl_loc_id) values (1,2);
insert table routelocal(rl_rou_id, rl_loc_id) values (1,3);

insert table routelocal(rl_rou_id, rl_loc_id) values (2,4);
insert table routelocal(rl_rou_id, rl_loc_id) values (2,5);
insert table routelocal(rl_rou_id, rl_loc_id) values (2,6);
insert table routelocal(rl_rou_id, rl_loc_id) values (2,7);

insert table routelocal(rl_rou_id, rl_loc_id) values (3,8);
insert table routelocal(rl_rou_id, rl_loc_id) values (3,9);
insert table routelocal(rl_rou_id, rl_loc_id) values (3,10);

insert table routestatus(rs_rou_id, rs_st_id) values(1,2);
insert table routestatus(rs_rou_id, rs_st_id) values(2,2);
insert table routestatus(rs_rou_id, rs_st_id) values(3,2);

insert table media(med_url) values('https://offloadmedia.feverup.com/lisboasecreta.co/wp-content/uploads/2021/03/20043602/Jardim-da-Tapada-das-Necessidades-%40capilopes-1024x756.jpg');
insert table media(med_url) values('https://www.jf-estrela.pt/images/freguesia/patrimonio/1/imagem_1.png');
insert table media(med_url) values('https://www.transportal.com.br/noticias/wp-content/uploads/2022/08/jardim-botanico-de-curitiba-area-externa.jpg');

insert table localmedia(lm_med_id, lm_loc_id) values (1,1);
insert table localmedia(lm_med_id, lm_loc_id) values (2,2);
insert table localmedia(lm_med_id, lm_loc_id) values (3,3);
>>>>>>> mariana



insert into media(med_url) values('https://offloadmedia.feverup.com/lisboasecreta.co/wp-content/uploads/2021/03/20043602/Jardim-da-Tapada-das-Necessidades-%40capilopes-1024x756.jpg');
insert into media(med_url) values('https://www.jf-estrela.pt/images/freguesia/patrimonio/1/imagem_1.png');
insert into media(med_url) values('https://www.transportal.com.br/noticias/wp-content/uploads/2022/08/jardim-botanico-de-curitiba-area-externa.jpg');


insert into routelocal(rl_rou_id, rl_loc_id) values (1,1);
insert into routelocal(rl_rou_id, rl_loc_id) values (1,2);
insert into routelocal(rl_rou_id, rl_loc_id) values (1,3);

insert into routelocal(rl_rou_id, rl_loc_id) values (2,4);
insert into routelocal(rl_rou_id, rl_loc_id) values (2,5);
insert into routelocal(rl_rou_id, rl_loc_id) values (2,6);
insert into routelocal(rl_rou_id, rl_loc_id) values (2,7);

insert into routelocal(rl_rou_id, rl_loc_id) values (3,8);
insert into routelocal(rl_rou_id, rl_loc_id) values (3,9);
insert into routelocal(rl_rou_id, rl_loc_id) values (3,10);

insert into routestatus(rs_rou_id, rs_st_id) values(1,2);
insert into routestatus(rs_rou_id, rs_st_id) values(2,2);
insert into routestatus(rs_rou_id, rs_st_id) values(3,2);

insert into localmedia(lm_med_id, lm_loc_id) values (1,1);
insert into localmedia(lm_med_id, lm_loc_id) values (2,2);
insert into localmedia(lm_med_id, lm_loc_id) values (3,3);



insert into rating(rat_use_id, rat_rou_id, rat_comm, rat_score) values(1, 2, 'Recomendo', 4);


