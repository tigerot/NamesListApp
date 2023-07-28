using Autofac;
using Autofac.Extensions.DependencyInjection;
using Business.DependencyResolvers.Autofac;
using Core.DependencyResolvers;
using Core.Utilities.IoC;
using Core.Extensions;

var builder = WebApplication.CreateBuilder(args);

IServiceCollection service = builder.Services;

// Adding Autofac into the project
builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());
builder.Host.ConfigureContainer<ContainerBuilder>(builder => builder.RegisterModule(new AutofacBusinessModule()));

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin", builder => builder.WithOrigins("*"));
    //options.AddPolicy("AllowOrigin", builder => builder.WithOrigins("http://localhost:51731"));
}
);

service.AddDependencyResolvers(new ICoreModule[]
{
    new CoreModule(),
});
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

app.UseCors(builder => builder.WithOrigins("*")
.AllowAnyHeader()
.AllowAnyMethod()
.SetIsOriginAllowed(origin => true));

//app.UseCors(builder => builder.WithOrigins("http://localhost:3000").AllowAnyHeader());

//app.UseCors(builder => builder.WithOrigins("http://localhost:51731").AllowAnyHeader());

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
