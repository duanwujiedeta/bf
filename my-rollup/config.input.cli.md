- rollup的input命令行

```bash
rollup --format es --input src/entry1.js --input src/entry2.js #指定多个入口
rollup src/entry1.js src/entry2.js --format es #和上面效果一样

#指定 name 选项的命令行
rollup main=src/entry1.js other=src/entry2.js --format es
rollup "main entry"="src/entry 1.js" "src/other entry.js" --format es #用双引号把 name 和 value 写在一起，key用空格隔开，value也用空格隔开
```

