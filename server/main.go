package main

import (
	"fmt"
	"log"

	"github.com/abhijeetsharan/Go-Notes/config"
	"github.com/abhijeetsharan/Go-Notes/db"
	"github.com/gofiber/fiber/v2"
)

func main() {
	config.LoadEnv()

	// Connect to the database
	db.ConnectDatabase()

	// Initialize Fiber app
	app := fiber.New()

	// Start the server
	port := ":4000"
	fmt.Println("Server running on port", port)
	log.Fatal(app.Listen(port))
}
