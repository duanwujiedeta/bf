package main

import (
	"errors"
	"fmt"
	"os"
)

type MyInt int

func main() {
	numerator := 20
	denominator := 0
	remainder, mod, err := calcRemainderAndMod(numerator, denominator)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	fmt.Println(remainder, mod)
}
func calcRemainderAndMod(numerator, denominator int) (int, int, error) {
	if denominator == 0 {
		return 0, 0, errors.New("denominator is 0") //error 的返回
	}
	return numerator / denominator, numerator % denominator, nil
}

type error interface { // error 的 interface 的定义
	Error() string
}
