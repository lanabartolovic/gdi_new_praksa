using Infrastructure;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Configuration;
using WebApplication2.Models.SignalR;
using WebApplication2.Services;

var builder = WebApplication.CreateBuilder(args);




// Add services to the container.



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSignalR();
builder.Services.AddHttpClient();
builder.Services.AddDbContext<PraksaDbContext>
    (configure => configure.UseSqlServer(builder.Configuration
    .GetConnectionString("DefaultConnection"), options =>
    {
        options.MigrationsAssembly(typeof(PraksaDbContext).Assembly.FullName);
    }));

builder.Services.Configure<MailSettings>(builder.Configuration.GetSection(nameof(MailSettings)));
builder.Services.AddTransient<IMailService, MailService>();
var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseHttpsRedirection();
app.UseCors(options =>
{
    options.AllowAnyHeader()
    .AllowAnyMethod()
    .SetIsOriginAllowed(_ => true)
    .AllowCredentials();
});
app.UseAuthorization();



app.MapControllers();



app.MapHub<AppHub>("/appHub");




app.Run();