-- None at the moment,users must be created using the API because of the bcrypt



insert into status (st_name) values('Pessoal');
insert into status (st_name) values('Aprovado');
insert into status (st_name) values('A espera');
insert into status (st_name) values('Rejeitado');


insert into local(loc_name, loc_desc, loc_coordinates) values ('Tapada das Necessidades', 'Parque ', Point(38.708919, -9.169747));
insert into local(loc_name, loc_desc, loc_coordinates) values ('Jardim da Estrela ', 'Jardim ', Point(38.714742, -9.159373));
insert into local(loc_name, loc_desc, loc_coordinates) values ('Jardim Botânico ', 'Jardim ', Point(38.718283, -9.148578));

insert into local(loc_name, loc_desc, loc_coordinates) values ('Village Underground Lisboa', 'Centro Cultural ', Point(38.700496, -9.178309));
insert into local(loc_name, loc_desc, loc_coordinates) values ('Lx Factory ', 'Centro Artistico ', Point(38.703464, -9.178862));
insert into local(loc_name, loc_desc, loc_coordinates) values ('Biblioteca de Alcântara ', 'Biblioteca ', Point(38.706386, -9.177748));
insert into local(loc_name, loc_desc, loc_coordinates) values ('AINORI Galeria de Arte ', 'Galeria de Arte ', Point(38.705883, -9.175589));

insert into local(loc_name, loc_desc, loc_coordinates) values ('Biblioteca Palácio Galveias ', 'Biblioteca ', Point(38.741591, -9.143937));
insert into local(loc_name, loc_desc, loc_coordinates) values ('Museu Caloste Gulbenkian ', 'Museu ', Point(38.737712, -9.153481));
insert into local(loc_name, loc_desc, loc_coordinates) values ('Jardim amnistia ', 'Jardim ', Point(38.736707, -9.164851));


insert into route (rou_name, rou_use_id) values('Lisboeta', 3);
insert into route (rou_name, rou_use_id) values('Rústica', 2);
insert into route (rou_name, rou_use_id) values ('Artistica', 3);


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

insert into media(med_url) values('https://offloadmedia.feverup.com/lisboasecreta.co/wp-content/uploads/2021/03/20043602/Jardim-da-Tapada-das-Necessidades-%40capilopes-1024x756.jpg');
insert into media(med_url) values('https://www.jf-estrela.pt/images/freguesia/patrimonio/1/imagem_1.png');
insert into media(med_url) values('https://www.transportal.com.br/noticias/wp-content/uploads/2022/08/jardim-botanico-de-curitiba-area-externa.jpg');

insert into localmedia(lm_med_id, lm_loc_id) values (1,1);
insert into localmedia(lm_med_id, lm_loc_id) values (2,2);
insert into localmedia(lm_med_id, lm_loc_id) values (3,3);


insert into rating(rat_use_id, rat_rou_id, rat_comm, rat_score) values(1, 2, 'Recomendo', 4);

