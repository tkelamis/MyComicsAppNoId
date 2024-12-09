using Microsoft.EntityFrameworkCore;
using MyComicsBack.DAO;
using MyComicsBack.DAOMapper;
using MyComicsBack.Data;
using MyComicsBack.Interfaces;
using MyComicsBack.Mappers;
using MyComicsBack.Models;
using MyComicsBack.Repository;
using MyComicsBack.Services;
using MyComicsBack.UnitOfWork;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddScoped<IComicRepository, ComicRepository>();
builder.Services.AddScoped<IAuthorizeService, AuthorizeService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IDAOMapper<UserDAO, User>, UserDaoMapper>();
builder.Services.AddScoped<ComicMapper>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});


builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Apply the CORS policy
app.UseCors("AllowAllOrigins");

app.MapControllers();

app.Run();
