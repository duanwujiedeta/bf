import {
    test
} from "./test"
import test1 from "./test1"
import 'external-a';
import 'external-b';

console.log('side-effect');

console.log(42);

function main() {
    test();
    test1();
}
main();
export default {
    main
}