package main

import (
	"flag"
)

var listenAddr = flag.String(
	"listenAddr",
	"0.0.0.0:4096",
	"host:port to serve service broker API")

func main() {
	flag.Parse()

}
