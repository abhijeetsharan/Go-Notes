package controllers

import (
	"fmt"

	"github.com/abhijeetsharan/Go-Notes/db"
	"github.com/abhijeetsharan/Go-Notes/models"
	"github.com/gofiber/fiber/v2"
)

// Create Note
func CreateNote(c *fiber.Ctx) error {
	userID := c.Locals("user_id")
	if userID == nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized",
		})
	}

	// Convert to uint
	userIDUint, ok := userID.(uint)
	if !ok {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "User ID not found",
		})
	}

	note := new(models.Note)
	if err := c.BodyParser(&note); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request",
		})
	}

	if note.Title == "" || note.Content == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Title and Content are required",
		})
	}

	// Assign user ID before saving
	note.UserID = userIDUint

	db.DB.Create(&note)

	return c.JSON(fiber.Map{
		"message": "Note created successfully",
		"note":    note,
	})
}

func GetNotes(c *fiber.Ctx) error {
	fmt.Println("User ID from Locals:", c.Locals("user_id"))
	userID, ok := c.Locals("user_id").(uint)
	if !ok {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "User ID not found",
		})
	}

	var notes []models.Note
	if err := db.DB.Where("user_id = ?", userID).Find(&notes).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch notes",
		})
	}

	return c.JSON(notes)
}

func DeleteNote(c *fiber.Ctx) error {
	id := c.Params("id")

	var note models.Note
	if err := db.DB.First(&note, id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Note not found",
		})
	}
	db.DB.Delete(&note)

	return c.JSON(fiber.Map{
		"message": "Note deleted successfully",
	})
}

func UpdateNote(c *fiber.Ctx) error {
	id := c.Params("id")
	var note models.Note

	if err := db.DB.First(&note, id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Note not found",
		})
	}

	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request",
		})
	}

	if data["title"] != "" {
		note.Title = data["title"]
	}
	if data["content"] != "" {
		note.Content = data["content"]
	}

	db.DB.Save(&note)

	return c.JSON(fiber.Map{
		"message": "Note updated successfully",
	})
}
