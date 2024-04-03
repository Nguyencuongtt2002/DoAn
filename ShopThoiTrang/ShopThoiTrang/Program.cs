using DAL.Helper;
using DAL;
using BLL;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using OfficeOpenXml;
ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

var builder = WebApplication.CreateBuilder(args);
// Cấu hình xác thực người dùng
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// configure strongly typed settings objects
var appSettingsSection = builder.Configuration.GetSection("AppSettings");
builder.Services.Configure<AppSettings>(appSettingsSection);
// configure jwt authentication
var appSettings = appSettingsSection.Get<AppSettings>();
var key = Encoding.ASCII.GetBytes(appSettings.Secret);
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});
// Add services to the container.
builder.Services.AddTransient<IDatabaseHelper, DatabaseHelper>();

//Cấu hình VnPay
builder.Services.AddTransient<IVnPayDAL, VnPayDAL>();
builder.Services.AddTransient<IVnPayBus, VnPayBus>();
builder.Services.AddHttpContextAccessor();


builder.Services.AddTransient<ILienHeDAL, LienHeDAL>();
builder.Services.AddTransient<ILienHeBus,LienHeBus>();

builder.Services.AddTransient<IGiaDAL, GiaDAL>();
builder.Services.AddTransient<IGiaBus, GiaBus>();

builder.Services.AddTransient<ISizeDAL, SizeDAL>();
builder.Services.AddTransient<ISizeBus, SizeBus>();

builder.Services.AddTransient<IThongKeDAL, ThongKeDAL>();
builder.Services.AddTransient<IThongKeBus, ThongKeBus>();

builder.Services.AddTransient<ITinTucDAL,TinTucDAL>();
builder.Services.AddTransient<ITinTucBus,TinTucBus>();

builder.Services.AddTransient<INguoiDungDAL, NguoiDungDAL>();
builder.Services.AddTransient<INguoiDungBus, NguoiDungBus>();

builder.Services.AddTransient<ICTTinTucDAL, CTTinTucDAL>();
builder.Services.AddTransient<ICTTinTucBus, CTTinTucBus>();

builder.Services.AddTransient<IAnhDAL, AnhDAL>();
builder.Services.AddTransient<IAnhBus, AnhBus>();

builder.Services.AddTransient<IThamSoDAL,ThamSoDAL>();
builder.Services.AddTransient<IThamSoBus,ThamSoBus>();

builder.Services.AddTransient<IHoaDonNhapDAL, HoaDonNhapDAL>();
builder.Services.AddTransient<IHoaDonNhapBus, HoaDonNhapBus>();

builder.Services.AddTransient<ICTHoaDonNhapDAL, CTHoaDonNhapDAL>();
builder.Services.AddTransient<ICTHoaDonNhapBus, CTHoaDonNhapBus>();

builder.Services.AddTransient<IThongSoDAL,ThongSoDAL>();
builder.Services.AddTransient<IThongSoBus, ThongSoBus>();

builder.Services.AddTransient<ISlideDAL, SlideDAL>();
builder.Services.AddTransient<ISlideBus, SlideBus>();

builder.Services.AddTransient<IGiamGiaDAL, GiamGiaDAL>();
builder.Services.AddTransient<IGiamGiaBus, GiamGiaBus>();

builder.Services.AddTransient<INhaCungCapDAL,NhaCungCapDAL>();
builder.Services.AddTransient<INhaCungCapBus,NhaCungCapBus>();

builder.Services.AddTransient<IMenuDAL,MenuDAL>();
builder.Services.AddTransient<IMenuBus,MenuBus>();

builder.Services.AddTransient<IGioiThieuDAL,GioiThieuDAL>();
builder.Services.AddTransient<IGioiThieuBus,GioiThieuBus>();

builder.Services.AddTransient<ILoaiSanPhamDAL,LoaiSanPhamDAL>();
builder.Services.AddTransient<ILoaiSanPhamBus,LoaiSanPhamBus>();

builder.Services.AddTransient<IThuongHieuDAL, ThuongHieuDAL>();
builder.Services.AddTransient<IThuongHieuBus, ThuongHieuBus>();

builder.Services.AddTransient<ISanPhamDAL,SanPhamDAL>();
builder.Services.AddTransient<ISanPhamBus,SanPhamBus>();

builder.Services.AddTransient<IDonHangDAL, DonHangDAL>();
builder.Services.AddTransient<IDonHangBus, DonHangBus>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());
app.UseAuthentication();
app.UseAuthorization();


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
