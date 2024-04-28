CREATE DATABASE IF NOT EXISTS ShopThoiTrang;
USE ShopThoiTrang;
CREATE TABLE Slide (
    MaSlide INT AUTO_INCREMENT PRIMARY KEY,
    Anh longblob
);
CREATE TABLE GioiThieu (
    MaGioiThieu INT AUTO_INCREMENT PRIMARY KEY,
    TieuDe VARCHAR(50),
    NoiDung LONGTEXT NOT NULL,
    HinhAnh longblob
);
CREATE TABLE ThuongHieu (
    MaThuongHieu INT AUTO_INCREMENT PRIMARY KEY,
    TenThuongHieu VARCHAR(50),
    GioiThieu TEXT NOT NULL
);
CREATE TABLE LoaiSanPham (
    MaLoaiSanPham INT AUTO_INCREMENT PRIMARY KEY,
    TenLoaiSanPham VARCHAR(35) NOT NULL,
     GioiThieu TEXT
);
CREATE TABLE LienHe (
    MaLienHe INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(30),
    DiaChi longtext,
    SoDienThoai VARCHAR(15)
);
CREATE TABLE NhaCungCap (
    MaNhaCungCap INT AUTO_INCREMENT PRIMARY KEY,
    TenNhaCungCap VARCHAR(25) NOT NULL,
    DiaChi VARCHAR(25),
    SoDienThoai VARCHAR(15),
    Email VARCHAR(30)
);
CREATE TABLE Menu (
    MaMenu INT AUTO_INCREMENT PRIMARY KEY,
    TenMenu VARCHAR(30),
    Link VARCHAR(20)
);
Create Table Size (
	MaSize INT AUTO_INCREMENT PRIMARY KEY,
    TenSize varchar(10) not null ,
    MoTa varchar(100) 
);
CREATE TABLE SanPham (
    MaSanPham INT AUTO_INCREMENT PRIMARY KEY,
    TenSP TEXT,
    MoTa TEXT,
    NgayTao DATETIME,
    MaLoaiSanPham INT,
    MaThuongHieu INT,
    MaSize int ,
    AnhDaiDien longblob,
    SoLuong int ,
    FOREIGN KEY (MaSize) REFERENCES Size(MaSize) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MaLoaiSanPham) REFERENCES LoaiSanPham(MaLoaiSanPham) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MaThuongHieu) REFERENCES ThuongHieu(MaThuongHieu) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Gia (
    MaGia INT AUTO_INCREMENT PRIMARY KEY,
    MaSanPham INT,
    NgayBD DATETIME,
    NgayKT DATETIME,
    DonGia INT,
    FOREIGN KEY (MaSanPham) REFERENCES SanPham(MaSanPham) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE ThongSo(
    MaThongSo INT AUTO_INCREMENT PRIMARY KEY,
    TenThongSo VARCHAR(50),
    MoTa TEXT,
    MaSanPham INT,
    FOREIGN KEY (MaSanPham) REFERENCES SanPham(MaSanPham) ON DELETE CASCADE ON UPDATE CASCADE
);
create table Anh(
	MaAnh INT AUTO_INCREMENT PRIMARY KEY,
    HinhAnh longblob,
    TenHinhAnh varchar(20)
);
CREATE TABLE GiamGia (
    MaGiamGia INT AUTO_INCREMENT PRIMARY KEY,
    MaSanPham INT,
    PhanTram INT,
    NgayBD datetime,
    NgayKT datetime,
    FOREIGN KEY (MaSanPham) REFERENCES SanPham(MaSanPham) ON DELETE CASCADE ON UPDATE CASCADE
);
create TABLE NguoiDung (
    MaNguoiDung INT AUTO_INCREMENT PRIMARY KEY,
    TaiKhoan VARCHAR(35),
    MatKhau longtext NOT NULL,
    Email VARCHAR(50) NOT NULL,
    HoTen VARCHAR(50) NOT NULL,
    NgaySinh DATETIME,
	GioiTinh VARCHAR(10),
    DiaChi VARCHAR(50),
    SoDienThoai VARCHAR(15),
    AnhDaiDien longblob,
    VaiTro VARCHAR(30),
	EmailConfirmed bit ,
    Token longtext
);

CREATE TABLE TinTuc (
    MaTinTuc INT AUTO_INCREMENT PRIMARY KEY,
    TieuDe TEXT NOT NULL,
    NoiDung TEXT NOT NULL,
	NgayDang DATETIME,
    AnhTinTuc longblob,
    MaNguoiDung INT,
    FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE ChiTietTinTuc (
    MaChiTiet INT AUTO_INCREMENT PRIMARY KEY,
    MaTinTuc int,
	FOREIGN KEY (MaTinTuc) REFERENCES TinTuc(MaTinTuc) ON DELETE CASCADE ON UPDATE CASCADE,
    NoiDungChiTiet text
);
CREATE TABLE HoaDonNhap (
    MaHDN INT AUTO_INCREMENT PRIMARY KEY,
    NgayNhap DATETIME,
    MaNhaCungCap INT,
    MaNguoiDung INT,
    FOREIGN KEY (MaNhaCungCap) REFERENCES NhaCungCap(MaNhaCungCap) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE ChiTietHoaDonNhap (
    MaChiTiet INT AUTO_INCREMENT PRIMARY KEY,
    MaHDN INT,
    MaSanPham INT,
    SoLuong INT,
    GiaTien INT,
    FOREIGN KEY (MaHDN) REFERENCES HoaDonNhap(MaHDN) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MaSanPham) REFERENCES SanPham(MaSanPham) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE DonHang (
    MaDonHang INT AUTO_INCREMENT PRIMARY KEY,
    NgayDat DATETIME,
	NgayGiao DATETIME,
    HoTen varchar(50),
    DiaChi varchar(50),
    SoDienThoai varchar(15),
    PhuongThucThanhToan varchar(50),
	MaNguoiDung INT,
	FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung) ON DELETE CASCADE ON UPDATE CASCADE,
    TinhTrang int 
);
CREATE TABLE ChiTietDonHang (
    MaChiTiet INT AUTO_INCREMENT PRIMARY KEY,
    MaDonHang INT,
    MaSanPham INT,
    SoLuong INT,
    GiaTien INT,
    FOREIGN KEY (MaDonHang) REFERENCES DonHang(MaDonHang) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MaSanPham) REFERENCES SanPham(MaSanPham) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ThamSo (
	MaThamSo INT AUTO_INCREMENT PRIMARY KEY,
    TenThamSo varchar(30),
    KyHieu varchar(15),
    NoiDung varchar(50),
    Anh longblob
);

-- Thêm dữ liệu bảng Slide
INSERT INTO slide  (Anh)VALUES ('carousel1.jpg');
INSERT INTO slide (Anh) VALUES ('carousel2.jpg');
INSERT INTO slide (Anh) VALUES ('carousel3.jpg');
INSERT INTO slide (Anh) VALUES ('carousel4.jpg');

-- Thêm dữ liệu cho bảng giới thiệu
INSERT INTO GioiThieu(TieuDe,NoiDung,HinhAnh) VALUES('TỔNG QUAN VỀ CÔNG TY', 
'“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”','');
INSERT INTO GioiThieu(TieuDe,NoiDung,HinhAnh) VALUES('','Sed ut perspiciatis unde omnis iste natus error sit
 voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis
 et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
 aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.','4-1024x683.jpg');
INSERT INTO GioiThieu(TieuDe,NoiDung,HinhAnh) VALUES('','Sections 1.10.32 and 1.10.33 from “de Finibus Bonorum et Malorum” by Cicero are also reproduced in their exact original form, 
accompanied by English versions from the 1914 translation by H. Rackham','');
-- thêm dữ liệu cho bảng thương hiệu 
insert into ThuongHieu(TenThuongHieu,GioiThieu) values('CHANEL','Chanel chắc hẳn là cái tên không còn xa lạ gì dù chàng có là ""tín đồ thời trang hay không .Bởi thương hiệu đến từ Pháp này vô cùng nổi tiếng với nhiều sản phẩm khác nhau từ nước hoa , quần áo ,túi xanh hay một số loại mỹ phẩm 
<br>- Hướng đén phong cách thời trang thời thượng và đẳng cấp do đó các mẫu quần áo của Chanel được làm hoàn toàn từ chất liệu cao cấp cùng công nghệ may tinh xảo nhất .Bởi đó khó có ai có thể cưỡng lại sức hút toát ra từ các sản phẩm thời trang của thương hiệu này 
<br>-Đăc biệt , Chanel thường xuyên tổ chức các show diễn thời trang đỉnh cao thu hút rất nhiều nhà thiết kế trẻ ,tài năng để ra mắt bộ sưu tập mới của họ .Nhờ đó ,thương hiệu này ngày càng được nhiều người biết đén và trở thành số 1 trong làng thời trang thế giới');
insert into ThuongHieu(TenThuongHieu,GioiThieu) values('GUCCI','Là một trong những biểu tượng thời trang co cấp của ý và pháp với những sản phẩm thời trang xa xỉ bậc nhất.Trong đó hai dòng sản phẩm thời trang nam và nữ chủ đạo là The House of Gucci với các mẫu thiết kế độc nhất và thời thượng 
<br>-Ngoài ra .Gucci cũng vô cùng nổi tiếng với các dòng túi sách , đồng hồ , kính mắt , phụ kiện thời trang hàng hiệu bậc nhất hiện nay ');
insert into ThuongHieu(TenThuongHieu,GioiThieu) values('LOUIS VUITTON','là một trong những cái tên vàng trong làng thời trang của pháp ,LOUIS VUITTON không chỉ đơn giản là một thương hiệu thời trang xa xỉ mà nó còn là tượng đài của thời trang thế giới 
<br>-Được thành lập từ năm 1854 cho đến nay LOUIS VUITTON đã trở nên vô cùng nổi tiếng trên toàn thế giới và là một trong những thương hiệu thời trang cao cấp giá trị nhất .Không chỉ có những sản phẩm thời trang của nữ mà LOUIS VUITTON cũng có cho mình những bộ sưu tập thời trang nam chất nhất , được nhiều ngôi sao đón nhận 
<br>- Đặc biệt điều tạo nên sức hút khó cưỡng của thương hiệu thời trang nổi tiếng này là trang phục đều mang phong cách thời thượng , mới lạ và tinh xảo đến từng chi tiết nhỏ 
<br>- Cũng như nhiều thương hiệu thời trang hàng hiệu , cao cấp khác thì LOUIS VUITTON cũng đang ngày càng mở rộng ra các lĩnh vực khác như túi xách , nước hoa ,.....');
insert into ThuongHieu(TenThuongHieu,GioiThieu) values('DIOR','Được thành lập bởi nhà thiết kế tài ba Christian vào năm 1946 và cho đến nay nó đã trở thành thương hiệu thời trang nổi tiếng cao cấp bậc nhất tại pháp và được toàn thế giới công nhận .
<br>- Đối với các dòng sản phẩm thời trang của Dior , khó cí ai cưỡng lại sức hút của nó bởi phong cách Haute Couture đặc trưng đậm tính kiến trúc và sự quyến rũ 
<br>- Nếu Dior Womanswear là một trong những sản phẩm cao cấp dành cho phái nữ đầy quý phái , sang trọng thì Dior Homme là dòng sản phẩm dành cho nam mang thiết kế tối giản ,tinh xảo và vô cùng thanh lịch ');
insert into ThuongHieu(TenThuongHieu,GioiThieu) values('HERMES','HERMES cũng được biết đến là một trong những thương hiệu thời trang xa xỉ do người pháp thành lập từ năm 1837 khởi nguồn từ một cửa hàng bán vật dụng dành cho ngựa .Chính điều này đã tạo nên logo hình chiếc xe ngựa kéo quen thuộc của thương hiệu này 
<br>-Ngày nay , hermes đã trở thành đế chế thời trang khổng lồ của thế giới với những mẫu thời trang đẳng cấp và trang trọng nhất .Điểm độc đáo tạo nên sự nổi tiếng của thương hiệu thời trang nổi tiếng này là tất cả các sản phẩm đều được quan tâm đầu tư kỹ lưỡng trong quá trình sản xuất 
<br>-Đăc biệt với nhiều sản phẩm thời trang được làm hoàn toàn thủ công từ một người thợ duy nhất đẻ đảm bảo tính thống nhất và riêng biệt của sản phẩm .Nhờ đó , hermes là một trong những thương hiệu thời trang được nhiều ngôi sao nổi tiếng thế giới lựa chọn và sử dụng nhất tính đến 2021');
insert into ThuongHieu(TenThuongHieu,GioiThieu) values('DOLCE & GABBANA','Là một thương hiệu thời trang nổi tiếng về hàng cao cấp của ý được thành lập bởi chính hai nhà thiết kế này vào năm 1985 
<br>-cũng nhờ được thành lập bởi hai nhà thiết kế tài hoa và có tầm ảnh hưởng lớn đến xu hướng thời trang bấy giờ nên thương hiệu này thực sự đem đến những mẫu thiết kế đẳng cấp , tinh tế mà hiếm thương hiệu nào làm được 
<br>-Do đó ,DOLCE & GABBANA được rất nhiều ngôi sao Hollywood tin dùng và ưa chuộng mỗi khi có dịp dự các sự kiện lớn như : Madonna , Monica Bellucci ,...');
insert into ThuongHieu(TenThuongHieu,GioiThieu) values('VERSACE','Là một biểu tượng thời trang cao cấp bậc nhất của ý , Thương hiệu đã khiến cả thế giới phải ngưỡng mộ và trầm trồ nhờ đem đến những sản phẩm thời trang chất lượng , xa xỉ nhất theo phong cách độc đáo , sang trọng và vô cùng ấn tượng 
<br>-Đối với ai yêu thích và là tín đồ của thời trang xa xỉ thế giới chắc hẳn đều nhận thấy họa tiết của các trang phục mang thương hiệu Versace của nghệ thuật Hy lạp cổ đại với màu sắc , chất liệu , nét cổ điển và tính nghệ thuật điển hình , hình khố mới lạ ');
insert into ThuongHieu(TenThuongHieu,GioiThieu) values('PRADA','Là hãng thời trang danh giá nhất của nước ý đặc trưng với phong cách sang trọng , quý phái và thời thượng nên Prada đang ngày càng phát triển và định hướng trở thành thượng hiệu đỉnh cao của làng thời trang 
<br>-Cũng giống như nhiều thương hiệu thời trang nổi tiếng khác prada chia sản phẩm thành 2 dòng thời trng nam và nữ đẻ đáp ứng nhu cầu của khách hàng trên toàn thế giới .Đặc trưng của dòng sản phẩm này mang tính nghệ thuật cao có sự kết hợp nét cổ điển và hiện đại 
<br>- Do đó ,Prada cũng vẫn luôn tạo ra nét khác biệt mạnh mẽ giữa các thương hiệu thời trang khác ');
insert into ThuongHieu(TenThuongHieu,GioiThieu) values('BURBERRY','Được coi là niềm tự hào của thời trang cao cấp Anh Quốc với lịch sử hình thành lâu đời nhất trên thế giới 
<br>- Mặc dù ngày nay thương hiệu này đã cho ra mắt nhiều bộ sưu tập với những thiết kế ấn tượng và thời thượng nhất nhưng một đặc trưng và độc quyền trong phong cách thời trang của thương hiệu này , khiến người ta nhớ mãi là họa tiết sọc caro đơn giản nhưng vô cùng tinh tế trang nhã 
<br>- Và chính họa tiết này cũng là cảm hứng thiết kế cho những sản phẩm thời trang khác như đông hồ , mũ , ... của Burberry cho đến tận ngày nay  ');
insert into ThuongHieu(TenThuongHieu,GioiThieu) values('ARMANI','Là một trong những thương hiệu thời trang nổi tiếng của ý có tốc độ phát triển nhanh nhất ,Armani đang ngày càng khẳng định được tiếng tăm của mình trên thị trường thời trang cao cấp của thế giới 
<br>- Với những mẫu thời trang nam nữ hướng đến sự tối giản , tinh tế và có tính ứng dụng cao ,Armani đã chinh phục được nhiều nhà thiết kế nổi tiếng khác và nhiều ngôi sao nổi tiếng trên thế giới 
<br>-Không chỉ nổi tiếng về các sản phẩm thời trang mà đồng hồ , mỹ phẩm , đồ nội thất cũng là một trong những mặt hàng làm nên tên tuổi của thương hiệu này ');
insert into ThuongHieu(TenThuongHieu,GioiThieu) values('RALPH LAUREN','Thương hiệu thời trang nổi tiếng Ralph Lauren được thành lập 1967 bởi nhà thiết kế người mỹ 
<br>- Do đó các mẫu thời trang của thương hiệu này mang phong cách vừa sang trọng , vừa phóng khoáng và cổ điển đúng theo gu của người Mỹ 
<br>-Đặc biệt RALPH LAUREN còn được biết đến giống như cha` đẻ của biểu tượng Polo ngày nay nhờ bộ sưu tập thời trang giành cho nữ giới mang phong cách trang phục cổ điển của nam giới vào năm 1969 ');
insert into ThuongHieu(TenThuongHieu,GioiThieu) values('GIVENCHY','Là thương hiệu thời trang do chính nhà thiết kế trẻ tài năng người pháp gốc ý cùng tên sáng lập năm 1952
<br>-Tồn tại giữa kinh đô thời trang Paris với nhiều thương hiệu thời trang nổi tiếng và xa xỉ bậc nhất trên thế giớI nhưng GIVENCHY vẫn không hề kém cạnh mà đã tạo dựng cho mình được phong cách thời trang cao cấp khác biệt 
<br>-Các sản phẩm thời trang của GIVENCHY đều hướng tới tôn vinh nét đẹp hiện đại và đầy cá tính , sang trọng nhưng năng động của cả phái nam lẫn phái nữ .Nhờ đó , thương hiệu này đã nhanh chóng gia nhập đế chế thời trang hùng mạnh của thế giới một cách nhanh chóng ');
insert into ThuongHieu(TenThuongHieu,GioiThieu) values('FENDI','Là thương hiệu thời trang nổi tiếng của ý do Edoardo và Adele Fendi sáng lập chuyên về các sản phẩm thời trang cao cấp , nước hoa , giày dép và các phụ kiện thời trang khác 
<br>-Trong đó ấn tượng nhất của các mẫu thời trang của thương hiệu này đều được làm từ da và lông thú - hai chất liệu cao cấp và xa xỉ hàng đầu .Bởi thế , mỗi khi các bộ sưu tập của thương hiệu này được tung ra thị trường luôn tạo ra cơn sốt thời trang đối với nhiều ngôi sao hàng đầu trên thế giới 
<br>- Cũng chính chất liệu này đem đến cho các dòng thời trang của FENDI phong cách sang trọng , quý phái mà thanh lịch hiếm có ');
insert into ThuongHieu(TenThuongHieu,GioiThieu) values('Yves Saint Laurent','Yves Saint Laurent là một trong những thương hiệu thời trang cao cấp nhất của kinh độ thời trang Paris được nhà thiết kế huyền thoại Yves Saint Laurent và đối tác của ông là Piere Berge sáng lập năm 1962
<br>-Ngay từ những ngày đầu tiên ra mắt thời trang thế giới Yves Saint Laurent đã khiến cả thế giới thời trang phải sửng sốt và ngạc nhiên vì những mẫu thời trang nam nữ được thiết kế vô cùng tỉ mỉ , tinh xảo và nghệ thuật 
<br>-Không chỉ dừng lại thương hiệu thời trang nổi tiếng mà ngày nay Yves Saint Laurent cũng được biến đén là thương hiệu của các dòng mỹ phẩm cao cấp , xa xỉ được nhiều ngôi sao và giới thượng lưu trên thế giới ưa chuộng ');
insert into ThuongHieu(TenThuongHieu,GioiThieu) values('Bottega Veneta','Một cái tên đình đám khác của những thương hiệu thời trang nổi tiếng thế giới được ưa chuộng không kém là bottega Veneta - thương hiệu cao cấp của ý 
<br>-Với những kỹ thuật tác chế thủ công lâu đời và tinh xảo giúp cho các mẫu thiết kế của thương hiệu này chứa đựng một phong cách rất riêng biệt , mang đậm đặc trưng nước ý :đơn giản ,tinh tế và thời thượng  ');
-- thêm dữ liệu cho loại sản phẩm 
insert into LoaiSanPham(TenLoaiSanPham,GioiThieu)
values('Áo thun nam','Áo thun nam không chỉ thoải mái mà còn là biểu tượng thời trang nam giới. Với chất liệu như 
<br>-cotton và polyester, áo thun mang lại sự dễ chịu và thoáng khí. Đa dạng về kiểu dáng, màu 
<br>-sắc, và in hình, nó phản ánh cá tính và phong cách cá nhân. Linh hoạt trong mix đồ, áo thun là 
<br>-lựa chọn đa năng cho nhiều dịp khác nhau. Từ casual đến cá tính, áo thun nam là sự kết hợp 
<br>-hoàn hảo của thoải mái và phong cách.');
insert into LoaiSanPham(TenLoaiSanPham,GioiThieu) 
values('Áo thun nữ','Áo thun nữ là một trang phục không thể thiếu trong tủ đồ hàng ngày của phụ nữ. Với chất 
<br>-liệu nhẹ nhàng như cotton và polyester, áo thun mang đến sự thoải mái và linh hoạt cho 
<br>-người mặc. Kiểu dáng đa dạng từ cổ tròn, cổ V đến áo thun suông, áo thun nữ không chỉ giúp 
<br>-phản ánh phong cách cá nhân mà còn dễ dàng kết hợp với nhiều loại quần và váy. Màu sắc và 
<br>-họa tiết đa dạng tạo nên sự phong phú trong lựa chọn. Áo thun nữ không chỉ là biểu tượng 
<br>-của sự thoải mái mà còn là một phần quan trọng của thế giới thời trang đương đại.');
insert into LoaiSanPham(TenLoaiSanPham,GioiThieu) 
values('Áo sơ mi nam','
Áo sơ mi nam là biểu tượng của sự lịch lãm và tinh tế trong thế giới thời trang. Với chất liệu 
<br>-như cotton, linen, hoặc polyester, áo sơ mi mang lại cảm giác thoáng khí và thoải mái. Kiểu 
<br>-dáng đa dạng từ cổ tròn, cổ bẻ, đến cổ điển, áo sơ mi nam không chỉ phù hợp cho các dịp 
<br>-formal mà còn dễ dàng kết hợp với nhiều loại quần, từ quần tây đến jeans. Màu sắc và họa 
<br>-tiết trên áo sơ mi tạo nên sự đa dạng và phong cách cá nhân. Áo sơ mi nam không chỉ là một 
<br>-trang phục, mà còn là biểu tượng của sự sang trọng và quý phái.');
insert into LoaiSanPham(TenLoaiSanPham,GioiThieu) 
values('Áo sơ mi nữ','Áo sơ mi nữ là biểu tượng của sự nữ tính và lịch lãm trong thế giới thời trang. Chế tác từ chất 
<br>-liệu như cotton, silk, hoặc chiffon, áo sơ mi mang lại cảm giác mềm mại và thoải mái. Với 
<br>-nhiều kiểu dáng từ sơ mi trơn đến áo sơ mi hoa, chúng là lựa chọn hoàn hảo cho cả những 
<br>-dịp chính thức và cá nhân. Áo sơ mi nữ kết hợp tuyệt vời với quần tây, chân váy, hoặc jeans, 
<br>-tạo nên phong cách linh hoạt và sang trọng. Màu sắc và họa tiết trên áo sơ mi thường phản 
<br>-ánh sự tinh tế và cái đẹp riêng của phái đẹp. Từ văn phòng đến dạo phố, áo sơ mi nữ là biểu 
<br>-tượng của sự thanh lịch và quyến rũ.');
insert into LoaiSanPham(TenLoaiSanPham,GioiThieu) 
values('Đầm nữ','Đầm nữ là biểu tượng của sự nữ tính và quyến rũ trong thế giới thời trang. Với chất liệu đa 
<br>-dạng như cotton, 
chiffon, hoặc satin, đầm mang lại cảm giác thoải mái và sang trọng. Kiểu dáng phong phú từ đầm maxi dài đến đầm xòe ngắn, phản ánh sự đa dạng của phong cách và sự linh hoạt trong lựa chọn. Màu sắc và họa tiết trên đầm thường là điểm nhấn tạo nên vẻ đẹp riêng biệt. Đầm nữ không chỉ là sự chọn lựa tuyệt vời cho các dịp đặc biệt mà còn là người bạn đồng hành hoàn hảo cho những buổi gặp gỡ hay dạo chơi. Từ vintage đến hiện đại, đầm nữ thể hiện sự thanh lịch và phong cách cá nhân một cách xuất sắc.');
insert into LoaiSanPham(TenLoaiSanPham,GioiThieu) 
values('Chân váy','Chân váy là một phần quan trọng của tủ đồ phụ nữ, tạo nên sự nữ tính và quyến rũ. Với đa dạng về chất liệu như cotton, chiffon, hoặc denim, chân váy mang lại cảm giác thoải mái và phong cách.');
INSERT INTO LoaiSanPham(TenLoaiSanPham, GioiThieu) 
VALUES('Quần short nữ','Quần short nữ là một phụ kiện thời trang đa dạng và phổ biến, thích hợp cho nhiều hoạt động từ dạo phố đến hoạt động thể thao. Chúng được làm từ các chất liệu như cotton, denim, hoặc linen, mang lại sự thoải mái và linh hoạt cho người mặc.');
INSERT INTO LoaiSanPham(TenLoaiSanPham, GioiThieu) 
VALUES('Quần jean nữ', 'Quần jean nữ là một item cơ bản và không thể thiếu trong tủ đồ hàng ngày của phụ nữ. Với chất liệu jean chất lượng, quần jean mang lại sự thoải mái và độ bền cao, phản ánh phong cách cá nhân và sự ổn định trong lựa chọn trang phục.');
INSERT INTO LoaiSanPham(TenLoaiSanPham, GioiThieu) 
VALUES('Quần thun nữ', 'Quần thun nữ là một lựa chọn thoải mái và phổ biến trong tủ đồ hàng ngày. Chế tác từ chất liệu như cotton và spandex, quần thun mang lại sự co dãn và thoải mái, phản ánh phong cách năng động và hiện đại.');
INSERT INTO LoaiSanPham(TenLoaiSanPham, GioiThieu) 
VALUES('Quần jogger nữ', 'Quần jogger nữ là sự kết hợp hoàn hảo giữa thoải mái và phong cách. Chế tác từ chất liệu như cotton và polyester, quần jogger mang lại cảm giác mềm mại và sự co dãn, phản ánh phong cách năng động và thời trang đương đại.');
INSERT INTO LoaiSanPham(TenLoaiSanPham, GioiThieu) 
VALUES('Quần short nam', 'Quần short nam là một item không thể thiếu trong tủ đồ của nam giới, mang lại sự thoải mái và phong cách. Chế tác từ chất liệu như cotton và denim, quần short nam phản ánh sự năng động và phóng khoáng.');
INSERT INTO LoaiSanPham(TenLoaiSanPham, GioiThieu) 
VALUES('Quần kaki nam', 'Quần kaki nam là một lựa chọn đẳng cấp và lịch lãm, phản ánh sự lịch thiệp trong trang phục nam. Chế tác từ chất liệu chất lượng như cotton và twill, quần kaki nam mang lại cảm giác thoải mái và đồng thời tạo nên vẻ đẹp sang trọng.');
INSERT INTO LoaiSanPham(TenLoaiSanPham, GioiThieu) 
VALUES('Quần jean nam', 'Quần jean nam là một trang phục cơ bản và không thể thiếu trong tủ đồ của nam giới, thể hiện sự cá tính và phong cách. Chế tác từ chất liệu jean chất lượng như cotton và spandex, quần jean mang lại sự thoải mái và phản ánh phong cách đa dạng.');
INSERT INTO LoaiSanPham(TenLoaiSanPham, GioiThieu) 
VALUES('Quần tây nam', 'Quần tây nam là biểu tượng của sự lịch lãm và quý phái trong thế giới thời trang. Chế tác từ chất liệu chất lượng như wool, cotton, hoặc blend, quần tây nam mang lại cảm giác thoải mái và phong cách đẳng cấp.');
INSERT INTO LoaiSanPham(TenLoaiSanPham, GioiThieu) 
VALUES('Quần jogger nam', 'Quần jogger nam là sự kết hợp hoàn hảo giữa phong cách thể thao và sự thoải mái. Chế tác từ chất liệu như cotton và polyester, quần jogger mang lại cảm giác mềm mại và sự co dãn, phản ánh phong cách năng động và hiện đại.');

-- thêm dữ liệu cho nhà cung cấp 
insert into NhaCungCap(TenNhaCungCap,DiaChi,SoDienThoai,Email) values('Công ty may mặc','114Lê Trọng Tấn','0123456789','trongtan@gmail.com');
-- thêm dữ liệu cho liên hệ 
insert into lienhe(Email,DiaChi,SoDienThoai)
values('Mark@gmail.com','139 Lê Trọng Tấn, Phường Tây Thạnh, Quận Tân Phú','01293012390');
-- thêm dữ liệu cho nhà cung cấp
-- thêm dữ liệu cho Menu 
INSERT INTO Menu(TenMenu,Link) VALUES ('TRANG CHỦ','/');
INSERT INTO Menu(TenMenu,Link) VALUES ('SẢN PHẨM','/sanpham');
INSERT INTO Menu(TenMenu,Link) VALUES('THƯƠNG HIỆU','/thuonghieu');
INSERT INTO Menu(TenMenu,Link) VALUES ('GIỚI THIỆU','/gioithieu');
INSERT INTO Menu(TenMenu,Link) VALUES ('TIN TỨC','/tintuc');
INSERT INTO Menu(TenMenu,Link) VALUES ('LIÊN HỆ','/lienhe');

-- them du lieu cho bang Size 
INSERT INTO Size (TenSize, MoTa) VALUES ('XS', 'Extra Small shirt');
INSERT INTO Size (TenSize, MoTa) VALUES ('S', 'Small shirt');
INSERT INTO Size (TenSize, MoTa) VALUES('M', 'Medium shirt');
INSERT INTO Size (TenSize, MoTa) VALUES('L', 'Large shirt');
INSERT INTO Size (TenSize, MoTa) VALUES('XL', 'Extra Large shirt');
INSERT INTO Size (TenSize, MoTa) VALUES('28', 'Size 28 pants');
INSERT INTO Size (TenSize, MoTa) VALUES('30', 'Size 30 pants');
INSERT INTO Size (TenSize, MoTa) VALUES('32', 'Size 32 pants');
INSERT INTO Size (TenSize, MoTa) VALUES('34', 'Size 34 pants');
INSERT INTO Size (TenSize, MoTa) VALUES('36', 'Size 36 pants');

-- thêm dữ liệu cho sản phẩm 
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('ÁO THUN NAM NGẮN TAY CỔ TRỤ','ÁO THUN NAM NGẮN TAY CỔ TRỤ THUN COTTON SỌC NGANG PHỐI 2 MÀU ĐẸP MẮT<br>Chất liệu: Vải 100% thun cotton mềm mịn, 
thấm hút mồ hôi tốt','2020-12-01',1,1,'2','ao-thun-nam-ngan-tay.jpg',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('ÁO THUN NAM NGẮN TAY CỔ TRỤ','ÁO THUN NAM CỔ TRỤ NGẮN
 TAY VIỀN CỔ IN LOGO MẪU MỚI<br>Chất liệu: Vải 100% thun cotton mềm mịn,
 thấm hút mồ hôi tốt','2019-01-05',1,1,'3','ao-thun-nam-co-tru-ngan-tay.jpg',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('ÁO THUN NAM HÌNH HỔ 3D','ÁO THUN NAM HÌNH HỔ 3D: Chất vải thun 3D mịn lạnh, thấm hút mồ hôi nhanh giúp các chàng luôn thoải mái khi vận động, 
chơi các trò chơi thể thao, thể chất. Bên cạnh đó là thiết kế mạnh mẽ với hình hổ ấn tượng mang đến cho các chàng sự 
sang trọng, trẻ trung  để các chàng luôn sẵn sàng xuất hiện trước các nàng mà không lo thiếu sự thu hút.
<br>Chất liệu: VẢI THUN 3D CO GIÃN CAO CẤP','2021-05-06',1,1,'5','ao-thun-nam-hinh-ho-3d.jpg',40);
-- 03--
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('SƠ MI NAM HÀN QUỐC TRẺ TRUNG','SƠ MI NAM 
HÀN QUỐC TRẺ TRUNG: Chất vải dày dặn cao cấp, đặc biệt với những sọc nhỏ tinh tế cùng dáng áo chuẩn để các chàng 
tự tin khoe dáng. Bên cạnh đó là chất màu lên tông chuẩn để các chàng lựa chọn phong cách cho mình thật thoải 
mái. Ngoài ra, với thiết kế tay dài thanh lịch, chiếc áo sẽ là bạn đồng hành cùng các chàng trai trong những ngày 
lên công tay hay trong những buổi gặp khách hàng.<br>Chất liệu: VẢI KAKI MỀM','2018-05-05',3,3,'3','so-mi-nam-han-quoc.jpg',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('SƠ MI NAM CARO Ô LỚN','SƠ MI NAM CARO Ô LỚN: Chất vải kate 
dày dặn cao cấp, dáng áo chuẩn để các chàng tự tin khoe dáng. Bên cạnh đó là họa tiết caro ôn lớn đối xứng sang trọng 
nhưng không kém phần tươi trẻ kết hợp với thiết kế tay dài thanh lịch, chiếc áo sẽ là bạn đồng hành cùng các chàng trai 
trong những ngày lên công ty hay trong những buổi gặp khách hàng.
<br>Chất liệu: VẢI KATE DÀY MỊN','2017-04-09',3,3,'3','so-mi-nam-caro.jpg',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('ÁO SƠ MI NAM LOANG MÀU THỜI THƯỢNG','ÁO SƠ MI NAM LOANG MÀU THỜI THƯỢNG: Chất vải
 dày dặn cao cấp, dáng áo chuẩn để các chàng tự tin khoe dáng. Bên cạnh đó là chất màu lên tông chuẩn để các chàng lựa chọn 
 phong cách cho mình thật thoải mái. Ngoài ra, với thiết kế tay dài thanh lịch nhưng không mất đi sự trẻ trung pha chút nổi 
 loạn với việc kết hợp màu loang mới mẻ.<br>Chất liệu: KATE BÓNG CAO CẤP','2015-08-08',3,3,'2','ao-so-mi-nam-loang-mau.jpg',40);

-- 11--
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('QUẦN SHORT JEANS CÓ KHUY ĐỘC ĐÁO','QUẦN SHORT JEANS CÓ KHUY ĐỘC ĐÁO: Chất vải jeans cao cấp xuất khẩu vừa dày dặn, nhẹ
 mịn vừa co giãn vừa phải giúp người mang dế chịu, tự tin. Bên cạnh đó còn là thiết kế trẻ trung, năng động và đầy độc đáo với 
 khuy sản phẩm lạ mắt.<br>Chất liệu: VẢI JEANS CAO CẤP XUẤT KHẨU','2023-01-04',11,11,'6','quan-short-jeans-co-khuy.jpg',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('QUẦN ĐÙI NAM SỐ 69 CAO CẤP','QUẦN ĐÙI NAM SỐ 69 CAO CẤP: Thiết kế trẻ trung, năng động với thiết kế săn
 lai ống giúp các trai trông năng động hơn. Bên cạnh đó chất vải jenas dày dặn mang đến sự tự tin cho các chàng trong việc hoạt động vui 
 chơi mà không lo các sự cố khó xửa xảy ra.
 <br>Chất liệu: VẢI JEANS CAO CẤP XUẤT KHẨU','2023-02-01',11,11,'7','quan-dui-nam-so-69-cao-cap.jpg',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('QUẦN SHORT JEANS NAM KẾT HỢP HỌA TIẾT CHIBI','QUẦN SHORT JEANS NAM KẾT HỢP HỌA TIẾT CHIBI ĐÁNG YÊU: Chất vải 
jeans cao cấp nhập khẩu Thái Lan mang đến cho người mặc sự thoải mái và tin tưởng bởi chất vải dày dặn, mịn nhẹ. bên cạnh đó ngoài 
những nét cắt rách táo bạo là họa tiết chibi mang đến sự trẻ trung, nắng động cho người mang.<br>Chất liệu: VẢI JEANS NHẬP 
KHẨU THÁI LAN','2013-05-09',11,11,'8','quan-short-jeans-nam.jpg',40);

-- 13--
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('QUẦN JEANS NAM CAO CẤP THIẾT KẾ KẾT HỢP VẢI MẪU','QUẦN JEANS NAM CAO CẤP THIẾT KẾ KẾT HỢP VẢI 
MẪU: Chất vải cao cấp xuất khẩu dày dặn, lên form chuẩn dáng để các chàng thoải mái khoe body. Bên cạnh đó là thiết kế phong cách
 đường phố mạnh mẽ, phá cách với những nét cắt, xước táo bạo, độc đáo mà chỉ riêng sản phẩm có.
 <br>Chất liệu: VẢI JEANS NAM CAO CẤP NHẬP KHẨU','2014-07-09',13,13,'8','quan-jeans-nam-cao-cap.jpg',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('QUẦN JEANS NAM NHẤN GỐI TRÁI TINH TẾ','QUẦN JEANS NAM NHẤN GỐI TRÁI TINH TẾ: Chất vải cao cấp xuất 
khẩu dày dặn, lên form chuẩn dáng để các chàng thoải mái khoe body. Bên cạnh đó là thiết kế phong cách đường phố 
mạnh mẽ, phá cách với những nét cắt, xước táo bạo, độc đáo mà chỉ riêng sản phẩm có.
<br>Chất liệu: VẢI JEANS NHẬP KHẨU HÀN QUỐC','2012-10-10',13,13,'9','quan-jeans-nam-nhan-goi-trai.jpg',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('QUẦN JEAN NAM PHONG CÁC ĐƯỜNG PHỐ MỚI','QUẦN JEAN NAM PHONG CÁC ĐƯỜNG PHỐ MỚI: Thiết kế phá cách, theo xu hướng đường phố 
đem đến cho các chàng trai sự năng động, pha chút nổi loạn làm các chàng trai trông thật sự nổi bật cũng như tự tin thể hiện phong 
cách của bản thân trong mọi cuộc vui.
<br>Chất liệu: VẢI JEANS CAO CẤP XUẤT KHẨU','2023-01-01',13,13,'9','quan-jean-nam.jpg',40);

-- 12---
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('QUẦN KAKI LƯNG PHỐI DÂY SỌC QK005 MÀU XANH ĐEN','Sớ vải dệt xéo nổi lên khá lạ mắt tạo nên một sản phẩm dày dặn, bền bỉ và ít nhăn, chất liệu cao cấp mang đến sự thoáng mát, thấm hút mồ hôi cao.
<br>- Quần co giãn nhẹ  nhờ có thành phần spandex giúp người mặc cảm thấy thoải mái, dễ chịu hơn.
<br>- Sản phẩm được xử lý wash mềm, đốt lông nên đảm bảo hạn chế co rút, xù lông và bền màu.
<br>- Phần phối dây dệt sọc ở lưng quần làm điểm nhấn mới lạ đầy ấn tượng nhưng vẫn giữ được nét thanh lịch, thời thượng cho phái mạnh.
<br>Chất liệu: Khaki 98% cotton 2% spandex twill stretch.','2005-02-09',12,12,'7','quan-kaki-nam-lung-phoi-day-soc.png',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('QUẦN KAKI LƯNG PHỐI DÂY SỌC QK005 MÀU CÀ PHÊ','Sớ vải dệt xéo nổi lên khá lạ mắt tạo nên một sản phẩm dày dặn, bền bỉ và ít nhăn, chất liệu cao cấp mang đến sự thoáng mát, thấm hút mồ hôi cao.
<br>- Quần co giãn nhẹ  nhờ có thành phần spandex giúp người mặc cảm thấy thoải mái, dễ chịu hơn.
<br>- Sản phẩm được xử lý wash mềm, đốt lông nên đảm bảo hạn chế co rút, xù lông và bền màu.
<br>- Phần phối dây dệt sọc ở lưng quần làm điểm nhấn mới lạ đầy ấn tượng nhưng vẫn giữ được
 nét thanh lịch, thời thượng cho phái mạnh.<br>Chất liệu: Khaki 98% cotton 2% spandex twill stretch.',
 '2010-06-08',12,12,'7','quan-kaki-nam.png',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('QUẦN KAKI CÓ NẮP TÚI SAU QK003 MÀU XÁM','Mềm mại, độ bền cao, hút ẩm 
và thấm hút mồ hôi tốt. Thiết kế căn bản dễ mix&match nhiều dạng quần áo và phong cách.
<br>Chất liệu: 98% cotton, 2% spandex.','2011-10-25',12,12,'7','quan-nam-kaki-co-nap-tui-sau.png',40);

-- 14
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('QUẦN TÂY NAZAFU QT006 MÀU XANH ĐEN','Chất vải mềm mại, độ bền cao,
 hút ẩm và thấm hút mồ hôi tốt. Họa tiết kẻ caro Glen plaid rất "đa dụng", thanh nhã. 
 <br>Chất liệu: 73% polyester, 26% rayon, 1% spandex.','2012-01-02',14,14,'8','quan-tay-nazafu.png',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('QUẦN TÂY CĂN BẢN FORM SLIMFIT QT015','Quần
 slimfit tôn dáng thon gọn trong thiết kế trơn căn bản. Chất liệu thấm hút tốt, độ bền cao tạo cảm giác thoải mái cho người mặc.
 <br>Chất liệu: 68% polyester,rayon 29%, 3% spandex.','2009-08-11',14,14,'8','quan-tay-phoi-day-det.png',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('QUẦN TÂY XẾP LY FORM SLIMFIT QT007 MÀU XÁM CHUỘT ĐẬM','Chống nhăn,
 co dãn nhẹ. Thiết kế trên chất vải bóng mịn, sở hữu độ bền màu cao tạo phong thái lịch thiệp và tinh tế cho người mặc.
 <br>Chất liệu: 83% polyester, 15% rayon, 2% spandex.','2015-01-05',14,14,'8','quan-tay-xep-ly-form.png',40);

---------------------------------------------------------------------
-- 15
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('QUẦN JOGGER LƯNG THUN CÀI NÚT J004 MÀU XÁM XANH','Mềm mịn, có độ rũ nhẹ. Độ bền màu cao, 
thấm hút mồ hôi tốt. Co giãn nhẹ, hạn chế nhăn tạo cảm giác thoải mái tối đa trong mọi hoạt động<br>Chất liệu: 83% polyester,
 15% rayon, 2% spandex.','2009-01-01',15,15,'10','quan-tay-lung-thun-cai-nut.png',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('QUẦN JOGGER JEAN J13 MÀU XANH ĐEN','Đậm chất jeans nhưng là jogger 
năng động & cá tính. Jogger đơn giản với thiết kế bo lưng & bo lai mới tạo điểm nhấn cho quần luôn thoải mái, trẻ trung, 
jogger thực sự thuộc về các chàng trai ưu thích sự di chuyển.<br>Chất liệu: 98% cotton, 
2% spandex','2002-12-12',15,15,'10','quan-jogger-jean-mau-xanh-bien.jpg',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('QUẦN JOGGER TÚI ĐẮP J001 MÀU ĐEN','Co giãn vừa phải, bền màu, ít nhăn. Form 
dáng thoải mái, năng động với 2 túi đắp bên hông quần tạo phong thái trẻ trung và phóng khoáng.
<br>Chất liệu: 65% polyester, 32% rayon, 3% spandex.','2007-12-12',15,15,'10','quan-jogger-kaki-bo-lai.png',40);

-- 02--
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('ÁO THUN NỮ TRẺ TRUNG MỚI','ÁO THUN NỮ TRẺ TRUNG MỚI: Với thiết kế 
trẻ trung với viền màu nổi bật cùng hình ảnh bắt mắt bên cạnh đó là chất vải cao cấp, lên màu, lên dáng chuẩn như các cô gái muốn 
giúp các nàng luôn tự tin tỏa sáng và thoải mái khi mang dù cho là cả ngày dài hoạt động.
<br>Chất liệu: VẢI DA CÁ CAO CẤP','2012-10-04',2,2,'2','ao-thun-nu-tre-trung-moi.jpg',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('ÁO THUN NỮ HIỆN ĐẠI CAO CẤP','ÁO THUN NỮ HIỆN ĐẠI CAO CẤP: 
Thiết kế hiện đại với kiểu tay phồng nhún viền tinh tế, bắt mắt bên cạnh đó là chất vải thun dày dặn cao cấp không chỉ lên màu 
chuẩn mà còn lên dáng chuẩn như các nàng muốn giúp các nàng luôn tự tin tỏa sáng và thoải mái khi mang dù cho là cả ngày 
dài hoạt động.<br>Chất liệu: VẢI THUN CAO CẤP DÀY DẶN','2016-12-10',2,2,'2','ao-thun-nu-hien-dai-cao-cap.jpg',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('ÁO THUN NỮ SỌC MÀU NĂNG ĐỘNG','ÁO THUN NỮ SỌC MÀU NĂNG ĐỘNG: Thiết kế 
hiện đại với những sọc màu bắt mắt, sự kết hợp những màu sắc nổi bật đi cùng nhau tạo nên sự khác biệt mang phong cách Hàn Quốc bên cạnh
 đó là chất vải cao cấp, lên màu, lên dáng chuẩn như ming muốn giúp các nàng luôn tự tin tỏa sáng và thoải mái khi 
 mang dù cho là cả ngày dài hoạt động.
 <br>Chất liệu: VẢI NHŨ NHẬP KHẨU','2016-12-12',2,2,'2','ao-thun-nu-soc-mau-nang-dong.jpg',40);

-- 04--
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('SƠ MI NỮ KIỂU CỔ VUÔNG HIỆN ĐẠI','SƠ MI NỮ KIỂU CỔ VUÔNG HIỆN ĐẠI: Chất vải voan mềm mịn cùng với 
chất len gân co giãn mang đến vẻ đẹp dịu dàng nữ tính cùng sự thoải mái, dễ chịu khi hoạt động cả ngày dài. Đặc biệt là thiết 
kế hiện đại, mang nét gợi cảm giúp người mang nổi bật với nét đẹp hiện đại thời thượng.
<br>Chất liệu: VẢI VOAN 
MỀM KẾT HỢP LEN GÂN MỎNG','2010-05-05',4,4,'4','so-mi-nu-kieu-co-vuong-hien-dai.jpg',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('ÁO SƠ MI NỮ SỌC TAY LỬNG THIẾT KẾ ĐỘC ĐÁO','ÁO SƠ MI NỮ SỌC TAY LỬNG
 THIẾT KẾ ĐỘC ĐÁO: Chất liệu kate mềm mịn cao cấp thướt tha, nhẹ nhàng, dễ chịu. Kiểu dáng áo cổ bẻ, tay lửng thời trang, 
 mang nền vải sọc vân nhỏ đậm chất lịch sự cho bạn gái thêm phần trang nhã, lịch sự và đầy nữ tính. 
 Chiếc áo không chỉ thích hợp cho những ngày đến cơ quan, công sở mà còn là một sự lựa chọn 
 khá hoàn hảo cho những buổi đầu hẹn hò khi muôn xuất hiện với hình ảnh trang nhã.
 <br>Chất liệu: VẢI KATE MỀM NHẸ CAO CẤP','2010-02-27',4,4,'4','ao-so-mi-nu-soc-tay-lung.jpg',40);
insert into  SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('ÁO SƠ MI NỮ TRƠN FROM ÁO ĐỘC ĐÁO','ÁO SƠ MI NỮ TRƠN FROM ÁO ĐỘC ĐÁO: Với 
chất vải kate cao cấp mềm mịn và thoáng khí giúp người mang thoải mái khi hoạt động cả ngày dù trong thời tiết nắng nóng. Bên cạnh đó là 
from áo độc đáo mang tới vẻ đẹp cá tính, hiện đại giúp các nàng trông thật nổi 
bật trong mọi cuộc vui.<br>Chất liệu: VẢI KATE CAO CẤP','2019-03-07',4,4,'2','ao-so-mi-nu-tron-from-ao.jpg',40);


-- 05--
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('ĐẦM NỮ CỔ CHỮ U XẺ TÀ SÀNH ĐIỆU','ĐẦM NỮ CỔ CHỮ U XẺ TÀ 
SÀNH ĐIỆU: Với chất vải cao cấp nhập khẩu từ Thái Lan, vải dày dặn, thấm hút mồ hôi tốt. Bên cạnh đó thiết kế sang trọng với 
cổ chữ U và xẻ tà quyến rũ giúp người mặc trông thật trẻ trung năng động và đầy tự tin. 
<br>Chất liệu: VẢI KATE CO GIÃN NHẬP KHẨU THÁI LAN','2018-08-12',5,5,'5','dam-nu-co-chu-u-xe-ta-sanh-dieu.jpg',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('ĐẦM HOA 2 LỚP XẾP EO MS 48B8245','Đầm 2 lớp dáng
chữ A, cổ tròn. Xếp nếp ở mặt trước phần eo. Tay lỡ. Cài bằng khóa kéo ẩn sau lưng. Vải họa tiết hoa thu hút. Kiểu dáng chữ A,
 ôm nhẹ với độ dài trên gối cùng phần tay lỡ giúp che đi hầu hết các khuyết điểm cơ thể. 
 Bên cạnh đó chất liệu thô co giãn nhẹ, bền màu, ít nhăn mang lại cảm giác thoải mái khi mặc. 
 <br>Chất liệu: Thô','2006-11-12',5,5,'5','damhoa2lop.jpg',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('ĐẦM LỤA CHẤM BI 2 LỚP MS 48M4844','Đầm lụa chấm bi, cổ 
chữ V vạt trước đáp chéo được xếp nếp tinh tế, tay ngắn. Dáng ôm. Eo chiết kèm đai cùng màu. Gấu sau xẻ. Cài bằng khóa kéo ẩn 
sau lưng. Những đường xếp ly ở phần chân váy giúp che được hết những khuyết điểm của cô nàng mảnh khảnh và mang đến sự tinh
 nghịch, trẻ trung, phá cách mà không kém phần quyến rũ cho phái đẹp. 
 <br>Chất liệu: Lụa','2008-04-01',5,5,'5','damluachambi.jpg',40);

------------------------------------------------------------------
-- 06
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('Chân Váy Jean Rách','Màu sắc: Đen - Trắng. Kiểu dáng: Chất kaki jeans 
Co giãn, dày dặn, không xù lông và có thể giặt máy. Size : Size: S (dưới 45kg), M(46-50kg), L(51-55kg). Mục đích sử dụng: dạo phố. 
đi chơi, đi học hoặc đi làm','2011-10-12',6,6,'2','chan-vay-jean-rach.jpg',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('Chân Váy Jean Ngắn','Màu sắc: Đen - Trắng. 
Kiểu dáng: Chất kaki jeans Co giãn, dày dặn, không xù lông và 
có thể giặt máy. Size : Size: S (dưới 45kg), M(46-50kg), L(51-55kg). 
Mục đích sử dụng: dạo phố. đi chơi, đi học hoặc đi làm','2001-12-12',6,6,'4','chan-vay-jean-om.jpg',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('Chân Váy Xếp Ly','Những chiếc Chân Váy 
Xếp Ly mềm mại với chiều dài trên gối là lựa chọn dành riêng cho các quý cô yêu thích phong cách lãng mạn. Vì sao ư? vì chúng 
đơn giản nhưng không hề nhàm chán, kín đáo nhưng lại quyến rũ một cách lạ thường. Sự bắt cặp quá đỗi hoàn hảo này là bởi những 
đường ly thanh mảnh mềm mại đến tinh tế sẽ khiến cho các quý cô trông thật duyên dáng và chiều dài chỉ đến ngang 
bắp chân sẽ khiến cho mỗi bước đi trông thật uyển chuyển và gợi cảm. Chiếc váy chính là món đồ có thể kết hợp ăn
 ý cùng áo len chui đầu, áo phông, sơ mi dáng rộng và một đôi giày/sandals cao gót thanh mảnh.','2016-07-17',
 06,06,'1','chan-vay-xep-ly.png',40);

-- 07
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('SHORT LƯNG THUN VIỀN SỌC','Mix- Max phối cùng các kiểu áo thun thời 
trang, croptop phá cách, áo ba lỗ mát mẻ. Lưng thun dây rút tạo cảm giác thoải mái và tự tin cho người mặc. Short 
viền sọc là style đầy mới mẻ dành cho tủ đồ ngày hè của bạn gái.','2007-04-03',7,7,'7','quan-shorrt-nu-lung-thun-vien-soc.png',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('Quần Short Jean Nhung','Quần Short Jean Rách Nhung cách điệu với 
thiết kế chuẩn form co giãn, đẹp mắt, dễ thương, kiểu 
dáng đơn giản. Dáng quần vừa vặn nhiều vóc người. Có thể kết hợp cùng nhiều 
thiết kế áo kiểu khác nhau.','2016-11-12',7,7,'7','quan-shorrt-nu-lung-thun-vien-soc.png',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('Quần Short 2 Túi Lai V','Mix- Max phối cùng các kiểu áo thun 
thời trang, croptop phá cách, áo ba lỗ mát mẻ. Lưng thun dây rút tạo cảm giác thoải mái và tự tin cho người mặc. Short viền
 sọc là style đầy mới mẻ dành cho tủ đồ ngày hè của bạn gái.','2012-03-03',7,7,'7','quan-short-2-tui-lai.png',40);

-- 08--
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('QUẦN JEANS NỮ ỐNG SUÔNG CÁCH ĐIỆU CÁ TÍNH','QUẦN JEANS NỮ ỐNG SUÔNG 
CÁCH ĐIỆU CÁ TÍNH: Với những cô nàng đã cực kỳ đam mê với mẫu quần ống suông nhưng thấy nhàm chán với mẫu basic ban đầu thì chắc 
chắn sản phẩm sẽ làm các nàng hài lòng với sự nhấn nhá, cách điệu với đường cắt dứt khoác, mạnh mẽ lần lượt tại hông và 
bắp chân. Đặc biệt là ống quần với thiết kế cắt thuần túy tại nên những tua rua tự nhiên mang đến sự năng động 
cho các nàng.<br>Chất liệu: VẢI JEANS DÀY MỊN','2013-12-12',8,8,'8','quan-jeans-nu-ong-suong-cach-dieu-ca-tinh.jpg',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('QUẦN JEANS NỮ NHẤN CHỮ ĐÙI CÁ TÍNH','QUẦN JEANS NỮ NHẤN 
CHỮ ĐÙI CÁ TÍNH : Chất vải jeans cao cấp, tuyển chọn đảm bảo được form quần và màu lên chuẩn cùng với thiết kế hiện đại kèm 
theo sự trẻ trung thanh lịch để các cô gái luôn có thể tự tin diện ở mọi nơi mà không lo 
rằng sẽ không phù hợp và chắc chắn là các cô gái sẽ thật tỏa sáng, nổi bật 
với phong cách nhẹ nhàng.<br>Chất liệu: VẢI 
JEANS DÀY DẶN XUẤT KHẨU','2014-12-12',8,8,'8','quan-jeans-nu-nhan-chu-dui-ca-tinh.jpg',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('QUẦN JEANS NỮ WASH ỐNG ĐỘC ĐÁO','QUẦN JEANS NỮ
 WASH ỐNG ĐỘC ĐÁO: Chất liệu vải jeans dày dặn cao cấp, chắc chắn cho bạn yên tâm khi hoạt động mạnh, có khả năng thấm hút
 các giọt mồ hôi và co giãn tốt. Kiểu dáng thiết kế ống ôm sang trọng, khoe dáng, luôn luôn được những 
 bạn gái yêu mến trong mọi phong cách thời trang.<br>Chất liệu: VẢI JEANS
 CHẤT LIỆU CAO CẤP','2015-12-27',8,8,'8','quan-jeans-nu-wash-ong-doc-dao.jpg',40);

-- 09
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('QUẦN JOGGER DÂY KÉO NỮ XANH BIỂN','Phối quần jogger nữ 
với Áo crop top là item thời trang không thể thiếu trong tủ đồ hè của bạn gái. Chiếc áo cá tính này cũng là “người bạn thân” với
 quần jogger nữ. Cách phối đồ với quần jogger nữ và áo crop top không chỉ mang đến vẻ đẹp khoẻ khoắn, trẻ trung mà còn 
 giúp các nàng khoe khéo vòng eo “con kiến” của mình.','2019-02-11',9,9,'9','quan-jogger-day-keo-nu-xanh-than.jpg',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('QUẦN JOGGER KAKI NỮ XÁM TRẮNG','Phối quần jogger nữ 
với Áo crop top là item thời trang không thể thiếu trong tủ đồ hè của bạn gái. Chiếc áo cá tính này cũng là “người bạn thân” với quần 
jogger nữ. Cách phối đồ với quần jogger nữ và áo crop top không chỉ mang đến vẻ đẹp khoẻ khoắn, trẻ trung mà còn giúp 
các nàng khoe khéo vòng eo “con kiến” của mình.','2014-07-02',9,9,'9','quan-jogger-kaki-nu-xam-trang.jpg',40);
insert into SanPham(TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong) values('QUẦN JOGGER NỮ CÓ KHÓA GỐI KAKI ĐEN','Phối quần jogger nữ 
với Áo crop top là item thời trang không thể thiếu trong tủ đồ hè của bạn gái. Chiếc áo cá tính này cũng là
 “người bạn thân” với quần jogger nữ. Cách phối đồ với quần jogger nữ và áo crop top không 
 chỉ mang đến vẻ đẹp khoẻ khoắn, trẻ trung mà còn giúp các nàng khoe
 khéo vòng eo “con kiến” của mình.','2018-02-14',9,9,'9','quan-jogger-nu-co-khoa.jpg',40);

-- thêm dữ liệu cho bảng giá 
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (1,'2020-05-05','2025-07-07',150000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (2,'2019-01-01','2025-01-01',180000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (3,'2017-01-02','2025-05-20',190000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (4,'2014-05-05','2025-07-07',145000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (5,'2012-05-20','2025-07-30',147000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (6,'2011-04-20','2025-04-18',160000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (7,'2020-01-01','2025-12-12',157000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (8,'2014-01-01','2025-01-01',158000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (9,'2020-02-02','2025-07-07',185000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (10,'2010-02-05','2025-10-30',1250000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (11,'2009-01-05','2027-01-31',140000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (12,'2008-03-20','2027-08-05',145000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (13,'2009-03-20','2027-08-05',175000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (14,'2015-03-20','2027-08-05',177000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (15,'2016-03-20','2027-08-05',185000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (16,'2017-03-20','2025-03-05',199000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (17,'2014-03-20','2025-08-05',197000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (18,'2013-03-20','2027-08-05',191000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (19,'2012-03-20','2025-08-05',115000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (20,'2011-03-20','2025-08-05',125000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (21,'2020-03-20','2025-08-05',135000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (22,'2020-03-20','2025-08-05',185000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (23,'2016-03-20','2025-08-05',196000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (24,'2018-03-20','2025-08-05',195000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (25,'2017-03-20','2025-08-05',195000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (26,'2015-03-20','2025-08-05',195000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (27,'2014-03-20','2038-08-05',195000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (28,'2013-03-20','2039-08-05',195000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (29,'2012-03-20','2035-08-05',195000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (30,'2011-03-20','2033-08-05',195000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (31,'2018-03-20','2039-08-05',195000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (32,'2019-03-20','2025-08-05',195000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (33,'2020-03-20','2025-08-05',195000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (34,'2020-03-20','2025-08-05',195000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (35,'2018-03-20','2025-08-05',195000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (36,'2017-03-20','2025-08-05',195000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (37,'2016-03-20','2025-08-05',195000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (38,'2015-03-20','2025-08-05',195000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (39,'2015-03-20','2025-08-05',195000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (40,'2014-03-20','2026-08-05',195000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (41,'2013-03-20','2025-08-05',195000);
insert into Gia(MaSanPham,NgayBD,NgayKT,DonGia) values (42,'2011-03-20','2034-08-05',195000);

-- thêm dữ liệu cho thông số 
insert into thongso(TenThongSo,MoTa,MaSanPham) 
values('Chất liệu','Thường là cotton, polyester hoặc sự kết hợp giữa chúng để tạo ra chất liệu thoáng khí và thoải mái.',1);
insert into thongso(TenThongSo,MoTa,MaSanPham) 
values('Kiểu dáng','Ngắn tay: Với độ dài tay ngắn, thích hợp cho mùa hè hoặc khi bạn muốn thoải mái.',1);
insert into thongso(TenThongSo,MoTa,MaSanPham) 
values('Cổ trụ','Cổ thường được thiết kế dạng trụ, tạo sự thoải mái và đơn giản.',1);
insert into thongso(TenThongSo,MoTa,MaSanPham) 
values('Size','Có nhiều size khác nhau để phù hợp với người mặc từ những người có kích thước nhỏ đến lớn',1);
-- thêm dữ liệu cho bảng Ảnh 
insert into Anh(HinhAnh,TenHinhAnh) values('cm1.jpg','TRANG PHỤC NAM');
insert into Anh(HinhAnh,TenHinhAnh) values('cm3.jpg','TRANG PHỤC NỮ');
insert into Anh(HinhAnh,TenHinhAnh) values('banner-pierre-cardin.jpg','PIERRE CARDING');
insert into Anh(HinhAnh,TenHinhAnh) values('cm4crop.jpg','PHIẾU QUÀ TẶNG');

-- thêm dữ liệu cho giảm giá 
insert into GiamGia(MaSanPham,PhanTram,NgayBD,NgayKT) values(1,30,'2020-05-07','2025-10-10');
insert into GiamGia(MaSanPham,PhanTram,NgayBD,NgayKT) values(2,50,'2011-11-07','2026-01-30');
insert into GiamGia(MaSanPham,PhanTram,NgayBD,NgayKT) values(3,70,'2014-08-10','2025-11-11');
insert into GiamGia(MaSanPham,PhanTram,NgayBD,NgayKT) values(4,40,'2015-12-12','2025-10-10');
insert into GiamGia(MaSanPham,PhanTram,NgayBD,NgayKT) values(5,80,'2020-05-07','2025-12-10');
insert into GiamGia(MaSanPham,PhanTram,NgayBD,NgayKT) values(6,45,'2020-04-07','2025-10-10');
insert into GiamGia(MaSanPham,PhanTram,NgayBD,NgayKT) values(8,23,'2019-05-07','2025-10-10');
insert into GiamGia(MaSanPham,PhanTram,NgayBD,NgayKT) values(12,26,'2018-08-07','2025-10-10');
insert into GiamGia(MaSanPham,PhanTram,NgayBD,NgayKT) values(19,21,'2009-12-07','2025-10-10');
insert into GiamGia(MaSanPham,PhanTram,NgayBD,NgayKT) values(7,19,'2011-01-07','2025-10-10');
insert into GiamGia(MaSanPham,PhanTram,NgayBD,NgayKT) values(25,18,'2015-04-07','2025-10-10');
insert into GiamGia(MaSanPham,PhanTram,NgayBD,NgayKT) values(30,14,'2014-07-07','2025-10-10');
insert into GiamGia(MaSanPham,PhanTram,NgayBD,NgayKT) values(42,38,'2016-08-07','2025-10-10');
insert into GiamGia(MaSanPham,PhanTram,NgayBD,NgayKT) values(39,27,'2018-08-07','2025-10-10');
insert into GiamGia(MaSanPham,PhanTram,NgayBD,NgayKT) values(34,11,'2018-10-07','2025-10-10');
insert into GiamGia(MaSanPham,PhanTram,NgayBD,NgayKT) values(31,10,'2020-10-07','2025-10-10');

-- thêm dữ liệu cho người dùng 
insert into NguoiDung(TaiKhoan,MatKhau,Email,HoTen,NgaySinh,GioiTinh,DiaChi,SoDienThoai,AnhDaiDien,VaiTro) values('Admin','25f9e794323b453885f5181f1b624d0b','cuong31139@gmail.com','Nguyễn cuuong','2002-07-14','Nam','Thái bình ',
'0818147402','ad.jpg','Admin');
insert into NguoiDung(TaiKhoan,MatKhau,Email,HoTen,NgaySinh,GioiTinh,DiaChi,SoDienThoai,AnhDaiDien,VaiTro) values('cuongtt2002','cuongtt2002','cuong31139@gmail.com','Nguyễn Thu','2002-07-14','Nam','Thái bình ',
'0818147402','ad.jpg','Admin');
-- thêm dữ liệu cho khách hàng 
-- thêm dữ liệu cho tin tức 
INSERT INTO tintuc(TieuDe,NoiDung,NgayDang,AnhTinTuc,MaNguoiDung) VALUES ('Tin Tức về áo sơ mi trắng tay bồng Kimi AK190082','là một sản phẩm thời trang xuất sắc, chắc chắn sẽ làm hài lòng những người yêu thời trang và quan tâm đến phong cách. Với thiết kế tinh tế, chiếc áo sơ mi này mang đến sự thanh lịch và sang trọng, phản ánh đẳng cấp của người mặc.','2017-07-28 00:00:00','so-mi-cong-so-ch-nu.jpg',1);
INSERT INTO tintuc(TieuDe,NoiDung,NgayDang,AnhTinTuc,MaNguoiDung) values ('Tin tức về Áo blouse với cổ vest','Áo blouse với cổ vest là một trong những kiểu áo phù hợp với nhiều phong cách thời trang khác nhau. Các chi tiết tinh tế và độc đáo của áo blouse cùng cổ vest đã tạo ra một sự phá cách đầy tinh tế trong thời trang nữ.','2020-09-15 00:00:00','ao-blouse-voi-co-vest.jpg',1);
-- thêm dữ liệu cho ct tin tức 
INSERT INTO chitiettintuc(MaTinTuc,NoiDungChiTiet) VALUES (1,'Chất liệu vải cao cấp được sử dụng cho chiếc áo sơ mi này, không chỉ mang lại sự thoải mái khi mặc mà còn tạo nên đường may chắc chắn và bền bỉ. Sự kết hợp linh hoạt giữa cotton và polyester giúp áo có độ co giãn, phục vụ tốt cho các hoạt động hàng ngày và tạo nên hình dáng vô cùng thời trang.');
INSERT INTO chitiettintuc(MaTinTuc,NoiDungChiTiet) VALUES (1,'Điểm nổi bật của sản phẩm chính là tay áo bồng, làm tăng thêm vẻ nữ tính và duyên dáng. Được thiết kế với sự tinh tế, tay áo bồng giúp che đi nhược điểm cần được giấu kín, đồng thời tạo điểm nhấn độc đáo cho bộ trang phục.');
INSERT INTO chitiettintuc(MaTinTuc,NoiDungChiTiet) VALUES (1,'Mẫu mã của áo sơ mi trắng tay bồng Kimi AK190082 cũng là một điểm đáng chú ý. Với các đường nét tinh xảo, hài hòa, áo sơ mi này phản ánh phong cách hiện đại và đầy cá tính. Điểm nhấn màu sắc và họa tiết tinh tế giúp làm nổi bật vẻ đẹp của người mặc.');
INSERT INTO chitiettintuc(MaTinTuc,NoiDungChiTiet) VALUES (1,'Không chỉ là một chiếc áo sơ mi, Kimi AK190082 là biểu tượng cho sự phối hợp giữa chất lượng, thiết kế và xu hướng thời trang. Cho dù bạn đi làm, dự tiệc hay gặp gỡ bạn bè, chiếc áo sơ mi này sẽ là lựa chọn hoàn hảo để bạn luôn tự tin và quyến rũ.');

INSERT INTO chitiettintuc(MaTinTuc,NoiDungChiTiet) VALUES (2,'Chất liệu áo được chọn lựa cẩn thận để đảm bảo sự thoải mái và đồng thời giữ cho chiếc áo giữ được hình dáng và form dáng. Cổ vest được thêm vào tinh tế, tạo điểm nhấn độc đáo và làm nổi bật vẻ sang trọng của bộ trang phục.');
INSERT INTO chitiettintuc(MaTinTuc,NoiDungChiTiet) VALUES (2,'Kiểu dáng cổ vest thường mang lại sự chắc chắn và chuyên nghiệp, giúp bạn tỏa sáng trong mọi tình huống, từ công sở đến những sự kiện quan trọng. Áo blouse kết hợp với cổ vest không chỉ phản ánh phong cách thời trang mà còn là sự tự tin và tinh tế.');
INSERT INTO chitiettintuc(MaTinTuc,NoiDungChiTiet) VALUES (2,'Những chiếc áo như vậy thường dễ dàng kết hợp với nhiều phụ kiện khác nhau, từ chiếc quần âu, chân váy đến quần jeans, giúp bạn linh hoạt trong việc tạo nên những bộ trang phục độc đáo và phong cách.');
INSERT INTO chitiettintuc(MaTinTuc,NoiDungChiTiet) VALUES (2,'Khám phá sự hoàn hảo của áo blouse với cổ vest, nơi sự thoải mái gặp gỡ với phá cách thời trang, tạo nên một diện mạo đẳng cấp và lôi cuốn. Đừng chỉ là người mặc áo, hãy trở thành biểu tượng thời trang với chiếc áo blouse với cổ vest độc đáo này.');


-- thêm dữ liệu cho bảng tham số 
insert into thamso(TenThamSo,KyHieu,NoiDung,Anh) values('Tên website','NAME','MarkShop','');
insert into thamso(TenThamSo,KyHieu,NoiDung,Anh) values('Logo của website','LOGO','','Mark_brand.png');
insert into thamso(TenThamSo,KyHieu,NoiDung,Anh) values('Email liên hệ website','Email','Mark@gmail.com','');
insert into thamso(TenThamSo,KyHieu,NoiDung,Anh) values('Số điện thoại liên hệ website','NUMBER',' 01293012390','');
insert into thamso(TenThamSo,KyHieu,NoiDung,Anh) values('Đường dẫn backend','LINK_SERVER','https://localhost:44377','');
insert into thamso(TenThamSo,KyHieu,NoiDung,Anh) values('Địa chỉ liên hệ','ADRESS','140 Lê Trọng Tấn, Phường Tây Thạnh, Quận Tân Phú','');
-- thêm dữ liêụ cho hdn 
-- thêm dữ liệu cho ct hdn 
-- thêm dữ liệu chp dơn hàng 
/*--------------------------------------------- Các thủ tục -------------------------------------------------------*/

/*--------------------------------- Ảnh ---------------------------------------*/
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getall_Anh`()
BEGIN
  SELECT * from anh;  
END
//
DELIMITER ;
/*---------------------------------Tham số ---------------------------------------*/
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getall_ThamSo`()
BEGIN
  SELECT * from thamso;  
END
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_getbyid_ThamSo(IN p_MaThamSo INT)
BEGIN
    SELECT *
    FROM ThamSo 
    WHERE MaThamSo = p_MaThamSo;
END //
DELIMITER ;

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getbykyhieu_ThamSo`(IN p_KyHieu varchar(50))
BEGIN
    SELECT * 
		FROM thamso 
		WHERE KyHieu = p_KyHieu ;
END
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_create_ThamSo(
    IN p_TenThamSo VARCHAR(50),p_KyHieu varchar(100),
    IN p_NoiDung text , IN p_Anh longblob
)
BEGIN
    INSERT INTO thamso
    (
        TenThamSo,KyHieu,NoiDung,Anh
    )
    VALUES
    (
        p_TenThamSo,p_KyHieu,p_NoiDung,p_Anh
    );
END;
//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE sp_update_ThamSo(
    IN p_MaThamSo int ,IN p_TenThamSo VARCHAR(50),p_KyHieu varchar(100),
    IN p_NoiDung text , IN p_Anh longblob
)
BEGIN
    UPDATE thamso
    SET
        TenThamSo = IFNULL(p_TenThamSo, TenThamSo),
        KyHieu = IFNULL(p_KyHieu,KyHieu),
        NoiDung = IFNULL(p_NoiDung,NoiDung),
        Anh = ifnull(p_Anh,Anh)
    WHERE MaThamSo = p_MaThamSo;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_ThamSo(IN p_MaThamSo INT)
BEGIN
    DELETE FROM thamso
    WHERE MaThamSo = p_MaThamSo;
END;
//
DELIMITER ;
/*--------------------Liên Hệ -------------------------------*/
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getall_LienHe`(
	IN p_pageindex INT,
	IN p_pagesize INT,
    IN p_Email varchar(50),
    IN p_SoDienThoai varchar(15)
)
BEGIN
    DECLARE start_index INT;
    DECLARE total_count INT;
    
    SET start_index = (p_pageindex - 1) * p_pagesize;
    
    SELECT COUNT(*) INTO total_count FROM lienhe lh
    WHERE    (p_Email = '' OR lh.Email LIKE CONCAT('%', p_Email, '%')) AND
            (p_SoDienThoai = '' OR lh.SoDienThoai LIKE CONCAT('%', p_SoDienThoai, '%')) ;
    SELECT *, total_count AS TotalCount
    FROM lienhe lh
    WHERE    (p_Email = '' OR lh.Email LIKE CONCAT('%', p_Email, '%')) AND
            (p_SoDienThoai = '' OR lh.SoDienThoai LIKE CONCAT('%', p_SoDienThoai, '%')) 
    ORDER BY lh.MaLienHe ASC 
    LIMIT start_index, p_pagesize;
END
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_create_LienHe(
    IN p_Email VARCHAR(25),
    IN p_DiaChi varchar(30),
    IN p_SoDienThoai VARCHAR(15)
)
BEGIN
    INSERT INTO LienHe
    (
        Email,DiaChi,SoDienThoai
    )
    VALUES
    (
        p_Email,p_DiaChi,p_SoDienThoai
    );
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_LienHe(
    IN p_MaLienHe INT,
    IN p_Email VARCHAR(25),
    IN p_DiaChi longtext,
    IN p_SoDienThoai VARCHAR(15)
)
BEGIN
    UPDATE LienHe
    SET
        Email = IFNULL(p_Email, Email),
		DiaChi = IFNULL(p_DiaChi,DiaChi),
        SoDienThoai = IFNULL(p_SoDienThoai, SoDienThoai)
    WHERE MaLienHe = p_MaLienHe;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_LienHe(IN p_MaLienHe INT)
BEGIN
    DELETE FROM LienHe
    WHERE MaLienHe = p_MaLienHe;
END;
//
DELIMITER ;

/*--------------------Loại sản phẩm -------------------------------*/
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getall_LoaiSanPham`(
	IN p_pageindex INT,
	IN p_pagesize INT,
    IN p_TenLoaiSanPham varchar(50)
)
BEGIN
    DECLARE start_index INT;
    DECLARE total_count INT;
    
    SET start_index = (p_pageindex - 1) * p_pagesize;
    
    SELECT COUNT(*) INTO total_count FROM loaisanpham lsp
    WHERE    (p_TenLoaiSanPham = '' OR lsp.TenLoaiSanPham LIKE CONCAT('%', p_TenLoaiSanPham, '%')) ;
    SELECT *, total_count AS TotalCount
    FROM loaisanpham lsp
    WHERE    (p_TenLoaiSanPham = '' OR lsp.TenLoaiSanPham LIKE CONCAT('%', p_TenLoaiSanPham, '%'))
    ORDER BY lsp.MaLoaiSanPham desc
    LIMIT start_index, p_pagesize;
END
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_create_LoaiSanPham(
    IN p_TenLoaiSanPham VARCHAR(50),p_GioiThieu varchar(100) 
)
BEGIN
    INSERT INTO LoaiSanPham
    (
        TenLoaiSanPham,GioiThieu
    )
    VALUES
    (
        p_TenLoaiSanPham,p_GioiThieu
    );
END;
//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE sp_update_LoaiSanPham(
    IN p_MaLoaiSanPham INT,
    IN p_TenLoaiSanPham VARCHAR(50),
    IN p_GioiThieu varchar(100)
)
BEGIN
    UPDATE LoaiSanPham
    SET
        TenLoaiSanPham = IFNULL(p_TenLoaiSanPham, TenLoaiSanPham),
        GioiThieu = IFNULL(p_GioiThieu,GioiThieu)
    WHERE MaLoaiSanPham = p_MaLoaiSanPham;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_LoaiSanPham(IN p_MaLoaiSanPham INT)
BEGIN
    DELETE FROM LoaiSanPham
    WHERE MaLoaiSanPham = p_MaLoaiSanPham;
END;
//
DELIMITER ;

/*--------------------Menu -------------------------------*/
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getall_Menu`(
	IN p_pageindex INT,
	IN p_pagesize INT,
    IN p_ten TEXT
)
BEGIN
    DECLARE start_index INT;
    DECLARE total_count INT;
    
    SET start_index = (p_pageindex - 1) * p_pagesize;
    
    SELECT COUNT(*) INTO total_count FROM Menu WHERE TenMenu LIKE CONCAT('%', p_ten, '%');
    
    SELECT *, total_count AS TotalCount
    FROM Menu
    WHERE TenMenu LIKE CONCAT('%', p_ten, '%')
    ORDER BY MaMenu ASC 
    LIMIT start_index, p_pagesize;
END
//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE sp_create_Menu(
  IN p_TenMenu varchar(40),IN p_Link varchar(20)
)
BEGIN
  INSERT INTO menu
  (
    TenMenu,Link
  )
  VALUES
  (
    p_TenMenu,p_Link
  );
END;
//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE sp_update_Menu(
   IN p_MaMenu int,IN p_TenMenu varchar(40),IN p_Link varchar(20)
)
BEGIN
  UPDATE menu
  SET
    TenMenu = IFNULL(p_TenMenu,TenMenu),
    Link = IFNULL(p_Link,Link)
  WHERE MaMenu = p_MaMenu;
  
  SELECT '';
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_Menu
(
    IN p_MaMenu INT
)
BEGIN
    DELETE FROM  menu
    WHERE MaMenu = p_MaMenu;
END //
DELIMITER ;

/*--------------------Thương hiệu -------------------------------*/
DELIMITER  //
CREATE PROCEDURE sp_getall_ThuongHieu()
BEGIN
  SELECT * from thuonghieu;  
END ;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_create_ThuongHieu(
    IN p_TenThuongHieu VARCHAR(50),IN p_GioiThieu TEXT
)
BEGIN
    INSERT INTO ThuongHieu
        (
            TenThuongHieu,GioiThieu
        )
    VALUES
        (
            p_TenThuongHieu,p_GioiThieu
        );
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_ThuongHieu(
    IN p_MaThuongHieu INT,
    IN p_TenThuongHieu VARCHAR(50),
    IN p_GioiThieu TEXT
)
BEGIN
    UPDATE ThuongHieu
    SET
        TenThuongHieu = p_TenThuongHieu,
        GioiThieu = IFNULL(p_GioiThieu, GioiThieu)
    WHERE MaThuongHieu = p_MaThuongHieu;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_ThuongHieu(IN p_MaThuongHieu INT)
BEGIN
    DELETE FROM ThuongHieu
    WHERE MaThuongHieu = p_MaThuongHieu;
END;
//
DELIMITER ;

/*--------------------Sản Phẩm -------------------------------*/
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getbyid_SanPham`(IN p_MaSanPham INT)
BEGIN
    SELECT s.*, l.TenLoaiSanPham, t.TenThuongHieu,sz.TenSize,
    g.DonGia AS DonGia,
	gg.PhanTram AS PhanTram,
	CAST((g.DonGia - (g.DonGia / 100 * gg.PhanTram)) AS SIGNED) AS GiaMoiKhiGiam,
	(SELECT JSON_ARRAYAGG(JSON_OBJECT('TenThongSo', TSo.TenThongSo, 'MoTa', TSo.MoTa)) FROM ThongSo TSo WHERE TSo.MaSanPham = s.MaSanPham) AS listjson_thongso
    FROM SanPham s
    INNER JOIN LoaiSanPham l ON s.MaLoaiSanPham = l.MaLoaiSanPham
    INNER JOIN ThuongHieu t ON t.MaThuongHieu = s.MaThuongHieu
    LEFT JOIN Gia g ON g.MaSanPham = s.MaSanPham
    inner join Size sz on sz.MaSize = s.MaSize 
    LEFT JOIN GiamGia gg ON gg.MaSanPham = s.MaSanPham
    WHERE s.MaSanPham = p_MaSanPham
    GROUP BY
    s.MaSanPham,
    s.TenSP,
    s.AnhDaiDien,
    s.MoTa,
    G.DonGia,
    gg.PhanTram;
END
//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE `sp_lay_san_pham_moi`(IN p_SoLuong INT)
BEGIN
   SELECT s.*, l.TenLoaiSanPham, t.TenThuongHieu,sz.TenSize ,
   g.DonGia AS DonGia,
   gg.PhanTram AS PhanTram,
   CAST((g.DonGia - (g.DonGia / 100 * gg.PhanTram)) AS SIGNED) AS GiaMoiKhiGiam
   FROM SanPham s
   INNER JOIN LoaiSanPham l ON s.MaLoaiSanPham = l.MaLoaiSanPham
   INNER JOIN ThuongHieu t ON t.MaThuongHieu = s.MaThuongHieu
   LEFT JOIN Gia g ON g.MaSanPham = s.MaSanPham
   inner join Size sz on sz.MaSize = s.MaSize
   LEFT JOIN GiamGia gg ON gg.MaSanPham = s.MaSanPham
   WHERE 
    s.SoLuong != 0 and 
     (
        (gg.PhanTram IS NOT NULL AND NOW() BETWEEN gg.NgayBD AND gg.NgayKT)
        OR
        (gg.PhanTram IS NULL AND NOW() BETWEEN g.NgayBD AND g.NgayKT)
        OR
        (NOW() BETWEEN g.NgayBD AND g.NgayKT AND gg.PhanTram IS NULL)
     )
   GROUP BY
     s.MaSanPham,s.TenSP,s.MaSize,s.AnhDaiDien,s.MoTa,G.DonGia,gg.PhanTram
   ORDER BY
     s.NgayTao DESC
   LIMIT p_SoLuong;
END
//
DELIMITER ;

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_lay_san_pham_ban_chay`(IN p_SoLuong INT)
BEGIN
  SELECT
    s.MaSanPham,s.TenSP,s.MaSize,s.AnhDaiDien,s.MoTa,g.DonGia AS DonGia,gg.PhanTram AS PhanTram,SUM(CT.soluong) AS SoLuong,
	CAST((g.DonGia - (g.DonGia / 100 * gg.PhanTram)) AS SIGNED) AS GiaMoiKhiGiam
    FROM SanPham s
	INNER JOIN Gia G ON G.MaSanPham = s.MaSanPham
    LEFT JOIN GiamGia GG ON GG.MaSanPham = s.MaSanPham
    INNER JOIN ChiTietDonHang CT ON CT.MaSanPham = s.MaSanPham
    INNER JOIN donhang dh on dh.MaDonHang = CT.MaDonHang
    WHERE 
    dh.NgayDat >= NOW() - INTERVAL 30 DAY AND  dh.TinhTrang = 1 AND 
     (
        (gg.PhanTram IS NOT NULL AND NOW() BETWEEN gg.NgayBD AND gg.NgayKT)
        OR
        (gg.PhanTram IS NULL AND NOW() BETWEEN G.NgayBD AND G.NgayKT)
        OR
        (NOW() BETWEEN G.NgayBD AND G.NgayKT AND gg.PhanTram IS NULL)
     )
  GROUP BY
    s.MaSanPham,s.TenSP,s.MaSize,s.AnhDaiDien,s.MoTa,G.DonGia,gg.PhanTram
  ORDER BY
    SoLuong DESC
  LIMIT
    p_SoLuong;
END
//
DELIMITER ;


DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_lay_san_pham_giam_gia`(IN p_SoLuong INT)
BEGIN
  SELECT
    s.MaSanPham,
    s.TenSP,
    s.AnhDaiDien,
    g.DonGia AS DonGia,
    sz.TenSize,
    l.TenLoaiSanPham, t.TenThuongHieu,
	gg.PhanTram AS PhanTram,
	s.SoLuong,
	CAST((g.DonGia - (g.DonGia / 100 * gg.PhanTram)) AS SIGNED) AS GiaMoiKhiGiam
  FROM
    SanPham s
    INNER JOIN Gia G ON G.MaSanPham = s.MaSanPham
    inner JOIN GiamGia GG ON GG.MaSanPham = s.MaSanPham
    inner join Size sz on sz.MaSize = s.MaSize 
    INNER JOIN LoaiSanPham l ON s.MaLoaiSanPham = l.MaLoaiSanPham
   INNER JOIN ThuongHieu t ON t.MaThuongHieu = s.MaThuongHieu
  WHERE
    s.SoLuong != 0 AND 
    NOW() BETWEEN gg.NgayBD AND gg.NgayKT
  GROUP BY
    s.MaSanPham,s.TenSP,S.MaSize,s.AnhDaiDien,G.DonGia,gg.PhanTram,s.SoLuong
  ORDER BY
    gg.PhanTram DESC
  LIMIT
    p_SoLuong;
END
//
DELIMITER ;

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getall_SanPham`(
    IN p_pageindex INT,
    IN p_pagesize INT,
    IN p_TenSP text 
)
BEGIN
    DECLARE start_index INT;
    DECLARE total_count INT;
    
    SET start_index = (p_pageindex - 1) * p_pagesize;
    
    SELECT COUNT(*) INTO total_count FROM sanpham WHERE TenSP LIKE CONCAT('%', p_TenSP, '%');
    
    SELECT total_count AS TotalCount,
            s.MaSanPham,s.TenSP,s.MoTa,s.AnhDaiDien,t.TenThuongHieu,l.TenLoaiSanPham,g.DonGia AS DonGia,
            gg.PhanTram AS PhanTram,sz.MaSize,sz.TenSize,s.MaThuongHieu,s.MaLoaiSanPham,
            CAST((g.DonGia - (g.DonGia / 100 * gg.PhanTram)) AS SIGNED) AS GiaMoiKhiGiam
        FROM SanPham AS s
        INNER JOIN Gia g ON s.MaSanPham = g.MaSanPham
        INNER JOIN ThuongHieu t ON s.MaThuongHieu = t.MaThuongHieu
        INNER JOIN LoaiSanPham l ON s.MaLoaiSanPham = l.MaLoaiSanPham
        inner join Size sz on sz.MaSize = s.MaSize
        LEFT JOIN GiamGia gg ON s.MaSanPham = gg.MaSanPham
        WHERE s.TenSP LIKE CONCAT('%', p_TenSP, '%')
        ORDER BY s.MaSanPham DESC 
        LIMIT start_index, p_pagesize;
END//
DELIMITER ;


DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_search_SanPham`(
     IN p_pageindex INT,
     IN p_pagesize INT,
    IN p_MaSanPham INT,
    IN p_TenSP VARCHAR(255),
    IN p_TenThuongHieu VARCHAR(255),
    IN p_TenLoaiSanPham VARCHAR(255),
    IN p_MinGia INT,
    IN p_MaxGia INT,
    IN p_MaThuongHieu INT,
    IN p_MaLoaiSanPham INT
)
BEGIN
    DECLARE start_index INT;
    DECLARE total_count INT;
    SET start_index = (p_pageindex - 1) * p_pagesize;

    SELECT COUNT(DISTINCT s.MaSanPham) INTO total_count  
    FROM SanPham AS s
    INNER JOIN Gia AS g ON s.MaSanPham = g.MaSanPham
    INNER JOIN ThuongHieu AS t ON s.MaThuongHieu = t.MaThuongHieu
    INNER JOIN LoaiSanPham AS l ON s.MaLoaiSanPham = l.MaLoaiSanPham
    LEFT JOIN GiamGia AS gg ON s.MaSanPham = gg.MaSanPham 
    WHERE 
    (
        (p_MaSanPham IS NULL OR s.MaSanPham = p_MaSanPham) AND
        (p_MaLoaiSanPham IS NULL OR s.MaLoaiSanPham = p_MaLoaiSanPham) AND
        (p_MaThuongHieu IS NULL OR s.MaThuongHieu = p_MaThuongHieu) AND
        (p_TenSP = '' OR s.TenSP LIKE CONCAT('%', p_TenSP, '%')) AND
        (p_TenThuongHieu = '' OR t.TenThuongHieu LIKE CONCAT('%', p_TenThuongHieu, '%')) AND
        (p_TenLoaiSanPham = '' OR l.TenLoaiSanPham LIKE CONCAT('%', p_TenLoaiSanPham, '%')) AND
        (
            (p_MinGia IS NULL AND p_MaxGia IS NULL)
            OR 
            (
                p_MinGia IS NOT NULL 
                AND p_MaxGia IS NULL 
                AND IF(gg.PhanTram IS NULL, g.DonGia, CAST(( g.DonGia - ( g.DonGia / 100 * gg.PhanTram)) AS SIGNED)) >= p_MinGia
            )
            OR (
                p_MinGia IS NULL 
                AND p_MaxGia IS NOT NULL 
                AND IF(gg.PhanTram IS NULL, g.DonGia, CAST(( g.DonGia - ( g.DonGia / 100 * gg.PhanTram)) AS SIGNED))  <= p_MaxGia
            )
            OR (
                p_MinGia IS NOT NULL 
                AND p_MaxGia IS NOT NULL 
                AND IF(gg.PhanTram IS NULL, g.DonGia, CAST(( g.DonGia - ( g.DonGia / 100 * gg.PhanTram)) AS SIGNED))  BETWEEN p_MinGia AND p_MaxGia
            )
        ) AND 
        (
            (gg.PhanTram IS NOT NULL AND NOW() BETWEEN gg.NgayBD AND gg.NgayKT)
            OR
            (gg.PhanTram IS NULL AND NOW() BETWEEN g.NgayBD AND g.NgayKT)
			OR
            (NOW() BETWEEN g.NgayBD AND g.NgayKT AND gg.PhanTram IS NULL)
        )
    );

    SELECT total_count AS TotalCount,
            s.MaSanPham,
        s.TenSP,
        s.AnhDaiDien,
        t.TenThuongHieu,
        l.TenLoaiSanPham,
        g.DonGia AS DonGia, 
        gg.PhanTram AS PhanTram,
        s.SoLuong, 
        CAST(( g.DonGia - ( g.DonGia / 100 * gg.PhanTram)) AS SIGNED) AS GiaMoiKhiGiam
    FROM SanPham AS s
    INNER JOIN Gia AS g ON s.MaSanPham = g.MaSanPham
    INNER JOIN ThuongHieu AS t ON s.MaThuongHieu = t.MaThuongHieu
    INNER JOIN LoaiSanPham AS l ON s.MaLoaiSanPham = l.MaLoaiSanPham
    LEFT JOIN GiamGia AS gg ON s.MaSanPham = gg.MaSanPham
    WHERE
    (
        (p_MaSanPham IS NULL OR s.MaSanPham = p_MaSanPham) AND
        (p_MaLoaiSanPham IS NULL OR s.MaLoaiSanPham = p_MaLoaiSanPham) AND
        (p_MaThuongHieu IS NULL OR s.MaThuongHieu = p_MaThuongHieu) AND
        (p_TenSP = '' OR s.TenSP LIKE CONCAT('%', p_TenSP, '%')) AND
        (p_TenThuongHieu = '' OR t.TenThuongHieu LIKE CONCAT('%', p_TenThuongHieu, '%')) AND
        (p_TenLoaiSanPham = '' OR l.TenLoaiSanPham LIKE CONCAT('%', p_TenLoaiSanPham, '%')) AND
        (
            (p_MinGia IS NULL AND p_MaxGia IS NULL)
            OR 
            (
                p_MinGia IS NOT NULL 
                AND p_MaxGia IS NULL 
                AND IF(gg.PhanTram IS NULL, g.DonGia, CAST(( g.DonGia - ( g.DonGia / 100 * gg.PhanTram)) AS SIGNED)) >= p_MinGia
            )
            OR (
                p_MinGia IS NULL 
                AND p_MaxGia IS NOT NULL 
                AND IF(gg.PhanTram IS NULL, g.DonGia, CAST(( g.DonGia - ( g.DonGia / 100 * gg.PhanTram)) AS SIGNED))  <= p_MaxGia
            )
            OR (
                p_MinGia IS NOT NULL 
                AND p_MaxGia IS NOT NULL 
                AND IF(gg.PhanTram IS NULL, g.DonGia, CAST((g.DonGia - ( g.DonGia / 100 * gg.PhanTram)) AS SIGNED))  BETWEEN p_MinGia AND p_MaxGia
            )
        ) AND 
        (
            (gg.PhanTram IS NOT NULL AND NOW() BETWEEN gg.NgayBD AND gg.NgayKT)
            OR
            (gg.PhanTram IS NULL AND NOW() BETWEEN g.NgayBD AND g.NgayKT)
            OR
            (NOW() BETWEEN g.NgayBD AND g.NgayKT AND gg.PhanTram IS NULL)
        )
    )
    GROUP BY s.MaSanPham, s.TenSP, s.AnhDaiDien, t.TenThuongHieu, l.TenLoaiSanPham, g.DonGia, gg.PhanTram, s.SoLuong
    LIMIT start_index, p_pagesize;
END//
DELIMITER ;


DELIMITER //
create procedure sp_get_SanPham_cungloai (
	IN p_MaSanPham int ,
    IN p_MaLoaiSanPham int 
)
BEGIN
	 SELECT s.*, l.TenLoaiSanPham, t.TenThuongHieu,sz.TenSize ,
   g.DonGia AS DonGia,
   gg.PhanTram AS PhanTram,
   CAST((g.DonGia - (g.DonGia / 100 * gg.PhanTram)) AS SIGNED) AS GiaMoiKhiGiam
   FROM SanPham s
   INNER JOIN LoaiSanPham l ON s.MaLoaiSanPham = l.MaLoaiSanPham
   INNER JOIN ThuongHieu t ON t.MaThuongHieu = s.MaThuongHieu
   LEFT JOIN Gia g ON g.MaSanPham = s.MaSanPham
   inner join Size sz on sz.MaSize = s.MaSize
   LEFT JOIN GiamGia gg ON gg.MaSanPham = s.MaSanPham
   WHERE 
       s.MaSanPham != p_MaSanPham  And l.MaLoaiSanPham = p_MaLoaiSanPham And 
     (
        (gg.PhanTram IS NOT NULL AND NOW() BETWEEN gg.NgayBD AND gg.NgayKT)
        OR
        (gg.PhanTram IS NULL AND NOW() BETWEEN g.NgayBD AND g.NgayKT)
        OR
        (NOW() BETWEEN g.NgayBD AND g.NgayKT AND gg.PhanTram IS NULL)
     )
   GROUP BY
     s.MaSanPham,s.TenSP,s.MaSize,s.AnhDaiDien,s.SoLuong,s.MoTa,G.DonGia,gg.PhanTram;
END
//
DELIMITER ;

DELIMITER //
create procedure sp_getnew_SanPham()
begin 
	select sp.MaSanPham from sanpham sp order by sp.MaSanPham desc
    limit 1;
END;
//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE sp_create_SanPham(
	IN p_TenSP varchar(20),
    IN p_MoTa longtext,
    IN p_MaLoaiSanPham int,
    IN p_MaThuongHieu int,
    IN p_MaSize int,
	IN p_AnhDaiDien longblob
)
BEGIN
    INSERT INTO SanPham
    (
        TenSP,MoTa,NgayTao,MaLoaiSanPham,MaThuongHieu,MaSize,AnhDaiDien,SoLuong 
    )
    VALUES
    (
        p_TenSP,p_MoTa,now(),p_MaLoaiSanPham,p_MaThuongHieu,p_MaSize,p_AnhDaiDien,0
    );
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_SanPham(
    IN p_MaSanPham int ,
    IN p_TenSP text,
	IN p_MoTa longtext,
    IN p_MaLoaiSanPham int,
    IN p_MaThuongHieu int,
	IN p_MaSize int,
	IN p_AnhDaiDien longblob,
    IN p_SoLuong int 
)
BEGIN
    UPDATE SanPham
    SET
		TenSP = ifnull(p_TenSP,TenSP),
		MoTa = IFNULL(p_MoTa,MoTa),
        MaLoaiSanPham = IFNULL(p_MaLoaiSanPham,MaLoaiSanPham),
		MaThuongHieu = IFNULL(p_MaThuongHieu,MaThuongHieu),
        MaSize = IFNULL(p_MaSize,MaSize),
        AnhDaiDien = IFNULL(p_AnhDaiDien,AnhDaiDien),
        SoLuong = IFNULL(p_SoLuong,SoLuong)
     WHERE MaSanPham = p_MaSanPham;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_SanPham(IN p_MaSanPham INT)
BEGIN
    DELETE FROM SanPham
     WHERE MaSanPham = p_MaSanPham;
END;
//
DELIMITER ;

/*--------------------Thông Số -------------------------------*/
DELIMITER  //
CREATE PROCEDURE sp_getall_ThongSo()
BEGIN
  SELECT ts.* ,sp.TenSP from thongso ts inner join sanpham sp
  on ts.MaSanPham = sp.MaSanPham ;  
END ;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_create_ThongSo(
  IN p_TenThongSo varchar(20),IN p_MoTa varchar(100),IN p_MaSanPham int 
)
BEGIN
  INSERT INTO thongso
  (
    TenThongSo,MoTa,MaSanPham
  )
  VALUES
  (
    p_TenThongSo,p_MoTa,p_MaSanPham
  );
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_ThongSo(
  IN p_MaThongSo int,IN p_TenThongSo varchar(20),IN p_MoTa varchar(100),IN p_MaSanPham int 
)
BEGIN
  UPDATE thongso
  SET
    TenThongSo = IFNULL(p_TenThongSo,TenThongSo),
    MoTa = IFNULL(p_MoTa,MoTa),
    MaSanPham = IFNULL(p_MaSanPham, MaSanPham)
  WHERE MaThongSo = p_MaThongSo;
  
  SELECT '';
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE sp_delete_ThongSo
(
    IN p_MaThongSo INT
)
BEGIN
    DELETE FROM  thongso
    WHERE MaThongSo = p_MaThongSo;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_ThongSo_by_SanPham( IN p_MaSanPham INT)
BEGIN
    select ts.*  from thongso ts 
    where ts.MaSanPham = p_MaSanPham;
END //
DELIMITER ;

/*--------------------Giới thiệu -------------------------------*/
DELIMITER //
CREATE PROCEDURE sp_getbyid_GioiThieu(IN p_MaGioiThieu INT)
BEGIN
    SELECT *
    FROM GioiThieu gt
    WHERE gt.MaGioiThieu = p_MaGioiThieu;
END //
DELIMITER ;

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getall_GioiThieu`()
BEGIN
  SELECT * from gioithieu;  
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_create_GioiThieu(
  IN p_TieuDe VARCHAR(50),
  IN p_NoiDung longtext,
  IN p_HinhAnh longblob
)
BEGIN
  INSERT INTO GioiThieu
  (
    TieuDe,
    NoiDung,
    HinhAnh
  )
  VALUES
  (
    p_TieuDe,
    p_NoiDung,
    p_HinhAnh
  );
END;
//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE sp_update_GioiThieu(
  IN p_MaGioiThieu INT,
  IN p_TieuDe VARCHAR(50),
  IN p_NoiDung longtext,
  IN p_HinhAnh longblob
)
BEGIN
  UPDATE gioithieu
  SET
    TieuDe = IFNULL(p_TieuDe, TieuDe),
    NoiDung = IFNULL(p_NoiDung, NoiDung),
    HinhAnh = IFNULL(p_HinhAnh,HinhAnh)
  WHERE MaGioiThieu = p_MaGioiThieu;
  
  SELECT '';
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_GioiThieu
(
    IN p_MaGioiThieu INT
)
BEGIN
    DELETE FROM GioiThieu
    WHERE MaGioiThieu = p_MaGioiThieu;
END //
DELIMITER ;

/*--------------------Giá-------------------------------*/
DELIMITER  //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getall_Gia`(
    IN p_pageindex INT,
    IN p_pagesize INT
)
BEGIN
    DECLARE start_index INT;DECLARE total_count INT;
    SET start_index = (p_pageindex - 1) * p_pagesize;
    SELECT COUNT(*) INTO total_count FROM gia; -- Added semicolon here
    SELECT total_count AS TotalCount, gg.*,sp.TenSP
    FROM gia g inner join sanpham sp on g.MaSanPham = sp.MaSanPham 
	LIMIT start_index, p_pagesize;
END
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_create_Gia(
    IN p_MaSanPham int ,IN p_NgayBD datetime , IN p_NgayKT datetime ,
    IN p_DonGia int 
)
BEGIN
    INSERT INTO gia
        (
            MaSanPham,NgayBD,NgayKT,DonGia
        )
    VALUES
        (
            p_MaSanPham,p_NgayBD ,p_NgayKT , p_DonGia
        );
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_Gia( IN p_MaGia int ,
     IN p_MaSanPham int ,IN p_NgayBD datetime ,
     IN p_NgayKT datetime ,IN p_DonGia int 
)
BEGIN
    UPDATE gia
    SET
        MaSanPham = IFNULL(p_MaSanPham,MaSanPham),
        NgayBD = IFNULL(p_NgayBD,NgayBD),
		NgayKT = IFNULL( p_NgayKT,NgayKT),
        DonGia = IFNULL(p_DonGia,DonGia)
    WHERE MaGia = p_MaGia;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_Gia(IN p_MaGia INT)
BEGIN
    DELETE FROM gia
    WHERE MaGia = p_MaGia;
END;
//
DELIMITER ;


DELIMITER //
create procedure sp_get_Gia_by_SanPham(IN p_MaSanPham int)
begin 
	select g.* ,sp.TenSP from gia g
    inner join sanpham sp on sp.MaSanPham = g.MaSanPham 
    where g.MaSanPham = p_MaSanPham ;
END;
//
DELIMITER ;
/*--------------------Nhà cung cấp-------------------------------*/
DELIMITER  //
CREATE PROCEDURE sp_getall_NhaCungCap()
BEGIN
  SELECT * from nhacungcap;  
END ;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_create_NhaCungCap(
	IN p_TenNhaCungCap varchar(20),
    IN p_DiaChi varchar(30),
    IN p_SoDienThoai VARCHAR(15),
	IN p_Email VARCHAR(25)
)
BEGIN
    INSERT INTO nhacungcap
    (
        TenNhaCungCap,DiaChi,SoDienThoai,Email
    )
    VALUES
    (
        p_TenNhaCungCap,p_DiaChi,p_SoDienThoai,p_Email
    );
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_NhaCungCap(
    IN p_MaNhaCungCap int ,
    IN p_TenNhaCungCap varchar(20),
    IN p_DiaChi varchar(30),
    IN p_SoDienThoai VARCHAR(15),
	IN p_Email VARCHAR(25)
)
BEGIN
    UPDATE nhacungcap
    SET
		TenNhaCungCap = IFNULL(p_TenNhaCungCap,TenNhaCungCap),
		DiaChi = IFNULL(p_DiaChi,DiaChi),
        SoDienThoai = IFNULL(p_SoDienThoai, SoDienThoai),
         Email = IFNULL(p_Email, Email)
     WHERE MaNhaCungCap = p_MaNhaCungCap;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_NhaCungCap(IN p_MaNhaCungCap INT)
BEGIN
    DELETE FROM nhacungcap
     WHERE MaNhaCungCap = p_MaNhaCungCap;
END;
//
DELIMITER ;

/*--------------------Giảm giá  -------------------------------*/
DELIMITER  //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getall_GiamGia`(
    IN p_pageindex INT,
    IN p_pagesize INT
)
BEGIN
    DECLARE start_index INT;DECLARE total_count INT;
    SET start_index = (p_pageindex - 1) * p_pagesize;
    SELECT COUNT(*) INTO total_count FROM giamgia; -- Added semicolon here
    SELECT total_count AS TotalCount, gg.*,sp.TenSP
    FROM giamgia gg inner join sanpham sp on gg.MaSanPham = sp.MaSanPham 
	LIMIT start_index, p_pagesize;
END
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_create_GiamGia(
    IN p_MaSanPham int ,IN p_PhanTram int , IN p_NgayBD date ,IN  p_NgayKT date
)
BEGIN
    INSERT INTO giamgia
        (
            MaSanPham,PhanTram,NgayBD ,NgayKT
        )
    VALUES
        (
            p_MaSanPham,p_PhanTram,p_NgayBD,p_NgayKT
        );
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_GiamGia(
     IN p_MaGiamGia int ,IN p_MaSanPham int ,IN p_PhanTram int , IN p_NgayBD date ,IN  p_NgayKT date
)
BEGIN
    UPDATE giamgia
    SET
        MaSanPham = IFNULL(p_MaSanPham, MaSanPham),
        PhanTram = IFNULL(p_PhanTram, PhanTram),
        NgayBD =IFNULL(p_NgayBD,NgayBD),
        NgayKT =IFNULL(p_NgayKT,NgayKT)
    WHERE MaGiamGia = p_MaGiamGia;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_GiamGia(IN p_MaGiamGia INT)
BEGIN
    DELETE FROM giamgia
    WHERE MaGiamGia = p_MaGiamGia;
END;
//
DELIMITER ;


DELIMITER //
create procedure sp_get_GiamGia_by_SanPham(IN p_MaSanPham int)
begin 
	select gg.* ,sp.TenSP from giamgia gg
    inner join sanpham sp on sp.MaSanPham = gg.MaSanPham 
    where gg.MaSanPham = p_MaSanPham ;
END;
//
DELIMITER ;



/*--------------------Size-------------------------------*/
DELIMITER  //
CREATE PROCEDURE sp_getall_Size()
BEGIN
  SELECT * from size;  
END ;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_create_Size(
    IN p_TenSize VARCHAR(50),IN p_MoTa TEXT
)
BEGIN
    INSERT INTO Size
        (
            TenSize,MoTa
        )
    VALUES
        (
            p_TenSize,p_MoTa
        );
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_Size(
    IN p_MaSize INT,IN p_TenSize VARCHAR(100),IN p_MoTa TEXT
)
BEGIN
    UPDATE Size
    SET
        TenSize = p_TenSize,
        MoTa = IFNULL(p_MoTa, MoTa)
    WHERE MaSize = p_MaSize;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_Size(IN p_MaSize INT)
BEGIN
    DELETE FROM Size
    WHERE MaSize = p_MaSize;
END;
//
DELIMITER ;
/*--------------------Slide -------------------------------*/
DELIMITER //
create procedure sp_getall_Slide()
begin 
	select * from slide ;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_getbyid_Slide(IN p_MaSlide INT)
BEGIN
    SELECT *
    FROM Slide
    WHERE MaSlide = p_MaSlide;
END;
//
DELIMITER ;

DELIMITER //
create procedure sp_create_Slide(IN p_Anh longblob)
begin
	insert into Slide(Anh)values(p_Anh);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_Slide(
     IN p_MaSlide int ,IN p_Anh longblob
)
BEGIN
    UPDATE slide 
    SET
        Anh = IFNULL(p_Anh,Anh)
    WHERE MaSlide = p_MaSlide;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_Slide(IN p_MaSlide INT)
BEGIN
    DELETE FROM Slide
    WHERE MaSlide = p_MaSlide;
END;
//
DELIMITER ;

/*--------------------Tin tức -------------------------------*/
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getall_TinTuc`(
    IN p_pageindex INT,
    IN p_pagesize INT
)
BEGIN
    DECLARE TotalCount INT;
    DECLARE offset_value INT;

    IF p_pagesize <> 0 THEN
        SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';
        SET offset_value = (p_pageindex - 1) * p_pagesize;
        DROP TEMPORARY TABLE IF EXISTS Results1;
        CREATE TEMPORARY TABLE Results1 AS
        SELECT 
          tt.*,nd.HoTen from tintuc as tt inner join nguoidung as nd 
          on tt.MaNguoiDung = nd.MaNguoiDung;
        SELECT COUNT(*) INTO TotalCount FROM Results1;
        SELECT TotalCount , r1.* FROM Results1 r1;
        DROP TEMPORARY TABLE IF EXISTS Results1;
    ELSE
        SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';
        SET offset_value = (p_pageindex - 1) * p_pagesize;
        DROP TEMPORARY TABLE IF EXISTS Results2;
        CREATE TEMPORARY TABLE Results2 AS
        SELECT 
             tt.*,nd.HoTen from tintuc as tt inner join nguoidung as nd 
          on tt.MaNguoiDung = nd.MaNguoiDung;
        SELECT COUNT(*) INTO TotalCount FROM Results2;
        SELECT  TotalCount,r2.* FROM Results2 r2;
        DROP TEMPORARY TABLE IF EXISTS Results2;
    END IF;
END//
DELIMITER ;


DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getbyid_TinTuc`(IN p_MaTinTuc INT)
BEGIN
  SELECT
    t.*,
    nd.HoTen,
    (
      SELECT JSON_ARRAYAGG(JSON_OBJECT('NoiDungChiTiet', ct.NoiDungChiTiet))
      FROM ChiTietTinTuc ct
      WHERE ct.MaTinTuc = t.MaTinTuc
    ) AS listjson_NoiDungCT
  FROM
    TinTuc t
    INNER JOIN NguoiDung nd ON nd.MaNguoiDung = t.MaNguoiDung
  WHERE
    t.MaTinTuc = p_MaTinTuc
  GROUP BY
    t.MaTinTuc;
END
//
DELIMITER ;

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_TinTucKhac`(IN p_MaTinTuc INT)
BEGIN
  SELECT
    t.*
  FROM
    TinTuc t
  WHERE
    t.MaTinTuc != p_MaTinTuc
  GROUP BY
    t.MaTinTuc
  LIMIT 5;
END
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_create_TinTuc(
  IN p_TieuDe VARCHAR(50),
  IN p_NoiDung TEXT,
  IN p_AnhTinTuc longblob,
  IN p_MaNguoiDung int 
)
BEGIN
  INSERT INTO  tintuc
  (
    TieuDe,NoiDung,NgayDang,AnhTinTuc,MaNguoiDung
  )
  VALUES
  (
    p_TieuDe,p_NoiDung,now(),p_AnhTinTuc,p_MaNguoiDung
  );
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_TinTuc(IN p_MaTinTuc INT, 
                                   IN p_TieuDe VARCHAR(255), 
                                   IN p_NoiDung TEXT,
                                   IN p_AnhTinTuc longblob, 
                                   IN p_MaNguoiDung INT)
BEGIN
    UPDATE TinTuc
    SET 
        TieuDe = IFNULL(p_TieuDe, TieuDe),
        NoiDung = IFNULL(p_NoiDung, NoiDung),
        AnhTinTuc = IFNULL(p_AnhTinTuc, AnhTinTuc),
        MaNguoiDung = IFNULL(p_MaNguoiDung, MaNguoiDung)
    WHERE MaTinTuc = p_MaTinTuc;

    SELECT '';
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_TinTuc
(
    IN p_MaTỉnTuc INT
)
BEGIN
    DELETE FROM tintuc
    WHERE MaTinTuc = p_MaTinTuc;
END //
DELIMITER ;

/*--------------------chi tiết tin tức -------------------------------*/
DELIMITER  //
CREATE PROCEDURE sp_getall_CTTinTuc()
BEGIN
  SELECT cttt.*,tt.TieuDe from chitiettintuc cttt
  inner join tintuc tt on cttt.MaTinTuc = tt.MaTinTuc;  
END ;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_getbyid_CTTinTuc(IN p_MaChiTiet INT)
BEGIN
    SELECT cttt.*,tt.TieuDe from chitiettintuc cttt
    inner join tintuc tt on cttt.MaTinTuc = tt.MaTinTuc
    WHERE cttt.MaChiTiet = p_MaChiTiet;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_create_CTTinTuc(
    IN p_MaTinTuc int,
    IN p_NoiDung varchar(200)
)
BEGIN
    INSERT INTO chitiettintuc
    (
        MaTinTuc,NoiDungChiTiet
    )
    VALUES
    (
        p_MaTinTuc,p_NoiDung
    );
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_CTTinTuc(
    IN p_MaChiTiet INT,
	IN p_MaTinTuc int,
    IN p_NoiDung varchar(200)
)
BEGIN
    UPDATE chitiettintuc
    SET
        MaTinTuc = IFNULL(p_MaTinTuc,MaTinTuc),
		NoiDungChiTiet = IFNULL(p_NoiDung,NoiDungChiTiet)
    WHERE MaChiTiet = p_MaChiTiet;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_CTTinTuc(IN p_MaChiTiet INT)
BEGIN
    DELETE FROM chitiettintuc
    WHERE MaChiTiet = p_MaChiTiet;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_CTTinTuc_by_TinTuc(IN p_MaTinTuc INT)
BEGIN
    select cttt.* ,tt.TieuDe ,nd.HoTen
    From chitiettintuc cttt
    INNER join tintuc tt on cttt.MaTinTuc = tt.MaTinTuc 
    inner join nguoidung nd on nd.MaNguoiDung = tt.MaNguoiDung
    where cttt.MaTinTuc =p_MaTinTuc;
END;
//
DELIMITER ;

/*--------------------Người dùng -------------------------------*/
DELIMITER  //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getall_NguoiDung`(
	IN p_pageindex INT,
    IN p_pagesize INT
)
BEGIN
    DECLARE start_index INT;
    DECLARE total_count INT;
    
    SET start_index = (p_pageindex - 1) * p_pagesize;
    
    SELECT COUNT(*) INTO total_count FROM NguoiDung ;
    
    SELECT *, total_count AS TotalCount
    FROM NguoiDung
    ORDER BY MaNguoiDung DESC
    LIMIT start_index, p_pagesize;
END
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_getbyid_NguoiDung(IN p_MaNguoiDung INT)
BEGIN
    SELECT * from nguoidung nd 
    WHERE nd.MaNguoiDung = p_MaNguoiDung;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_create_NguoiDung(
  IN p_TaiKhoan VARCHAR(55),IN p_MatKhau VARCHAR(500),IN p_Email VARCHAR(25),IN p_HoTen VARCHAR(50),IN p_NgaySinh DATETIME,IN p_GioiTinh VARCHAR(10)
  ,IN p_DiaChi VARCHAR(35),IN p_SoDienThoai VARCHAR(15),IN p_AnhDaiDien longblob,IN p_VaiTro varchar(50),IN p_ToKen text 
)
BEGIN
  INSERT INTO NguoiDung
  (
    TaiKhoan,MatKhau,Email,HoTen,NgaySinh,GioiTinh,DiaChi,SoDienThoai,AnhDaiDien,VaiTro,EmailConfirmed,ToKen
  )
  VALUES
  (
    p_TaiKhoan,p_MatKhau,p_Email,p_HoTen,p_NgaySinh,p_GioiTinh,p_DiaChi,p_SoDienThoai,p_AnhDaiDien,p_VaiTro,0,p_ToKen
  );
END //
DELIMITER ;

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_confirm_NguoiDung`(IN p_ToKen text)
BEGIN
    UPDATE nguoidung 
    SET 
		EmailConfirmed = true
    WHERE ToKen = p_ToKen;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_NguoiDung( IN p_MaNguoiDung int,IN p_MatKhau longtext,
   IN p_Email VARCHAR(50),IN p_HoTen VARCHAR(50),IN p_NgaySinh DATE,
   IN p_GioiTinh VARCHAR(10),IN p_DiaChi VARCHAR(35),IN p_SoDienThoai VARCHAR(15),IN p_AnhDaiDien longblob,IN p_VaiTro VARCHAR(25)
)
BEGIN
    UPDATE nguoidung nd
    SET
		MatKhau = IFNULL(p_MatKhau,MatKhau),
		Email = IFNULL(p_Email,Email),
		HoTen = IFNULL(p_HoTen,HoTen),
		NgaySinh = IFNULL(p_NgaySinh,NgaySinh),
        GioiTinh = IFNULL(p_GioiTinh,GioiTinh),
		DiaChi = IFNULL(p_DiaChi,DiaChi),
		SoDienThoai = IFNULL(p_SoDienThoai,SoDienThoai),
		AnhDaiDien = IFNULL(p_AnhDaiDien,AnhDaiDien),
		VaiTro = IFNULL(p_VaiTro,VaiTro)
    WHERE nd.MaNguoiDung = p_MaNguoiDung;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_NguoiDung(IN p_MaNguoiDung int)
BEGIN
    DELETE FROM nguoidung nd 
    WHERE nd.MaNguoiDung = p_MaNguoiDung;
END;
//
DELIMITER ;

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_dangnhap_NguoiDung`(IN p_TaiKhoan VARCHAR(100), IN p_MatKhau VARCHAR(255))
BEGIN
    SELECT * FROM NguoiDung WHERE TaiKhoan = p_TaiKhoan AND MatKhau = p_MatKhau;
END
//
DELIMITER ;

DELIMITER //
create procedure sp_kiemtrataikhoan_NguoiDung(IN p_TaiKhoan varchar(50),IN p_Email varchar(30))
begin 
	select * from nguoidung where TaiKhoan = p_TaiKhoan or Email = p_Email;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_resetpassword_NguoiDung (IN p_TaiKhoan VARCHAR(255), IN p_MatKhau VARCHAR(255))
BEGIN
    DECLARE user_count INT;
    -- Kiểm tra xem người dùng có tồn tại không
    SELECT COUNT(*) INTO user_count FROM nguoidung WHERE TaiKhoan = p_TaiKhoan;
    -- Nếu người dùng tồn tại, cập nhật mật khẩu của họ
    IF user_count > 0 THEN
        UPDATE nguoidung SET  MatKhau = p_MatKhau WHERE  TaiKhoan = p_TaiKhoan;
    END IF;
END //
DELIMITER ;

/*--------------------Hóa đơn nhập -------------------------------*/
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getall_HoaDonNhap`(
	IN p_pageindex INT,
    IN p_pagesize INT
)
BEGIN
    DECLARE start_index INT;
    DECLARE total_count INT;
    
    SET start_index = (p_pageindex - 1) * p_pagesize;
    
    SELECT COUNT(*) INTO total_count FROM hoadonnhap;
    
    SELECT hdn.*,nd.HoTen,ncc.TenNhaCungCap, total_count AS TotalCount
    FROM hoadonnhap hdn
    inner join nhacungcap ncc on ncc.MaNhaCungCap = hdn.MaNhaCungCap
    inner join nguoidung nd on nd.MaNguoiDung = hdn.MaNguoiDung
    ORDER BY MaHDN DESC
    LIMIT start_index, p_pagesize;
END
//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE sp_getbyid_HoaDonNhap(IN p_MaHDN INT)
BEGIN
    SELECT hdn.*,nd.HoTen ,ncc.TenNhaCungCap ,CAST(SUM(ct.GiaTien * ct.SoLuong) AS SIGNED) AS TongTien,
    sum(ct.MaChiTiet) AS TongSoLuong 
    FROM hoadonnhap hdn
    INNER JOIN nhacungcap ncc ON ncc.MaNhaCungCap = hdn.MaNhaCungCap 
    INNER JOIN nguoidung nd ON nd.MaNguoiDung = hdn.MaNguoiDung 
    INNER JOIN chitiethoadonnhap ct ON ct.MaHDN = hdn.MaHDN  
    WHERE hdn.MaHDN = p_MaHDN
    GROUP BY hdn.MaHDN;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_create_HoaDonNhap(
    IN p_MaNhaCungCap int ,IN p_MaNguoiDung int 
)
BEGIN
    INSERT INTO hoadonnhap
    (
        NgayNhap,MaNhaCungCap,MaNguoiDung
    )
    VALUES
    (
        now(),p_MaNhaCungCap,p_MaNguoiDung
    );
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_HoaDonNhap(
    IN p_MaHDN INT,
    IN p_MaNhaCungCap int ,
    IN p_MaNguoiDung int
)
BEGIN
    UPDATE hoadonnhap
    SET
        MaNhaCungCap = IFNULL(p_MaNhaCungCap,MaNhaCungCap),
		MaNguoiDung = IFNULL(p_MaNguoiDung,MaNguoiDung)
    WHERE MaHDN = p_MaHDN;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_HoaDonNhap(IN p_MaHDN INT)
BEGIN
    DELETE FROM hoadonnhap
    WHERE MaHDN = p_MaHDN;
END;
//
DELIMITER 

DELIMITER //
create procedure sp_getnew_HoaDonNhap()
begin 
	select hdn.MaHDN from hoadonnhap hdn order by hdn.MaHDN desc
    limit 1;
END;
//
DELIMITER ;

/*--------------------Chi tiết hóa đơn nhập -------------------------------*/
DELIMITER  //
CREATE PROCEDURE sp_getall_CTHDN()
BEGIN
  SELECT ct.*,hdn.NgayNhap,nd.HoTen from chitiethoadonnhap ct
  inner join hoadonnhap hdn on ct.MaHDN = hdn.MaHDN
  inner join nguoidung nd on hdn.MaNguoiDung = nd.MaNguoiDung;
END ;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_getbyid_CTHDN(IN p_MaChiTiet INT)
BEGIN
    SELECT ct.*,hdn.NgayNhap,nd.HoTen from chitiethoadonnhap ct
    inner join hoadonnhap hdn on ct.MaHDN = hdn.MaHDN
	inner join nguoidung nd on hdn.MaNguoiDung = nd.MaNguoiDung
    WHERE ct.MaChiTiet = p_MaChiTiet;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_create_CTHDN(
    IN p_MaHDN int,IN p_MaSanPham int,IN p_SoLuong int,IN p_GiaTien int
)
BEGIN
    INSERT INTO chitiethoadonnhap
    (
        MaHDN,MaSanPham,SoLuong,GiaTien
    )
    VALUES
    (
        p_MaHDN,p_MaSanPham,p_SoLuong,p_GiaTien
    );
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_CTHDN(
    IN p_MaChiTiet INT,
    IN p_MaHDN int,IN p_MaSanPham int,IN p_SoLuong int,IN p_GiaTien int
)
BEGIN
    UPDATE chitiethoadonnhap
    SET
        MaHDN = IFNULL(p_MaHDN,MaHDN),
		MaSanPham = IFNULL(p_MaSanPham,MaSanPham),
        SoLuong = IFNULL(p_SoLuong,SoLuong),
        GiaTien = IFNULL(p_GiaTien,GiaTien)
    WHERE MaChiTiet = p_MaChiTiet;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_CTHDN(IN p_MaChiTiet INT)
BEGIN
    DELETE FROM chitiethoadonnhap
    WHERE MaChiTiet = p_MaChiTiet;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_CTHDN_by_HDN(IN p_MaHDN INT)
BEGIN
    SELECT hdn.MaHDN, hdn.NgayNhap,sp.MaSanPham,sp.TenSP,ct.SoLuong,ct.GiaTien ,ct.MaChiTiet
    FROM chitiethoadonnhap ct
    INNER JOIN hoadonnhap hdn ON hdn.MaHDN = ct.MaHDN
    INNER JOIN sanpham sp ON ct.MaSanPham = sp.MaSanPham
    WHERE hdn.MaHDN = p_MaHDN;
END;
//
DELIMITER ;
/*--------------------------------------Đơn hàng----------------------------------------------------------*/
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_create_donhang`(
    IN p_HoTen varchar(50),
    IN p_DiaChi varchar(50),
    IN p_SoDienThoai varchar(15),
    IN p_MaNguoiDung INT,
    IN p_TinhTrang int,
    IN p_PhuongThucThanhToan varchar(50),
    IN p_NgayGiao DATETIME,
    IN p_list_json_chitiet_hoadon JSON
)
BEGIN
    DECLARE p_hoadon_id INT;
    -- Chèn thông tin đơn hàng
    INSERT INTO DonHang(NgayDat, NgayGiao, HoTen, DiaChi, SoDienThoai, PhuongThucThanhToan, MaNguoiDung, TinhTrang)
    VALUES (NOW(), p_NgayGiao, p_HoTen, p_DiaChi, p_SoDienThoai, p_PhuongThucThanhToan, p_MaNguoiDung, p_TinhTrang);
    SET p_hoadon_id = LAST_INSERT_ID();
    -- Chèn chi tiết đơn hàng 
    IF p_list_json_chitiet_hoadon IS NOT NULL THEN
        DROP TABLE IF EXISTS Results;
        CREATE TEMPORARY TABLE Results AS
        SELECT
            JSON_VALUE(p.value, '$.maSanPham') AS maSanPham,
            JSON_VALUE(p.value, '$.soLuong') AS soLuong,
            JSON_VALUE(p.value, '$.giaTien') AS giaTien
        FROM JSON_TABLE(p_list_json_chitiet_hoadon, '$[*]' COLUMNS (value JSON PATH '$')) AS p;
        -- Bắt đầu giao dịch
        START TRANSACTION;
        INSERT INTO ChiTietDonHang(MaDonHang, MaSanPham, SoLuong, GiaTien)
        SELECT
            p_hoadon_id,
            p.maSanPham,
            p.soLuong,
            p.giaTien
        FROM Results p;
        -- Cập nhật số lượng trong bảng sản phẩm
        UPDATE SanPham sp
        INNER JOIN Results r ON sp.MaSanPham = r.maSanPham
        SET sp.SoLuong = sp.SoLuong - r.soLuong;
        DROP TABLE IF EXISTS Results;
        COMMIT;
    END IF;
END;
//
DELIMITER ;


DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getbyid_DonHang`(IN p_MaDonHang INT)
BEGIN
    SELECT d.*, nd.TaiKhoan,CAST(SUM(c.GiaTien * c.SoLuong) AS SIGNED) AS TongTien
		FROM donhang d
		INNER JOIN chitietdonhang c ON d.MaDonHang = c.MaDonHang
		INNER JOIN nguoidung nd ON d.MaNguoiDung = nd.MaNguoiDung
		WHERE d.MaDonHang = p_MaDonHang
    GROUP BY d.MaDonHang, nd.TaiKhoan;
END//
DELIMITER ;


DELIMITER //
create procedure sp_getnew_DonHang()
begin 
	select dh.MaDonHang from donhang dh order by dh.MaDonHang desc
    limit 1;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_capnhat_DonHang(
    IN p_MaDonHang INT,
    IN p_TinhTrang INT
)
BEGIN
    -- Kiểm tra xem đơn hàng có tồn tại không
    IF EXISTS (SELECT * FROM DonHang WHERE MaDonHang = p_MaDonHang) THEN
        -- Cập nhật tình trạng của đơn hàng
        UPDATE DonHang dh 
        SET dh.TinhTrang = p_TinhTrang
        WHERE dh.MaDonHang = p_MaDonHang;
    END IF;
END //
DELIMITER ;

call sp_get_lichsumuahang_DonHang(1)
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_lichsumuahang_DonHang`(IN p_MaNguoiDung INT)
BEGIN
    -- Lấy thông tin chi tiết hóa đơn cho khách hàng đã đặt hàng
    SELECT
        HD.MaDonHang,HD.NgayDat,HD.TinhTrang,HD.NgayGiao,
        HD.HoTen,HD.DiaChi,HD.SoDienThoai
    FROM
        donhang HD
    WHERE
        HD.MaNguoiDung = p_MaNguoiDung
    GROUP BY
       HD.MaDonHang
    ORDER BY
        HD.MaDonHang DESC;
END
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_huydonhang_DonHang(
    IN p_MaDonHang INT,
    IN p_MaSanPham INT
)
BEGIN
    DECLARE SoLuongHuy INT;
    -- Lấy số lượng của sản phẩm cần hủy từ ChiTietDonHang
    SELECT SoLuong INTO SoLuongHuy
    FROM chitietdonhang
    WHERE MaSanPham = p_MaSanPham AND MaDonHang = p_MaDonHang;
    -- Xóa ChiTietDonHang
    DELETE FROM chitietdonhang
    WHERE MaSanPham = p_MaSanPham AND MaDonHang = p_MaDonHang;
    UPDATE sanpham
    SET SoLuong = SoLuong + SoLuongHuy
    WHERE MaSanPham = p_MaSanPham;
    SELECT COUNT(*) INTO SoLuongHuy
    FROM chitietdonhang
    WHERE MaDonHang = p_MaDonHang;
    -- Nếu không còn ChiTietDonHang nào, thì xóa DonHang
    IF SoLuongHuy = 0 THEN
        DELETE FROM donhang
        WHERE MaDonHang = p_MaDonHang;
    END IF;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE sp_duyetdon_DonHang(IN p_MaDonHang INT )
BEGIN
    -- Kiểm tra xem đơn hàng có tồn tại không
    IF EXISTS (SELECT * FROM DonHang WHERE MaDonHang = p_MaDonHang) THEN
        -- Cập nhật trạng thái của đơn hàng thành "Đang giao"
        UPDATE DonHang 
        SET TinhTrang = 1 
        WHERE MaDonHang = p_MaDonHang;
    END IF;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE sp_getall_DonHang()
BEGIN
    SELECT
        d.MaDonHang, d.NgayDat, d.NgayGiao,
        d.TinhTrang, d.HoTen, d.SoDienThoai,
        d.DiaChi, nd.Email, CAST(SUM(ct.GiaTien * ct.SoLuong) AS SIGNED) AS TongTien
    FROM DonHang d 
    INNER JOIN nguoidung nd ON nd.MaNguoiDung = d.MaNguoiDung
    INNER JOIN chitietdonhang ct ON ct.MaDonHang = d.MaDonHang
    GROUP BY d.MaDonHang, d.NgayDat, d.NgayGiao,
             d.TinhTrang, d.HoTen, d.SoDienThoai,
             d.DiaChi, nd.Email;
END;
//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE sp_get_CTDonHang_by_DonHang(IN p_MaDonHang INT)
BEGIN
    SELECT ctdh.*, sp.TenSP, dh.*, SUM(ctdh.SoLuong * ctdh.GiaTien) AS TongTien
    FROM chitietdonhang ctdh
    INNER JOIN sanpham sp ON sp.MaSanPham = ctdh.MaSanPham
    INNER JOIN donhang dh ON dh.MaDonHang = ctdh.MaDonHang
    WHERE ctdh.MaDonHang = p_MaDonHang
    GROUP BY ctdh.MaChiTiet, sp.TenSP, dh.MaDonHang;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE sp_get_thongtinlienhe_DonHang()
BEGIN
    SELECT lh.*
    FROM lienhe lh;
END //
DELIMITER ;

/*-------------------- Thống kê ---------------------------*/
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ThongKe_doanhthutheothang`()
BEGIN
    SELECT ROW_NUMBER() OVER(ORDER BY YEAR(d.ngaydat) ASC, MONTH(d.ngaydat) ASC) AS STT, 
					 CONCAT(MONTH(d.ngaydat), '/', YEAR(d.ngaydat)) AS ThoiGian, 
					 SUM(c.soluong * c.giatien) AS DoanhThuTheoThang
    FROM donhang d 
    INNER JOIN chitietdonhang c ON d.MaDonHang = c.MaDonHang
    WHERE d.TinhTrang = 4 
    GROUP BY YEAR(d.ngaydat), MONTH(d.ngaydat), ThoiGian
    LIMIT 5;
END
//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE sp_ThongKe_sanphambanchay()
BEGIN
    SELECT
        ctdh.MaSanPham AS MaSanPham,
        sp.TenSP AS TenSanPham,
        SUM(ctdh.soluong) AS SoLuongBan
    FROM
        chitietdonhang ctdh
        INNER JOIN donhang dh ON dh.MaDonHang = ctdh.MaDonHang
        JOIN sanpham sp ON ctdh.MaSanPham = sp.MaSanPham
    WHERE 
        dh.TinhTrang = 4 
        AND dh.NgayDat >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH) 
    GROUP BY
        MaSanPham, TenSanPham
    ORDER BY
        SoLuongBan DESC
    LIMIT 5;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE sp_ThongKe_doanhthutheonam()
BEGIN
    SELECT
        YEAR(dh.NgayDat) AS Nam,
        SUM(ctdh.soluong * ctdh.giatien) AS DoanhThuTheoNam
    FROM
        donhang dh
        JOIN chitietdonhang ctdh ON dh.MaDonHang = ctdh.MaDonHang 
    WHERE
        dh.TinhTrang = 4 
    GROUP BY
        YEAR(dh.NgayDat)
    ORDER BY
        Nam ASC
	Limit 5;
END//
DELIMITER ;

call sp_ThongKe_nguoidungmuanhieu()
DELIMITER //
CREATE PROCEDURE sp_ThongKe_nguoidungmuanhieu()
BEGIN
    WITH Last5Years AS (
        SELECT DISTINCT YEAR(NgayDat) AS Nam
        FROM donhang
        ORDER BY Nam DESC
        LIMIT 5
    ),
    DoanhThuTheoNam AS (
        SELECT
            nd.HoTen,
            YEAR(dh.NgayDat) AS Nam,
            SUM(ctdh.soluong * ctdh.giatien) AS DoanhThu,
            RANK() OVER (PARTITION BY YEAR(dh.NgayDat) ORDER BY SUM(ctdh.soluong * ctdh.giatien) DESC) AS Ranking
        FROM
            donhang dh
            JOIN chitietdonhang ctdh ON dh.MaDonHang = ctdh.MaDonHang 
            JOIN NguoiDung nd ON dh.MaNguoiDung = nd.MaNguoiDung
            JOIN Last5Years ON YEAR(dh.NgayDat) = Last5Years.Nam
        WHERE
            dh.TinhTrang = 4 
        GROUP BY
            YEAR(dh.NgayDat), nd.HoTen
    )
    SELECT *
    FROM DoanhThuTheoNam
    WHERE Ranking <= 5
    ORDER BY Nam ASC, DoanhThu DESC;
END
 //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_ThongKe_tongsoluong()
BEGIN
    DECLARE TongSanPham INT;
    DECLARE TongNguoiDung INT;
    DECLARE TongDoanhThu INT;
    -- Tính tổng số sản phẩm
    SELECT COUNT(*) INTO TongSanPham FROM sanpham;
    -- Tính tổng số người dùng
    SELECT COUNT(*) INTO TongNguoiDung FROM nguoidung;
    -- Tính tổng doanh thu
    SELECT SUM(ctdh.SoLuong * ctdh.GiaTien) INTO TongDoanhThu
    FROM   donhang dh
    INNER JOIN chitietdonhang ctdh ON dh.MaDonHang = ctdh.MaDonHang
    WHERE  dh.TinhTrang = 4;
    -- Hiển thị kết quả
    SELECT TongSanPham, TongNguoiDung, TongDoanhThu;
END//
DELIMITER ;






