using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyComicsBack.Migrations
{
    /// <inheritdoc />
    public partial class newUserSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Password", "UserRoleId" },
                values: new object[] { 3, "despoina", "3463", 1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
