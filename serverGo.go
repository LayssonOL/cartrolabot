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
	app := iris.New()

	crs := func(ctx iris.Context) {
		ctx.Header("Access-Control-Allow-Origin", "*")
		ctx.Header("Content-Type", "application/json")
		// ctx.Header("Access-Control-Allow-Credentials", "true")/
		// ctx.Header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Content-Type")
		ctx.Next()
	}

	app.StaticServe("./build", "/")

	app.Handle("ANY", "/proxy/{path:path}", crs, func(ctx iris.Context) {

		var (
			responseBody []byte
			request      *http.Request
			response     *http.Response
			Client       = &http.Client{Timeout: cfg.RequestCacheTimeout}
			err          error
			arr          []byte
			corpo        string
		)
		//uri := &uri.URIBuilder{}

		path := ctx.Params().Get("path")

		fmt.Println("requesto to ", path, ctx.Method())

		// data := url.Values{}
		// data.Set("name", "foo")
		// data.Add("surname", "bar")
		//uri.ServerAddr(h.remoteHandlerURL).ClientURI(ctx.Request().URL.RequestURI()).ClientMethod(ctx.Request().Method)

		// set the full url here because below we have other issues, probably net/http bugs

		arr, err = ioutil.ReadAll(ctx.Request().Body)
		if err == nil {
			corpo = string(arr)
			// println("CORPO => ", corpo)
		} else {
			ctx.Write(arr)
			return
		}

		if request, err = http.NewRequest(ctx.Method(), path, strings.NewReader(corpo)); err != nil {
			//// println("error when requesting to the remote service: " + err.Error())
			// somehing very bad happens, just execute the user's handler and return
			//h.bodyHandler(ctx)
			panic(err)
		}

		request.Header.Add("Content-Type", "application/json")

		// println("GET Do to the remote cache service with the url: " + request.URL.String())
		if response, err = Client.Do(request); err != nil {

		}

		if responseBody, err = ioutil.ReadAll(response.Body); err != nil {
			response.Body.Close()
		}

		if err != nil || response.StatusCode == cfg.FailStatus {

			fmt.Println("DEu errro", response.StatusCode)

			if err != nil {
				fmt.Println(err.Error())
			}

			// if not found on cache, then execute the handler and save the cache to the remote server
			// recorder := ctx.Recorder()
			// h.bodyHandler(ctx)

			// // check if it's a valid response, if it's not then just return.
			// if !h.rule.Valid(ctx) {
			// 	return
			// }
			// // save to the remote cache
			// // we re-create the request for any case
			// body := recorder.Body()[0:]
			// if len(body) == 0 {
			// 	//// println("Request: len body is zero, do nothing")
			// 	return
			// }
			// uri.StatusCode(recorder.StatusCode())
			// uri.Lifetime(h.life)
			// uri.ContentType(recorder.Header().Get(cfg.ContentTypeHeader))

			// request, err = http.NewRequest(methodPost, uri.String(), bytes.NewBuffer(body)) // yes new buffer every time

			// // println("POST Do to the remote cache service with the url: " + request.URL.String())
			// if err != nil {
			// 	//// println("Request: error on method Post of request to the remote: " + err.Error())
			// 	return
			// }
			// // go Client.Do(request)
			// Client.Do(request)
		} else {
			fmt.Println("Deu certo")

			// get the status code , content type and the write the response body
			ctx.ContentType(response.Header.Get(cfg.ContentTypeHeader))
			ctx.StatusCode(response.StatusCode)

			ctx.Write(responseBody)
		}

		fmt.Println("response", string(responseBody))
	})

	withoutParse := iris.WithConfiguration(
		iris.Configuration{
			DisableBodyConsumptionOnUnmarshal: true,
		},
	)
	app.Run(iris.Addr(":5400"), withoutParse)

}
