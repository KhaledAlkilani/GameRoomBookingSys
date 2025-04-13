using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gameroombookingsys.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePlayerRoomBookingsRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PlayerId",
                table: "RoomBookings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_RoomBookings_PlayerId",
                table: "RoomBookings",
                column: "PlayerId");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomBookings_Players_PlayerId",
                table: "RoomBookings",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoomBookings_Players_PlayerId",
                table: "RoomBookings");

            migrationBuilder.DropIndex(
                name: "IX_RoomBookings_PlayerId",
                table: "RoomBookings");

            migrationBuilder.DropColumn(
                name: "PlayerId",
                table: "RoomBookings");
        }
    }
}
