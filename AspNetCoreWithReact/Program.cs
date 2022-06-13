using AspNetCoreWithReact;
using AspNetCoreWithReact.CustomMiddleware;
using AspNetCoreWithReact.Model.Entities;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddTransient<ILibraryService, LibraryService>();
builder.Services.AddDbContext<AppDataContext>(x => x.UseSqlServer(builder.Configuration.GetConnectionString("AspNetAndReactCourse")));
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "ASP.NET CORE API", Version = "v1" });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

// ALLOW SPECIFIC ORIGIN
app.UseCors(x =>x.AllowAnyMethod().AllowAnyHeader().SetIsOriginAllowed(origin => true));

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "React ASP.NET");
});

app.UseRouting();
app.UseMyMiddleware();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
