using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gameroombookingsys.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCascadeDeleteConfiguration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeviceRoomBooking_RoomBookings_RoomBookingId",
                table: "DeviceRoomBooking");

            migrationBuilder.AddForeignKey(
                name: "FK_DeviceRoomBooking_RoomBookings_RoomBookingId",
                table: "DeviceRoomBooking",
                column: "RoomBookingId",
                principalTable: "RoomBookings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeviceRoomBooking_RoomBookings_RoomBookingId",
                table: "DeviceRoomBooking");

            migrationBuilder.AddForeignKey(
                name: "FK_DeviceRoomBooking_RoomBookings_RoomBookingId",
                table: "DeviceRoomBooking",
                column: "RoomBookingId",
                principalTable: "RoomBookings",
                principalColumn: "Id");
        }
    }
}
