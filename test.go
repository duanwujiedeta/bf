package main

import (
	"errors"
	"fmt"
	"os"
)

// "math/cmplx"

type person struct {
	name string
	age  int
	pet  string
}

func main() {
	result, remainder, err := divAndRemainder(5, 2)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	fmt.Println(result, remainder)
}
func addTo(base int, vals ...int) []int {
	out := make([]int, 0, len(vals))
	for _, v := range vals {
		out = append(out, base+v)
	}
	return out
}

func div(numerator int, denominator int) int {
	if denominator == 0 {
		return 0
	}
	return numerator / denominator
}

type MyFuncOpts struct {
	FirstName string
	LastName  string
	Age       int
}

func divAndRemainder(numerator int, denominator int) (int, int, error) { // 多返回值的定义
	if denominator == 0 {
		return 0, 0, errors.New("cannot divide by zero")
	}
	return numerator / denominator, numerator % denominator, nil // 多返回值的 return
}
