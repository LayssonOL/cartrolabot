package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/kataras/iris"
	"github.com/kataras/iris/cache/cfg"
)

func main() {
	// here i get an instance of iris
	// an IRIS Application
	app := iris.New()

	// Configuring the Headers to any request received
	crs := func(ctx iris.Context) {
		ctx.Header("Access-Control-Allow-Origin", "*")
		ctx.Header("Content-Type", "application/json; charset=UTF-8")
		// ctx.Header("Access-Control-Allow-Credentials", "true")/
		// ctx.Header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Content-Type")
		ctx.Next()
	}

	// Function to stablish from where this web application will begin.
	// This way my root route is referencing the build of the React App CartrolaBot
	app.StaticWeb("/", "./build")

	app.Handle("ANY", "/proxy/{path:path}", crs, func(ctx iris.Context) {

		var (
			responseBody []byte
			request      *http.Request
			response     *http.Response
			Client       = &http.Client{Timeout: cfg.RequestCacheTimeout}
			err          error
			arr          []byte
			corpo        string
			token        string
		)

		path := ctx.Params().Get("path")

		fmt.Println("request to ", path, ctx.Method())

		// set the full url here because below we have other issues, probably net/http bugs

		arr, err = ioutil.ReadAll(ctx.Request().Body)
		if err == nil {
			corpo = string(arr)
			// println("CORPO => ", corpo)
		} else {
			ctx.Write(arr)
			return
		}

		// fmt.Print("Header => ", ctx.Request().Header)

		if token = ctx.Request().Header.Get("X-GLB-Token"); token == "" {

		} else {
			// fmt.Println("Token Header => ", token)
		}

		if request, err = http.NewRequest(ctx.Method(), path, strings.NewReader(corpo)); err != nil {
			//// println("error when requesting to the remote service: " + err.Error())
			// somehing very bad happens, just execute the user's handler and return
			//h.bodyHandler(ctx)
			panic(err)
		}

		request.Header.Add("Content-Type", "application/json; charset=UTF-8")
		request.Header.Add("X-GLB-Token", token)

		// fmt.Println("HEADER TO CARTOLA API = ", request.Header)

		if response, err = Client.Do(request); err != nil {
			panic(err)
		}

		if responseBody, err = ioutil.ReadAll(response.Body); err != nil {
			response.Body.Close()
		}

		if err != nil || response.StatusCode == cfg.FailStatus {

			fmt.Println("Deu erro", response.StatusCode)

			if err != nil {
				fmt.Println(err.Error())
			}

		} else {
			// fmt.Println("Deu certo")

			// get the status code , content type and the write the response body
			ctx.ContentType(response.Header.Get(cfg.ContentTypeHeader))
			ctx.StatusCode(response.StatusCode)

			ctx.Write(responseBody)
		}

		// fmt.Println("response", string(responseBody))
	})

	withoutParse := iris.WithConfiguration(
		iris.Configuration{
			DisableBodyConsumptionOnUnmarshal: true,
		},
	)
	app.Run(iris.Addr(":5400"), withoutParse)

}
