package middleware

import (
	"fmt"
	"os"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func IsAuthenticated(c *fiber.Ctx) error {
	// Get token from the request header
	tokenString := c.Cookies("jwt") // Try getting token from Cookie
	if tokenString == "" {
		tokenString = c.Get("Authorization") // Try from Header
		if tokenString == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Unauthorized - No Token Found",
			})
		}

		// Remove "Bearer " prefix if present
		if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
			tokenString = tokenString[7:]
		}
	}

	// Parse and validate the token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil || !token.Valid {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized - Invalid Token",
		})
	}

	// Extract claims and set user ID in context
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized - Invalid Claims",
		})
	}

	userIDStr, exists := claims["iss"].(string)
	if !exists {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized - User ID Missing",
		})
	}

	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized - Invalid User ID",
		})
	}

	// Set user ID in context
	fmt.Println("Authenticated User ID:", userID) // Debugging
	c.Locals("user_id", uint(userID))

	return c.Next()
}
