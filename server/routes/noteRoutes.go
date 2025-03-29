package routes

import (
	"github.com/abhijeetsharan/Go-Notes/controllers"
	"github.com/abhijeetsharan/Go-Notes/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupNoteRoutes(app *fiber.App) {
	app.Post("/api/notes", middleware.IsAuthenticated, controllers.CreateNote)
	app.Get("/api/notes", middleware.IsAuthenticated, controllers.GetNotes)
	app.Put("/api/notes/:id", middleware.IsAuthenticated, controllers.UpdateNote)
	app.Delete("/api/notes/:id", middleware.IsAuthenticated, controllers.DeleteNote)
}
