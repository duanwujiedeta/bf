import 'external-a';

function test() {
    console.log("test");
}

function test1() {
    console.log("test1");
}

console.log('side-effect');

console.log(42);

function main() {
    test();
    test1();
}
main();
var main$1 = {
    main
};

export { main$1 as default };
