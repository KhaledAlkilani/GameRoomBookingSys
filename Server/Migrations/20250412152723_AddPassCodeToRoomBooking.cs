using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gameroombookingsys.Migrations
{
    /// <inheritdoc />
    public partial class AddPassCodeToRoomBooking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PassCode",
                table: "RoomBookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PassCode",
                table: "RoomBookings");
        }
    }
}
