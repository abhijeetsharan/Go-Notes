package middleware

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// Generate Access Token
func GenerateAccessToken(userId string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userId,
		"exp":      time.Now().Add(time.Minute * 15).Unix(), // 15-minute expiry
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}

// Generate Refresh Token (longer expiry)
func GenerateRefreshToken(userId string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userId,
		"exp":      time.Now().Add(time.Hour * 72).Unix(), // 3-day expiry
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}
