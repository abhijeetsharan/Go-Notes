package main

import (
	"fmt"
	"log"

	"github.com/abhijeetsharan/Go-Notes/config"
	"github.com/abhijeetsharan/Go-Notes/db"
	"github.com/abhijeetsharan/Go-Notes/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	config.LoadEnv()

	// Connect to the database
	db.ConnectDatabase()

	// Initialize Fiber app
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: config.GetEnv("FRONTEND_URL"),
		AllowMethods: "GET,POST,PUT,DELETE",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))

	// Set up routes
	routes.SetupAuthRoutes(app)
	routes.SetupNoteRoutes(app)

	// Start the server
	port := ":4000"
	fmt.Println("Server running on port", port)
	log.Fatal(app.Listen(port))
}
