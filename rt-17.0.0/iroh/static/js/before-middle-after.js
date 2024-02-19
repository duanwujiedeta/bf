const $$STx1 = Iroh.stages["$$STx1"];
var $$frameValue = void 0;
$$STx1.$49(128)
var Iroh$$x7;
var oneArgumentPooler = $$STx1.$22(18, $$STx1.$23(33, "oneArgumentPooler"), function $$ANON_6(copyFieldsFrom) {
	$$STx1.$4(129, this, $$ANON_6, arguments);
	var Iroh$$x1;
	var Klass = $$STx1.$22(19, $$STx1.$23(20, "Klass"), $$STx1.$29(135, this));
	if (Iroh$$x1 = $$STx1.$17(2, $$STx1.$45(21, $$STx1.$45(22, Klass, "instancePool").instancePool, "length").length)) {
		$$STx1.$18(2, Iroh$$x1);
		var instance = $$STx1.$22(23, $$STx1.$23(27, "instance"), $$STx1.$2(26, this, $$STx1.$45(24, $$STx1.$45(25, Klass, "instancePool").instancePool, "pop"), "pop", []));
		$$STx1.$2(29, this, $$STx1.$45(28, Klass, "call"), "call", [instance, copyFieldsFrom]);
		return $$STx1.$1(30, "$$ANON_6", instance);
		$$STx1.$19(2);
	} else {
		$$STx1.$20(1);
		{
			$$STx1.$46(15);
			return $$STx1.$1(31, "$$ANON_6", new $$STx1.$25(32, $$STx1, $$STx1.$24(32, Klass, [copyFieldsFrom])));
			$$STx1.$47(15);
		}
		$$STx1.$21(1);
	}
	$$STx1.$5(129, this);
});
var twoArgumentPooler = $$STx1.$22(34, $$STx1.$23(49, "twoArgumentPooler"), function $$ANON_8(a1, a2) {
	$$STx1.$4(130, this, $$ANON_8, arguments);
	var Iroh$$x2;
	var Klass = $$STx1.$22(35, $$STx1.$23(36, "Klass"), $$STx1.$29(136, this));
	if (Iroh$$x2 = $$STx1.$17(4, $$STx1.$45(37, $$STx1.$45(38, Klass, "instancePool").instancePool, "length").length)) {
		$$STx1.$18(4, Iroh$$x2);
		var instance = $$STx1.$22(39, $$STx1.$23(43, "instance"), $$STx1.$2(42, this, $$STx1.$45(40, $$STx1.$45(41, Klass, "instancePool").instancePool, "pop"), "pop", []));
		$$STx1.$2(45, this, $$STx1.$45(44, Klass, "call"), "call", [instance, a1, a2]);
		return $$STx1.$1(46, "$$ANON_8", instance);
		$$STx1.$19(4);
	} else {
		$$STx1.$20(3);
		{
			$$STx1.$46(16);
			return $$STx1.$1(47, "$$ANON_8", new $$STx1.$25(48, $$STx1, $$STx1.$24(48, Klass, [a1, a2])));
			$$STx1.$47(16);
		}
		$$STx1.$21(3);
	}
	$$STx1.$5(130, this);
});
var fiveArgumentPooler = $$STx1.$22(50, $$STx1.$23(65, "fiveArgumentPooler"), function $$ANON_10(a1, a2, a3, a4, a5) {
	$$STx1.$4(131, this, $$ANON_10, arguments);
	var Iroh$$x3;
	var Klass = $$STx1.$22(51, $$STx1.$23(52, "Klass"), $$STx1.$29(137, this));
	if (Iroh$$x3 = $$STx1.$17(6, $$STx1.$45(53, $$STx1.$45(54, Klass, "instancePool").instancePool, "length").length)) {
		$$STx1.$18(6, Iroh$$x3);
		var instance = $$STx1.$22(55, $$STx1.$23(59, "instance"), $$STx1.$2(58, this, $$STx1.$45(56, $$STx1.$45(57, Klass, "instancePool").instancePool, "pop"), "pop", []));
		$$STx1.$2(61, this, $$STx1.$45(60, Klass, "call"), "call", [instance, a1, a2, a3, a4, a5]);
		return $$STx1.$1(62, "$$ANON_10", instance);
		$$STx1.$19(6);
	} else {
		$$STx1.$20(5);
		{
			$$STx1.$46(17);
			return $$STx1.$1(63, "$$ANON_10", new $$STx1.$25(64, $$STx1, $$STx1.$24(64, Klass, [a1, a2, a3, a4, a5])));
			$$STx1.$47(17);
		}
		$$STx1.$21(5);
	}
	$$STx1.$5(131, this);
});
var standardReleaser = $$STx1.$22(66, $$STx1.$23(78, "standardReleaser"), function $$ANON_12(instance) {
	$$STx1.$4(132, this, $$ANON_12, arguments);
	var Iroh$$x5;
	var Iroh$$x4;
	var Klass = $$STx1.$22(67, $$STx1.$23(68, "Klass"), $$STx1.$29(138, this));
	if (Iroh$$x4 = $$STx1.$17(8, $$STx1.$45(69, instance, "destructor").destructor)) {
		$$STx1.$18(8, Iroh$$x4);
		$$STx1.$2(71, this, $$STx1.$45(70, instance, "destructor"), "destructor", []);
		$$STx1.$19(8);
	}
	if (Iroh$$x5 = $$STx1.$17(10, $$STx1.$32(139, 28, $$STx1.$45(72, $$STx1.$45(73, Klass, "instancePool").instancePool, "length").length, $$STx1.$45(74, Klass, "poolSize").poolSize))) {
		$$STx1.$18(10, Iroh$$x5);
		$$STx1.$2(77, this, $$STx1.$45(75, $$STx1.$45(76, Klass, "instancePool").instancePool, "push"), "push", [instance]);
		$$STx1.$19(10);
	}
	$$STx1.$5(132, this);
});
var DEFAULT_POOL_SIZE = $$STx1.$22(79, $$STx1.$23(81, "DEFAULT_POOL_SIZE"), $$STx1.$30(80, 10));
var DEFAULT_POOLER = $$STx1.$22(82, $$STx1.$23(83, "DEFAULT_POOLER"), oneArgumentPooler);
var addPoolingTo = $$STx1.$22(84, $$STx1.$23(94, "addPoolingTo"), function $$ANON_14(CopyConstructor, pooler) {
	$$STx1.$4(133, this, $$ANON_14, arguments);
	var Iroh$$x6;
	var NewKlass = $$STx1.$22(85, $$STx1.$23(86, "NewKlass"), CopyConstructor);
	$$STx1.$35(87, 0, NewKlass, "instancePool", $$STx1.$44(88, []));
	$$STx1.$35(89, 0, NewKlass, "getPooled", $$STx1.$33(140, 21, pooler, (function () {
		return DEFAULT_POOLER;
	}).bind(this)));
	if (Iroh$$x6 = $$STx1.$17(12, $$STx1.$26(141, 13, this, false, $$STx1.$45(90, NewKlass, "poolSize").poolSize))) {
		$$STx1.$18(12, Iroh$$x6);
		$$STx1.$35(91, 0, NewKlass, "poolSize", DEFAULT_POOL_SIZE);
		$$STx1.$19(12);
	}
	$$STx1.$35(92, 0, NewKlass, "release", standardReleaser);
	return $$STx1.$1(93, "$$ANON_14", NewKlass);
	$$STx1.$5(133, this);
});
var PooledClass = $$STx1.$22(95, $$STx1.$23(97, "PooledClass"), $$STx1.$44(96, {
	addPoolingTo: addPoolingTo,
	oneArgumentPooler: oneArgumentPooler,
	twoArgumentPooler: twoArgumentPooler,
	fiveArgumentPooler: fiveArgumentPooler
}));
var PooledClass_1 = $$STx1.$22(98, $$STx1.$23(99, "PooledClass_1"), PooledClass);
var TouchEventUtils = $$STx1.$22(100, $$STx1.$23(121, "TouchEventUtils"), $$STx1.$44(101, {
	extractSingleTouch: function $$ANON_16(nativeEvent) {
		$$STx1.$4(134, this, $$ANON_16, arguments);
		var touches = $$STx1.$22(102, $$STx1.$23(104, "touches"), $$STx1.$45(103, nativeEvent, "touches").touches);
		var changedTouches = $$STx1.$22(105, $$STx1.$23(107, "changedTouches"), $$STx1.$45(106, nativeEvent, "changedTouches").changedTouches);
		var hasTouches = $$STx1.$22(108, $$STx1.$23(111, "hasTouches"), $$STx1.$33(142, 20, touches, (function () {
			return $$STx1.$32(143, 26, $$STx1.$45(109, touches, "length").length, $$STx1.$30(110, 0));
		}).bind(this)));
		var hasChangedTouches = $$STx1.$22(112, $$STx1.$23(115, "hasChangedTouches"), $$STx1.$33(144, 20, changedTouches, (function () {
			return $$STx1.$32(145, 26, $$STx1.$45(113, changedTouches, "length").length, $$STx1.$30(114, 0));
		}).bind(this)));
		return $$STx1.$1(116, "$$ANON_16", $$STx1.$34(146, $$STx1.$33(147, 20, $$STx1.$26(148, 13, this, false, hasTouches), (function () {
			return hasChangedTouches;
		}).bind(this)), (function () {
			return $$STx1.$45(117, changedTouches, $$STx1.$30(118, 0))[$$STx1.$30(118, 0)];
		}).bind(this), (function () {
			return $$STx1.$34(149, hasTouches, (function () {
				return $$STx1.$45(119, touches, $$STx1.$30(120, 0))[$$STx1.$30(120, 0)];
			}).bind(this), (function () {
				return nativeEvent;
			}).bind(this));
		}).bind(this)));
		$$STx1.$5(134, this);
	}
}));
var TouchEventUtils_1 = $$STx1.$22(122, $$STx1.$23(123, "TouchEventUtils_1"), TouchEventUtils);
var CLONE_TYPE_ERR = $$STx1.$22(124, $$STx1.$23(125, "CLONE_TYPE_ERR"));
if (Iroh$$x7 = $$STx1.$17(14, __DEV__)) {
	$$STx1.$18(14, Iroh$$x7);
	CLONE_TYPE_ERR = $$STx1.$35(126, 0, "CLONE_TYPE_ERR", null, $$STx1.$30(127, 'You may only clone instances of AbstractEvent for persistent references. Check yourself.'));
	$$STx1.$19(14);
}
$$STx1.$50(128, $$frameValue)
