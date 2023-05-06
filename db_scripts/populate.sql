-- None at the moment,users must be created using the API because of the bcrypt


--estados possiveis para as rotas
insert into status (st_name) values('Pessoal');
insert into status (st_name) values('Aprovado');
insert into status (st_name) values('A espera');
insert into status (st_name) values('Rejeitado');

--tipos de locais
insert into type(type_name) values ('Museu'); --1
insert into type(type_name) values ('Jardim'); --2
insert into type(type_name) values ('Teatro');-- 3
insert into type(type_name) values ('Monumento'); --4
insert into type(type_name) values ('Igreja'); --5
insert into type(type_name) values ('Arte'); --6
insert into type(type_name) values ('Cultura'); --7
insert into type(type_name) values ('Biblioteca'); --8

--locais para rotas teste.
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Tapada das Necessidades', 'Parque ', 'Point(-9.169747 38.708919)', 2);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Jardim da Estrela ', 'Jardim ', 'Point(-9.159373 38.714742)', 2);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Jardim Botânico ', 'Jardim ', 'Point(-9.148578 38.718283)', 2);

insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Village Underground Lisboa', 'Centro Cultural ', 'Point(-9.178309 38.700496)', 7);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Lx Factory ', 'Centro Artistico ','Point(-9.178862 38.703464)', 6);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Biblioteca de Alcântara ', 'Biblioteca ', 'Point(-9.177748 38.706386)', 8);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('AINORI Galeria de Arte ', 'Galeria de Arte ', 'Point(-9.175589 38.706386)', 6);

insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Biblioteca Palácio Galveias ', 'Biblioteca ', 'Point(-9.143937 38.741591)', 8);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Museu Caloste Gulbenkian ', 'Museu ', 'Point(-9.153481 38.737712)', 1);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Jardim amnistia ', 'Jardim ', 'Point(-9.164851 38.736707)', 2);

--museus 1
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Museu de Arte, Arquitetura e Tecnologia', 'O MAAT nasceu em Junho de 2016, inaugurou em Outubro desse ano e começou a funcionar em pleno em Março de 2017. Sem direito a quaisquer confusões, são as curvas desenhadas pela inglesa Amanda Levete, campeãs da atenção nas redes sociais, que mais chamam a atenção neste reduto imprescindível à beira-rio. E acredite que se por fora é fascinante, vale a pena estar atento à agenda de exposições e marcar uma visita.', 'Point(-9.193279818088264 38.69591468691532)', 1);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Museu Nacional dos Coches', 'Para sentir a envolvência da época é preciso atravessar a rua e ir até ao Picadeiro Real. Mas é no edifício mais recente que se pode ver de cima toda a colecção. Em baixo, a escala dos carrinhos dos infantes provoca sorrisos e o Coche dos Oceanos, que integrou a embaixada que D. João V enviou ao Papa em 1716, ofusca. Testemunha do regicídio de 1908, o landau do rei D. Carlos é para observar devagar — as marcas das balas ainda lá estão para ser vistas.', 'Point(-9.198361281903878 38.69713185278652)', 1);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Museu Nacional de Arte Antiga', 'Guarda um número razoável de peças de visita essencial para qualquer lisboeta que se preze e é uma daquelas instituições de paragem obrigatória nas Janelas Verdes. Com As Tentações de Santo Antão e os Painéis de São Vicente à cabeça, o MNAA está recheado de pintura, escultura, cerâmica, têxteis, vidros, desenhos, peças de ourivesaria e mobiliário.', 'Point(-9.161378473907627 38.70497513233416)', 1);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Museu do Tesouro Real', 'As relíquias da Coroa portuguesa mostram-se no Museu do Tesouro Real, na ala poente do Palácio da Ajuda. O processo de segurança para entrar no edifício é moroso, mas vale a pena para poder vislumbrar o acervo de ourivesaria e joias da antiga Casa Real, um espólio destruído, em parte, no terramoto de 1755, e que hoje ascende a um total de mais de 900 peças. A exposição, de carácter permanente, divide-se em 11 núcleos: ouro e diamantes do Brasil, moedas e medalhas da Coroa, joias do acervo do Palácio Nacional da Ajuda, ordens honoríficas, insígnias régias, prata de aparato da Coroa, colecções particulares, ofertas diplomáticas, capela real, Baixela Germain e viagens do Tesouro Real.', 'Point(-9.198736189251562 38.70778703258497)', 1);

--jardins 2
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Jardim do Torel', 'A requalificação do Jardim do Torel, na Colina de Santana, chegou ao fim em 2020. Promovida pela Junta de Freguesia de Santo António, a intervenção contou com o planeamento da arquitecta paisagista Raquel Alho, que desenhou espaços para os utilizadores se sentarem na relva, envolvidos por canteiros de maçarocos (orgulho-da-Madeira) e plantas aromáticas, como a lavanda ou a verbena.', 'Point(-9.1408183818423 38.71935005970546)', 2);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Jardim da Cerca da Graça', 'É um segredo mal guardado à vista de todos. Ainda poucos o conhecem (pelo menos os que vivem e trabalham noutras freguesias), mas é o maior espaço verde de acesso público da zona histórica de Lisboa. É ideal para um piquenique em que leve a família toda atrelada, com uma vasta área relvada para estender toalha. O jardim tem três miradouros, uma zona com parque de merendas e um pomar.', 'Point(-9.131919200890744 38.71761415077691)', 2);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Jardim do Campo Grande', 'Foi aos poucos que o Campo Grande ganhou uma nova vida. Em 2013 a zona norte, em 2017 o Caleidoscópio, e em Abril de 2018 concluiu-se o projecto da zona sul. O jardim ganhou nova mobília, vegetação e um novo nome: Jardim Mário Soares, em homenagem ao histórico líder do PS que morava ali ao lado e tinha por hábito ali dar os seus passeios.', 'Point(-9.15330827575673 38.75654797176186)', 2);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Jardim José Gomes Ferreira', 'É dos melhores parques de Lisboa para se fazer um piquenique. Tem árvores por todo o lado, incluindo oliveiras e alfarrobeiras, e não há nada melhor do que estender a toalha mesmo sobre a relva, no meio das flores. Escolha o pequeno vale, do lado do quiosque.', 'Point(-9.13504430459258 38.7592715334684)', 2);

--teatros 3
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Teatro São Luiz', 'Foi inaugurado em 22 de Maio de 1894, tendo então o nome Teatro Dona Amélia, à época rainha de Portugal. A ideia da sua construção partiu do actor Guilherme da Silveira, que conseguiu cativar diversos investidores, entre os quais Luís de Braga Júnior, o visconde de São Luiz de Braga, que viria a ser o principal impulsionador do novo teatro.', 'Point(-9.142394946923464 38.70941500795023)', 3);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Teatro Nacional D.Maria II', 'O Teatro Nacional abriu as suas portas a 13 de abril de 1846, durante as comemorações do 27.º aniversário da rainha Maria II (1819-1853), passando por isso a exibir o seu nome na designação oficial. Na inauguração, foi apresentado o drama histórico em cinco atos O Magriço e os Doze de Inglaterra, original de Jacinto Aguiar de Loureiro. Mas a história do Teatro Nacional D. Maria II começa dez anos antes da sua inauguração.', 'Point(-9.13969094507101 38.71488418548833)', 3);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Teatro da Trinidade','O Teatro da Trindade foi inaugurado a 30 de novembro de 1867, por iniciativa de Francisco Palha, com desenho do arquiteto Miguel Evaristo. O edifício, com traços pombalinos e neoclássicos, foi erguido entre a Rua da Misericórdia, o Largo da Trindade e a Rua Nova da Trindade e integrava também um Salão, onde decorriam concertos, conferências e bailes.', 'Point(-9.142092579990521 38.7121377077178)', 3);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Teatro Tivoli', 'Uma aposta do empresário Frederico de Lima Mayer, homem requintado e de grande cultura, que pretendia, à semelhança das congéneres europeias, dotar Lisboa de um espaço exclusivamente dedicado ao culto da Sétima Arte, movimento então em ascensão por todo o mundo, mas onde fosse possível apresentar também outro tipo de espectáculos, o Tivoli abriu, com pompa e circunstância, as portas para a Avenida da Liberdade em 1924.', 'Point(-9.144660451154055 38.72053514461808)', 3);

--monumentos 4
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Torre de Belém', 'A Torre de Belém, situada no estuário do Tajo, serviu inicialmente como torre de defesa para proteger Lisboa. Posteriormente, sua missão foi relegada a farol e centro aduaneiro.', 'Point(-9.215633981843936 38.691734405327615)', 4);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Mosteiro dos Jerônimos', 'O Mosteiro dos Jerônimos é, junto com a Torre de Belém, a visita turística mais importante de Lisboa. É no seu interior que fica a tumba de Vasco da Gama.', 'Point(-9.206585887399969 38.698024845355796)', 4);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Padrão dos Descobrimentos', 'Com 52 metros de altura, o Padrão dos Descobrimentos comemora o quinto centenário da morte de Henrique o Navegante, descobridor dos Açores, Madeira e Cabo Verde.', 'Point(-9.205368181843827 38.69384848711371)', 4);

--igrejas 5
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Igreja de Santa Catarina', 'A igreja de Santa Catarina muito sofreu com incêndios e catástrofes naturais. É uma igreja paroquial, de arquitetura barroca.', 'Point(-9.147959324170714 38.71135909476594)', 5);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Igreja de Santa Engrácia', 'Mais conhecida como Panteão Nacional, é um sítio obrigatório para visitares em Lisboa, estando na rota dos miradouros, porque tem uma vista incrível.', 'Point(-9.119303905121882 38.7189722098021)', 5);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Igreja de São Domingos', 'Esta é, talvez, a igreja mais diferente das outras. Lá não vamos ver a talha de ouro, mas sim os vestígios do incêndio que ali aconteceu em 1959.', 'Point(-9.138451397186648 38.71485895658595)', 5);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Igreja de São Roque', 'No início do século XVI, encontrava-se neste local, junto à antiga muralha fernandina, um cemitério onde eram sepultadas as vítimas da peste. Sendo conhecidos em toda a Europa Meridional, os milagres de São Roque contra este flagelo, em 1506 o rei D. Manuel I solicitou a Veneza uma relíquia deste santo, a fim de proteger a população de Lisboa.', 'Point(-9.142943691630249 38.71363317305408)', 5);

--arte 6 
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Galeria de Ojo', 'É um cantinho discreto mas justifica uma passagem pela rua da Alegria. Benjamin Gonthier é um arquitecto francês que se apaixonou por Lisboa há três anos. Tão expressivo foi esse sentimento que criou o Foco, um projecto para promover os trabalhos de jovens artesãos, artistas ou designers, portugueses e internacionais. ', 'Point(-9.15681994745009 38.71540512675831)', 6);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Galeria Foco', 'É um cantinho discreto mas justifica uma passagem pela rua da Alegria. Benjamin Gonthier é um arquitecto francês que se apaixonou por Lisboa há três anos. Tão expressivo foi esse sentimento que criou o Foco, um projecto para promover os trabalhos de jovens artesãos, artistas ou designers, portugueses e internacionais. ', 'Point(-9.136134508825966 38.722863839707585)', 6);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Galeria Ratton', 'Em 1987, a Galeria Ratton apostava na produção de cerâmica, convidando pintores e artistas plásticos a trabalharem o azulejo, essa bandeira nacional. Encetava-se assim um trajecto de recuperação da tradição deste ex-líbris, não só pelo foco na evolução das técnicas de produção como pelas novas formas de viver os espaços, com o azulejo a reflectir as tendências dos dias que correm.', 'Point(-9.147560147450136 38.71360710156725)', 6);

--cultural 7
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Centro Cultural de Belém', 'Projetado por Manuel Salgado e Vittorio Gregotti, foi colocado num espaço monumentalmente privilegiado. A sua arquitetura moderna contrasta de forma suave com alguns dos grandes ícones da Lisboa antiga. Se atravessar dos Jerónimos para o CCB, atravessa séculos de história em poucos passos.', 'Point(-9.207882135811435 38.69562010258637)', 7);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Casino do Estoril', 'O Casino Estoril é um grandioso complexo de jogo e de lazer que se distingue pela sua capacidade em impulsionar as artes e o espectáculo, e que, em regra, nenhum turista deixa de visitar. Localizado no Estoril, a 18 km de Lisboa e a 20 kms do seu aeroporto internacional, o Casino Estoril é o maior da Europa consolidando, ano após ano, um prestígio mundial.', 'Point(-9.397335162267696 38.70743732772067)', 7);

--bibliotecas 8
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Biblioteca Central da Marinha', 'Bem-vindo ao mundo das cartas e dos atlas, das lições sobre Astronomia, Geometria, Aritmética, História e Geografia. Prepare-se para os calhamaços que devolvem tudo o que sempre quis saber sobre os Descobrimentos e a expansão portuguesa no mundo.', 'Point(-9.189914266499452 38.69817702520742)', 8);
insert into local(loc_name, loc_desc, loc_coordinates, loc_type) values ('Biblioteca da Academia das Ciências', 'Um exemplar da primeira edição, autêntica, dOs Lusíadas? Encontra-o na Biblioteca da Academia das Ciências, fundada no reinado de D. Maria I e D. Pedro III, em 1779, em pleno Iluminismo. Levava então o nome de Academia Real das Ciências', 'Point(-9.149416649302331 38.71324481584048)', 8);

--rotas
insert into route (rou_name, rou_use_id) values('Lisboeta', 3);
insert into route (rou_name, rou_use_id) values('Rústica', 2);
insert into route (rou_name, rou_use_id) values ('Artistica', 3);

--associação de locais a rotas
--rota Lisboeta
insert into routelocal(rl_rou_id, rl_loc_id) values (1,1);
insert into routelocal(rl_rou_id, rl_loc_id) values (1,2);
insert into routelocal(rl_rou_id, rl_loc_id) values (1,3);

--rota Rústica
insert into routelocal(rl_rou_id, rl_loc_id) values (2,4);
insert into routelocal(rl_rou_id, rl_loc_id) values (2,5);
insert into routelocal(rl_rou_id, rl_loc_id) values (2,6);
insert into routelocal(rl_rou_id, rl_loc_id) values (2,7);

--rota Artistica
insert into routelocal(rl_rou_id, rl_loc_id) values (3,8);
insert into routelocal(rl_rou_id, rl_loc_id) values (3,9);
insert into routelocal(rl_rou_id, rl_loc_id) values (3,10);

--associação de estados a rotas.
insert into routestatus(rs_rou_id, rs_st_id) values(1,2);
insert into routestatus(rs_rou_id, rs_st_id) values(2,2);
insert into routestatus(rs_rou_id, rs_st_id) values(3,2);

insert into localtype(loc_l_id, loc_t_id) values(1,2);
insert into localtype(loc_l_id, loc_t_id) values(2,2);
insert into localtype(loc_l_id, loc_t_id) values(3,2);
insert into localtype(loc_l_id, loc_t_id) values(4,6);
insert into localtype(loc_l_id, loc_t_id) values(5,6);
insert into localtype(loc_l_id, loc_t_id) values(6,8);
insert into localtype(loc_l_id, loc_t_id) values(7,6);
insert into localtype(loc_l_id, loc_t_id) values(8,8);
insert into localtype(loc_l_id, loc_t_id) values(9,1);
insert into localtype(loc_l_id, loc_t_id) values(10,2);

insert into localtype(loc_l_id, loc_t_id) values(11,1);
insert into localtype(loc_l_id, loc_t_id) values(12,1);
insert into localtype(loc_l_id, loc_t_id) values(13,1);
insert into localtype(loc_l_id, loc_t_id) values(14,1);

insert into localtype(loc_l_id, loc_t_id) values(15,2);
insert into localtype(loc_l_id, loc_t_id) values(16,2);
insert into localtype(loc_l_id, loc_t_id) values(17,2);
insert into localtype(loc_l_id, loc_t_id) values(18,2);

insert into localtype(loc_l_id, loc_t_id) values(19,3);
insert into localtype(loc_l_id, loc_t_id) values(20,3);
insert into localtype(loc_l_id, loc_t_id) values(21,3);
insert into localtype(loc_l_id, loc_t_id) values(22,3);

insert into localtype(loc_l_id, loc_t_id) values(23,4);
insert into localtype(loc_l_id, loc_t_id) values(24,4);
insert into localtype(loc_l_id, loc_t_id) values(25,4);
insert into localtype(loc_l_id, loc_t_id) values(26,4);

insert into localtype(loc_l_id, loc_t_id) values(27,5);
insert into localtype(loc_l_id, loc_t_id) values(28,5);
insert into localtype(loc_l_id, loc_t_id) values(29,5);
insert into localtype(loc_l_id, loc_t_id) values(30,5);

insert into localtype(loc_l_id, loc_t_id) values(31,6);
insert into localtype(loc_l_id, loc_t_id) values(32,6);
insert into localtype(loc_l_id, loc_t_id) values(33,6);

insert into localtype(loc_l_id, loc_t_id) values(34,7);
insert into localtype(loc_l_id, loc_t_id) values(35,7);

insert into localtype(loc_l_id, loc_t_id) values(36,8);
insert into localtype(loc_l_id, loc_t_id) values(37,8);

insert into media(med_url) values('https://offloadmedia.feverup.com/lisboasecreta.co/wp-content/uploads/2021/03/20043602/Jardim-da-Tapada-das-Necessidades-%40capilopes-1024x756.jpg');
insert into media(med_url) values('https://www.jf-estrela.pt/images/freguesia/patrimonio/1/imagem_1.png');
insert into media(med_url) values('https://www.transportal.com.br/noticias/wp-content/uploads/2022/08/jardim-botanico-de-curitiba-area-externa.jpg');

insert into localmedia(lm_med_id, lm_loc_id) values (1,1);
insert into localmedia(lm_med_id, lm_loc_id) values (2,2);
insert into localmedia(lm_med_id, lm_loc_id) values (3,3);

--ratings
insert into rating(rat_use_id, rat_rou_id, rat_comm, rat_score) values(1, 2, 'Recomendo', 4);

