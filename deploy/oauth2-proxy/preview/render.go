package main

import (
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	if len(os.Args) != 2 {
		log.Fatal("Uso: go run ./deploy/oauth2-proxy/preview/render.go <directorio de salida>")
	}
	output := os.Args[1]
	if err := os.MkdirAll(output, 0755); err != nil {
		log.Fatal(err)
	}

	templates := template.Must(template.ParseFiles(
		"deploy/oauth2-proxy/templates/sign_in.html",
		"deploy/oauth2-proxy/templates/error.html",
	))
	signIn := struct {
		ProxyPrefix, Redirect string
		Footer                template.HTML
	}{ProxyPrefix: "/oauth2", Redirect: "/"}

	failure := struct {
		ProxyPrefix, Redirect, Title, Message, RequestID, Version string
		StatusCode                                                int
		Footer                                                    template.HTML
	}{
		ProxyPrefix: "/oauth2",
		Redirect:    "/",
		StatusCode:  http.StatusForbidden,
		Title:       http.StatusText(http.StatusForbidden),
		Message:     "You do not have permission to access this resource.",
		RequestID:   "vista-previa",
		Version:     "7.15.6",
	}

	render(templates, output, "sign_in.html", signIn)
	render(templates, output, "error.html", failure)
}

// render executes the named template with the same template set used by OAuth2 Proxy.
func render(templates *template.Template, output, name string, data any) {
	file, err := os.Create(filepath.Join(output, name))
	if err != nil {
		log.Fatal(err)
	}
	err = templates.ExecuteTemplate(file, name, data)
	closeErr := file.Close()
	if err != nil {
		log.Fatal(err)
	}
	if closeErr != nil {
		log.Fatal(closeErr)
	}
}
