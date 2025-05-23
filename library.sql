PGDMP      7                }           library    17.4    17.4 @    J           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            K           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            L           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            M           1262    16510    library    DATABASE     m   CREATE DATABASE library WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en-US';
    DROP DATABASE library;
                     postgres    false            �            1259    28150    authors    TABLE     f   CREATE TABLE public.authors (
    authorid bigint NOT NULL,
    author_name character varying(255)
);
    DROP TABLE public.authors;
       public         heap r       postgres    false            �            1259    28205    authors_seq    SEQUENCE     u   CREATE SEQUENCE public.authors_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.authors_seq;
       public               postgres    false            �            1259    28155 	   book_copy    TABLE        CREATE TABLE public.book_copy (
    book_copyid bigint NOT NULL,
    is_rented boolean NOT NULL,
    bookid bigint NOT NULL
);
    DROP TABLE public.book_copy;
       public         heap r       postgres    false            �            1259    28206    book_copy_seq    SEQUENCE     w   CREATE SEQUENCE public.book_copy_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.book_copy_seq;
       public               postgres    false            �            1259    28160    books    TABLE     b  CREATE TABLE public.books (
    bookid bigint NOT NULL,
    added_date date,
    pages integer,
    path_to_cover character varying(255),
    publication_year integer,
    rating double precision,
    rented_count integer,
    title character varying(255),
    authorid bigint NOT NULL,
    categoryid bigint NOT NULL,
    publisherid bigint NOT NULL
);
    DROP TABLE public.books;
       public         heap r       postgres    false            �            1259    28207 	   books_seq    SEQUENCE     s   CREATE SEQUENCE public.books_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
     DROP SEQUENCE public.books_seq;
       public               postgres    false            �            1259    28167    cart    TABLE     �   CREATE TABLE public.cart (
    cartid bigint NOT NULL,
    created_at timestamp(6) without time zone,
    memberid bigint NOT NULL
);
    DROP TABLE public.cart;
       public         heap r       postgres    false            �            1259    28172 
   cart_items    TABLE     �   CREATE TABLE public.cart_items (
    id bigint NOT NULL,
    added_at timestamp(6) without time zone,
    book_copyid bigint NOT NULL,
    cartid bigint NOT NULL
);
    DROP TABLE public.cart_items;
       public         heap r       postgres    false            �            1259    28208    cart_items_seq    SEQUENCE     x   CREATE SEQUENCE public.cart_items_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.cart_items_seq;
       public               postgres    false            �            1259    28209    cart_seq    SEQUENCE     r   CREATE SEQUENCE public.cart_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
    DROP SEQUENCE public.cart_seq;
       public               postgres    false            �            1259    28177 
   categories    TABLE     m   CREATE TABLE public.categories (
    categoryid bigint NOT NULL,
    category_name character varying(255)
);
    DROP TABLE public.categories;
       public         heap r       postgres    false            �            1259    28210    categories_seq    SEQUENCE     x   CREATE SEQUENCE public.categories_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.categories_seq;
       public               postgres    false            �            1259    28182    members    TABLE     �   CREATE TABLE public.members (
    memberid bigint NOT NULL,
    email character varying(255),
    first_name character varying(255),
    is_admin boolean NOT NULL,
    last_name character varying(255),
    password character varying(255)
);
    DROP TABLE public.members;
       public         heap r       postgres    false            �            1259    28211    members_seq    SEQUENCE     u   CREATE SEQUENCE public.members_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.members_seq;
       public               postgres    false            �            1259    28189    order_items    TABLE     �   CREATE TABLE public.order_items (
    order_itemid bigint NOT NULL,
    added_at timestamp(6) without time zone,
    book_copyid bigint NOT NULL,
    orderid bigint NOT NULL
);
    DROP TABLE public.order_items;
       public         heap r       postgres    false            �            1259    28212    order_items_seq    SEQUENCE     y   CREATE SEQUENCE public.order_items_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.order_items_seq;
       public               postgres    false            �            1259    28194    orders    TABLE     �  CREATE TABLE public.orders (
    orderid bigint NOT NULL,
    completed_at timestamp(6) without time zone,
    created_at timestamp(6) without time zone,
    rented_at timestamp(6) without time zone,
    status character varying(255),
    memberid bigint NOT NULL,
    CONSTRAINT orders_status_check CHECK (((status)::text = ANY ((ARRAY['PENDING'::character varying, 'RENTED'::character varying, 'COMPLETED'::character varying])::text[])))
);
    DROP TABLE public.orders;
       public         heap r       postgres    false            �            1259    28213 
   orders_seq    SEQUENCE     t   CREATE SEQUENCE public.orders_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.orders_seq;
       public               postgres    false            �            1259    28200 
   publishers    TABLE     o   CREATE TABLE public.publishers (
    publisherid bigint NOT NULL,
    publisher_name character varying(255)
);
    DROP TABLE public.publishers;
       public         heap r       postgres    false            �            1259    28214    publishers_seq    SEQUENCE     x   CREATE SEQUENCE public.publishers_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.publishers_seq;
       public               postgres    false            4          0    28150    authors 
   TABLE DATA           8   COPY public.authors (authorid, author_name) FROM stdin;
    public               postgres    false    217   WJ       5          0    28155 	   book_copy 
   TABLE DATA           C   COPY public.book_copy (book_copyid, is_rented, bookid) FROM stdin;
    public               postgres    false    218   ?N       6          0    28160    books 
   TABLE DATA           �   COPY public.books (bookid, added_date, pages, path_to_cover, publication_year, rating, rented_count, title, authorid, categoryid, publisherid) FROM stdin;
    public               postgres    false    219   Q       7          0    28167    cart 
   TABLE DATA           <   COPY public.cart (cartid, created_at, memberid) FROM stdin;
    public               postgres    false    220   Z_       8          0    28172 
   cart_items 
   TABLE DATA           G   COPY public.cart_items (id, added_at, book_copyid, cartid) FROM stdin;
    public               postgres    false    221   �_       9          0    28177 
   categories 
   TABLE DATA           ?   COPY public.categories (categoryid, category_name) FROM stdin;
    public               postgres    false    222   �_       :          0    28182    members 
   TABLE DATA           ]   COPY public.members (memberid, email, first_name, is_admin, last_name, password) FROM stdin;
    public               postgres    false    223   ``       ;          0    28189    order_items 
   TABLE DATA           S   COPY public.order_items (order_itemid, added_at, book_copyid, orderid) FROM stdin;
    public               postgres    false    224   �a       <          0    28194    orders 
   TABLE DATA           `   COPY public.orders (orderid, completed_at, created_at, rented_at, status, memberid) FROM stdin;
    public               postgres    false    225   {b       =          0    28200 
   publishers 
   TABLE DATA           A   COPY public.publishers (publisherid, publisher_name) FROM stdin;
    public               postgres    false    226   Kc       N           0    0    authors_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.authors_seq', 101, true);
          public               postgres    false    227            O           0    0    book_copy_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.book_copy_seq', 401, true);
          public               postgres    false    228            P           0    0 	   books_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.books_seq', 251, true);
          public               postgres    false    229            Q           0    0    cart_items_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.cart_items_seq', 801, true);
          public               postgres    false    230            R           0    0    cart_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('public.cart_seq', 251, true);
          public               postgres    false    231            S           0    0    categories_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.categories_seq', 51, true);
          public               postgres    false    232            T           0    0    members_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.members_seq', 151, true);
          public               postgres    false    233            U           0    0    order_items_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.order_items_seq', 451, true);
          public               postgres    false    234            V           0    0 
   orders_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.orders_seq', 451, true);
          public               postgres    false    235            W           0    0    publishers_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.publishers_seq', 51, true);
          public               postgres    false    236            �           2606    28154    authors authors_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (authorid);
 >   ALTER TABLE ONLY public.authors DROP CONSTRAINT authors_pkey;
       public                 postgres    false    217            �           2606    28159    book_copy book_copy_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.book_copy
    ADD CONSTRAINT book_copy_pkey PRIMARY KEY (book_copyid);
 B   ALTER TABLE ONLY public.book_copy DROP CONSTRAINT book_copy_pkey;
       public                 postgres    false    218            �           2606    28166    books books_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (bookid);
 :   ALTER TABLE ONLY public.books DROP CONSTRAINT books_pkey;
       public                 postgres    false    219            �           2606    28176    cart_items cart_items_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.cart_items DROP CONSTRAINT cart_items_pkey;
       public                 postgres    false    221            �           2606    28171    cart cart_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cartid);
 8   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pkey;
       public                 postgres    false    220            �           2606    28181    categories categories_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (categoryid);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public                 postgres    false    222            �           2606    28188    members members_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (memberid);
 >   ALTER TABLE ONLY public.members DROP CONSTRAINT members_pkey;
       public                 postgres    false    223            �           2606    28193    order_items order_items_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (order_itemid);
 F   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_pkey;
       public                 postgres    false    224            �           2606    28199    orders orders_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (orderid);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public                 postgres    false    225            �           2606    28204    publishers publishers_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.publishers
    ADD CONSTRAINT publishers_pkey PRIMARY KEY (publisherid);
 D   ALTER TABLE ONLY public.publishers DROP CONSTRAINT publishers_pkey;
       public                 postgres    false    226            �           2606    28260 "   orders fk1xjwdou2xbkonpyl98idn0r70    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk1xjwdou2xbkonpyl98idn0r70 FOREIGN KEY (memberid) REFERENCES public.members(memberid);
 L   ALTER TABLE ONLY public.orders DROP CONSTRAINT fk1xjwdou2xbkonpyl98idn0r70;
       public               postgres    false    4754    225    223            �           2606    28230 !   books fkc3ubq27rw5xusuax556bprspi    FK CONSTRAINT     �   ALTER TABLE ONLY public.books
    ADD CONSTRAINT fkc3ubq27rw5xusuax556bprspi FOREIGN KEY (publisherid) REFERENCES public.publishers(publisherid);
 K   ALTER TABLE ONLY public.books DROP CONSTRAINT fkc3ubq27rw5xusuax556bprspi;
       public               postgres    false    4760    226    219            �           2606    28220 !   books fkcu2rl4xs63o4sesk93ij9qwnr    FK CONSTRAINT     �   ALTER TABLE ONLY public.books
    ADD CONSTRAINT fkcu2rl4xs63o4sesk93ij9qwnr FOREIGN KEY (authorid) REFERENCES public.authors(authorid);
 K   ALTER TABLE ONLY public.books DROP CONSTRAINT fkcu2rl4xs63o4sesk93ij9qwnr;
       public               postgres    false    4742    217    219            �           2606    28255 '   order_items fkgw0ou6aya4sygrxioxl5ee43g    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fkgw0ou6aya4sygrxioxl5ee43g FOREIGN KEY (orderid) REFERENCES public.orders(orderid);
 Q   ALTER TABLE ONLY public.order_items DROP CONSTRAINT fkgw0ou6aya4sygrxioxl5ee43g;
       public               postgres    false    224    4758    225            �           2606    28245 &   cart_items fkgwnlld81rhtb46i94opjbdmpq    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT fkgwnlld81rhtb46i94opjbdmpq FOREIGN KEY (cartid) REFERENCES public.cart(cartid);
 P   ALTER TABLE ONLY public.cart_items DROP CONSTRAINT fkgwnlld81rhtb46i94opjbdmpq;
       public               postgres    false    220    221    4748            �           2606    28240 &   cart_items fkns7f349h9sa4e0iq7c8bak2xv    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT fkns7f349h9sa4e0iq7c8bak2xv FOREIGN KEY (book_copyid) REFERENCES public.book_copy(book_copyid);
 P   ALTER TABLE ONLY public.cart_items DROP CONSTRAINT fkns7f349h9sa4e0iq7c8bak2xv;
       public               postgres    false    218    221    4744            �           2606    28250 '   order_items fkroa12s90wt1rlp9qidp80tobp    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fkroa12s90wt1rlp9qidp80tobp FOREIGN KEY (book_copyid) REFERENCES public.book_copy(book_copyid);
 Q   ALTER TABLE ONLY public.order_items DROP CONSTRAINT fkroa12s90wt1rlp9qidp80tobp;
       public               postgres    false    224    4744    218            �           2606    28235     cart fkrtrjwx734ffbwmpyatdbtx3rv    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT fkrtrjwx734ffbwmpyatdbtx3rv FOREIGN KEY (memberid) REFERENCES public.members(memberid);
 J   ALTER TABLE ONLY public.cart DROP CONSTRAINT fkrtrjwx734ffbwmpyatdbtx3rv;
       public               postgres    false    220    223    4754            �           2606    28225 !   books fkrx4qw2d9q77vjlmug7oxwxnco    FK CONSTRAINT     �   ALTER TABLE ONLY public.books
    ADD CONSTRAINT fkrx4qw2d9q77vjlmug7oxwxnco FOREIGN KEY (categoryid) REFERENCES public.categories(categoryid);
 K   ALTER TABLE ONLY public.books DROP CONSTRAINT fkrx4qw2d9q77vjlmug7oxwxnco;
       public               postgres    false    222    219    4752            �           2606    28215 %   book_copy fktl0stn6qy4ihlbuyi2rm180q8    FK CONSTRAINT     �   ALTER TABLE ONLY public.book_copy
    ADD CONSTRAINT fktl0stn6qy4ihlbuyi2rm180q8 FOREIGN KEY (bookid) REFERENCES public.books(bookid);
 O   ALTER TABLE ONLY public.book_copy DROP CONSTRAINT fktl0stn6qy4ihlbuyi2rm180q8;
       public               postgres    false    219    4746    218            4   �  x�U�?r�F���)Х�F�O���gE��˱�e��$,nD�jvI��u� ��+|
O�\#9G��]dF�H����H�P�2ޓ�!V�NWxk�u�H��������T-i��-����ȅc6���]s�[\k�i�P+�6dpa{�-�j�8�+s��L�ہ`���pѓ�@4VK�6�V���`��x;
��N�b�މޭH�uM{۲�\�m!J%;7��m��L��A�xa7m<D�Z��l�srm'v#Kn+Lp�rAj#�o4C4Q��5�ŋ���!��mO���A����opջ}3@���Ź嶱'j!W\R������gwd�g�#���%�s��6��1��䧧`۰�/�ј$�&�z'j޻�X��g���� I�䬡F�FC�/��Z���nA���$QӖ��JWq�k������_��$S?���G�$ $����c�֝�	��$�$s{vxŒj�>��Ϭ�,�v�t�n�����9g=����[�ɹr��A*t��j�'� 6kj�� �4U�uM;�i%���k�<
է:���4͸�!*>�]ZWK���w�uGKS�IC6��op v���vY���y�U�c�}�*�յ��K��"K���� |��;�Ruź�+)g(s���G�~���Y�+A�V���
I䬴���&�*����{�$��0�7�M'N����N�Vy$�7��®�-�q���� ���C���j�P� r�Su�hg�efMG�%D�����k-=�"cf�Ր�'g�k�����jȋw�g-��������o�|"�J���nGn�B��J4��O�H�Ԃ�3�Gkk(bY��������_���p=Q���0�ⵕZ����� Y�!�gh��.A��V���^�����iE�~����]����i(&�H�>�B9�Ut`���e��X�l����0a����Tl:�a�4P&2���U���Z��2�� P �      5   �  x�=��m ;�f0#������m�H_�0\���a�������zv�z[<7ϣ���sZ�^�]����ok�b�ű�_��Z�D�^�ai�u�h�=sf��P�n=\mX�/Ǘ��6z&�i�3�-+sg��6�K�2���{��_��w��_o6��u�-3|}��\�ۜ�+ߴy2�˅o�j�=߶�3se�;�N�}��]�-�g�����6�F��2y=��y_�/3|C�O��p;�93W&�i羼_&�e�g�L<���\��u��v�����?A+�� ��a�.X��!87�Z �]�0Ge0�-X� ��CQ�
�YM�.�(��:)�v�)��:)�(��Lq�Q�a����S�Y�@��V�0�Z(�Y�C��.�� s|Z��V�Yg�M���:;����7ެF���M�\K�B� >r��xA����S1`��0/��� �-�CŖNLǀ]p
���h�_[�:]�:e¼5��a���mF�V�Q)�Y3S�����Y��@�>�T@xc'x�,`�h1�<���h'�< F=�4a>Z4X� �0Om�� ���:�0�84�����b�},@O�0_�L��y�*�ը4�	4���i���4�jT�`֨4�jB��Ϥ�$������v>���okkT��ȓ�^�S4~�i�]��!�4���gf� ��s�      6   9  x��Z�r��]7��d��XF��g��,[R��QI�Q�*�l��  ��,��2�٦��*��Oɹ�F�S"��C�����sϹ�D.���;�5g��[�߽~=�?��=�סZ�M�l�������zY�_�p��By}������c|�G�q#�}��C����d�����Ύ��c"��Z��枩#ńbo�k�e��z���<+��h;<,~�]˲zl��9|�t��C(+s�+������<g7�l���캮����~�n2<3WVÕy���KKc���6��S<�v���eg�CٵL�b��fJ(a����J�{��3��-B�\vQ<�Y�'}Ӵ���sjDe�{/͠2T���<;��o��ϠTf�j�����:�i"��g���5s�B�x��v;[���qK�����e��&.9$?<}�i�wI�S�����՞�vMQ=�A���(�?3G��dU���s�M!�w�%J}��<�'<Oc��N�٧��c�gE�l����E �(Z�rY��z�oZ�BQ"�j��p����a����`�g��4;-V�Rs�h�Z����b��p��.�G �Bg��ː]�O!+"D>��Ox�6W��wR�\|ٮ��iƥAE��S��iS?gD�~���|��'k�����
�J�Hpy&�����cNx���Q."����~�W=��n��w�z$�ͪ貮�N�P��f���4��WE�̟n�y��=��s,���H~x���B�o²�ʺj�� E�	O8����*5F
P�>(ͨR#>񷟙���mSNtc����!�>ܠ�u�i:D�!���P��������Ajy�
$�����N��Ұ��Nx���w�؜P�Dk����?�>�����NK�d�ݟf����	wH ������^}�
�<�Vv��Gqܣ�5e��m��y�~�	�,�	�A��D$�a��� ����딊�$��Y���2̈7�-�D$��툮�k�;'k����w�[:�}�-�!>��D$4�͈*7[��vR��]�c;��Fуtπ�YYo�(��4)�1�p���I~
(藟.A+�"F���\��ϺM2c��������r�̡*�-K�Ϥ|5��s+���P�'e0�������q�m_�C�HKڶM�;���8�6�>�u/�@O'e�~
�3�~�#:�
=!
����R�B�D8�^g�E��F6藺�2�QQ4�P��hB�<��J����ƹ����
T�j�;/Qj�!֓�q�׺�Z+��`=�s�xa��
�~��m�
��	]�%	��;�	}��C9��B�9��E�-C0c7ȞL�C�q4�a&�[���;ې�J�e#��0��	���Y��Yx@c~xp|R42A��tZ@����	L�m�cW=ʥI��_�)h_}��A<��D� ႜ�����}6=����@Hb�L�5"�
��ο�˦�U�͋u�������l]<�en4���O�9\�((Oe�g��ݮ�:ˮ"I�(��7�r�O�R��3Ԅt�4�fD]���J��F���R�A���� Y��%Hಞ=AU<�t��BO%(�TK�A#ǹDØ�ҳ�MS�v��Te�X�
Ǥ�n&*������2��}-��6�28��y3pK_���{���:�vG}x�f�˓1DTh7�O%�#�,C̩��~g$����c���� k�a�������T'ض����VR�&qn���}��n�<���iO��!e.�.u8��'Nj�,I��=�܆�
"Hc��Z�h����޸��~R4OÉC?�����7LL�*Q����B�qc���vUs�i�zS�����|^�4@�����>�@Ѻ�p��ݻS�4�Ҥs%� yyx����$�Խ��	(��f9��@߽_���䀈#������NdZG#�����mώ�%��XK��>l�x�Ntڗ�I��h>��&�^v!���"�.�t�1����{��1���a� ����u��pz�QJ�(w�G��YXw��Ŷ-g-*$�Tmӓ���V�;:��+
���lQ:U,�� �ʖy.:5��Zt@��ԊΛ0�6���������i~#��f�+	m�sV�=�@�-ё�G�U�Y,L�5<�3��u�I� ����J�tD*�������-YUF�CJM�7N�R�}�|�p.Fv�|�W�mVE�]ݦ	$hl�z�3!�+��@y�����a�]�|�ߧՖ���������+�0\�{Zr��6F�Խ�4*M�Q��Ȑz K�{o	�3����]Ѭ�3#m���I�3��~�QSElx�(�{j��p��#L
�Y��T*66��XW�/�T���ph e����%;}Z��.r�I���å�Z
�����Y��ȵ4Ӎ�tY(ᤴ��Ƥw��T.m���h�8>aS��c`���s���
6m��Wq�e��(9����F� i�D:PT�@%��n��AkxN����Y�#o�����[z"ˇr>Y>U��2�9a��M�yr�4ۈ/�"CC�# �]�y���rfDt6�%#���bW_ơ�B�`i���W�332l�fo�\�41eV����q�Y��m7mY��E2�)�G𯌬o����+�������Л�7wY�e�x|~u��ϯo����۷w���痷٫츌�4*Mv�M76b(�C�L��� ���t�qhf�A�iJ�&ܡ�Y��2_P|Vt!��J�Ȩ���%J��"Ly,�7�
��)����B��p#T��������L�u�xZ?,C4���&�#��O\B"z����08���iq�O����>}�秏�����>}���׿��/�th����k�}bb��R���n3���n<4^��AF0r��AX�����oj!m�C"ڧ�<EE���RG2ƶ�[N����	�>���ܣ�������[t#�!��ԡh��G�.�lj[�<Nx\z50b���e
��Z�Ů�7�`�r��ላJ��t(�Ex�W�ӛ��􄆆Լ��$Cn0�4H赝��3/B�]�e��VD�u�r�y퇠�|w�.}LX;+����Bm���۬n��ޗUQ�J�v3���Em6��q�͚PD���uG~�.d|*Y��j/�����5����O�I�B �9�>5"��ϥ���A�+S������$QI�������P�%�����%�6z��K�ϧQ?��Z�����q�
��VŲ*�e��(���)�GP��}4S2��x`��� Tt;�Y�]��xkx�\���|
sH|�VM|B-ʍ:K��y��'f��n'�������\�󉫋z!�s�65�x��Ό�?�΁�i'���!j���Fٛ�_Ȯ:�U>�&|��ZCS�%�}�H�J��-#��24pq�z�ħ2ǌ�)���FuH�v���E�=�I� &u�����?�T��^�&�J]���^�"�b����!�ca�e=+�����s��w����J��~�W�M���Ѻz���/�&��/�5�	��:���2V�R�.CM�Y��P��X���Q�!k�Q귏R���ud
_9b���9���֡��c�r�.�F��F2�L�ף�d�_�Ғ      7   h   x�]���1�3L��0��0˿��T��|�'dj��I-���P١���P� �R�z�ʭ�2F� �i�S.�<)��{�.�a���R��a���#�'k��G����@      8      x������ � �      9   a   x��;
�0�z�)<�࿶�lB�H6En�SOE���5���ʢ��	l�	h�����x%+�h�l�_L���COK�bB�@�r�b�Y� 7�\      :   \  x�}��r�@�3<�g`��[P�8A@E�\KȦ�1���TJ�<��՗���T�� i/�e����.)���MTJ�zʒ�oj��f'�&���)m/c�69&��Ϸ��o��L
g��o��|`$`�h@�q�UO�v���;~��h��H��%Z�9Pn����&��m"�NU���B�L%���^siR�5y��+$x��tp��9_J6_by��J�(-�ŵ���i������,R8unHC�Ѐ#�s�.&r܅�_�5>��%�0B��6A��X�_�`Y�&�#�ӥ��.��"�ay�?w����XP�a���&q���F�_��S��A
:��f}� ���4�nɐR      ;   �   x�}���0�og
 򝱓x��?G�RA*�O�;C)T����/��H��Che��E�����c��,��[3vA�)��'�ۡ�Z���Z�a�M2�T��f�SmO��T~OdOz5"0�����E��	�vO�0�ym�I]i�50Z�+�(�ZJy��L�      <   �   x�m�KN1D��S�i����ޒم������h���s�+[X7eŕq��(�0)<���B�3bMy�����������M�-��3��$Li<�9�}H<�r@�b1`�!Q1�#�9Ҋ��`��I!b���
�g�xi�YD���WdI�Ci>������|�^f�N]0F?#/cbSd�>��o˓Zk_�Zr      =   �   x��;�0 �9>�'F$�;tAT 6��j�ڕ� �=]������R��o<�����HvМYV��}�ux��9��F�-ɫ��%J�6Z�`N1�sl�#��S�m��^s��	v�ʃ
�p���s �od0�     