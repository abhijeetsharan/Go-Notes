package main

import (
	"fmt"
	"log"

	"github.com/abhijeetsharan/Go-Notes/config"
	"github.com/abhijeetsharan/Go-Notes/db"
	"github.com/abhijeetsharan/Go-Notes/routes"
	"github.com/gofiber/fiber/v2"
)

func main() {
	config.LoadEnv()

	// Connect to the database
	db.ConnectDatabase()

	// Initialize Fiber app
	app := fiber.New()

	// Set up routes
	routes.SetupAuthRoutes(app)
	routes.SetupNoteRoutes(app)

	// Start the server
	port := ":4000"
	fmt.Println("Server running on port", port)
	log.Fatal(app.Listen(port))
}
