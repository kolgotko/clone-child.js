'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CloneChild = function () {
	function CloneChild(container) {
		var _this = this;

		_classCallCheck(this, CloneChild);

		var addButton = 'data-add-button';
		var rmButton = 'data-rm-button';
		var template = 'data-template';

		this._nodes = [];
		this._template = null;
		this._container = null;
		this._filters = { add: null, rm: null };

		if (!(container instanceof HTMLElement)) throw new Error('container is not a HTMLElement');

		this._container = container;

		if (container.hasAttribute(template)) {

			var selector = container.getAttribute(template);
			this._template = document.querySelector(selector);
		}

		if (container.hasAttribute(addButton)) {

			var _selector = container.getAttribute(addButton);
			var button = document.querySelector(_selector);
			button.addEventListener('click', function () {
				_this.addClone();
			});
		}

		if (container.hasAttribute(rmButton)) {

			var _selector2 = container.getAttribute(rmButton);
			var _button = document.querySelector(_selector2);
			_button.addEventListener('click', function () {
				_this.rmClone();
			});
		}
	}

	_createClass(CloneChild, [{
		key: 'addClone',
		value: function addClone() {

			if (!(this._template instanceof HTMLElement)) throw new Error('template not found');

			var clone = this._template.cloneNode(true);

			if (this._filters.add) this._filters.add(clone);
			this._nodes.push(clone);
			this._container.appendChild(clone);
		}
	}, {
		key: 'rmClone',
		value: function rmClone() {

			if (!(this._template instanceof HTMLElement)) throw new Error('template not found');

			if (!this._nodes.length) return false;

			var clone = this._nodes.pop();

			if (this._filters.rm) this._filters.rm(clone);
			this._container.removeChild(clone);

			return true;
		}
	}, {
		key: 'setTemplate',
		value: function setTemplate(elem) {

			if (!(elem instanceof HTMLElement)) throw new Error('elem is not a HTMLElement');

			this._template = elem;
			return this;
		}
	}, {
		key: 'onAdd',
		value: function onAdd(call) {

			if (!(call instanceof Function)) throw new Error('call is not a function');

			this._filters.add = call;
			return this;
		}
	}, {
		key: 'onRm',
		value: function onRm(call) {

			if (!(call instanceof Function)) throw new Error('call is not a function');

			this._filters.rm = call;
			return this;
		}
	}]);

	return CloneChild;
}();