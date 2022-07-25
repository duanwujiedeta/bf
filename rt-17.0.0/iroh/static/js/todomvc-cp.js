function runRt() {
    /**
     * @jsx React.DOM
     */

    var Utils = {
        // https://gist.github.com/1308368
        uuid: function (a, b) {
            for (b = a = ''; a++ < 36; b += a * 51 & 52 ? (a ^ 15 ? 8 ^ Math.random() * (a ^ 20 ? 16 : 4) : 4).toString(16) : '-');
            return b
        },
        pluralize: function (count, word) {
            return count === 1 ? word : word + 's';
        },
        store: function (namespace, data) {
            if (arguments.length > 1) {
                return localStorage.setItem(namespace, JSON.stringify(data));
            } else {
                var store = localStorage.getItem(namespace);
                return (store && JSON.parse(store)) || [];
            }
        }
    };

    function cx(obj) {
        var s = '';
        for (var key in obj) {
            if (!obj.hasOwnProperty(key)) {
                continue;
            }
            if (obj[key]) {
                s += key + ' ';
            }
        }
        return s;
    }

    var ENTER_KEY = 13;

    var TodoItem = React.createClass({
        displayName: 'TodoItem',
        getInitialState: function () {
            return {
                editValue: this.props.todo.title
            };
        },
        onKeyUp: function (event) {
            this.setState({
                editValue: event.target.value
            });
            var val = event.target.value.trim();
            if (event.nativeEvent.keyCode !== ENTER_KEY || !val) {
                return;
            }
            this.props.onSave(val);
        },
        onEdit: function () {
            this.props.onEdit();
            this.refs.editField.getDOMNode().focus();
        },
        render: function () {
            return (
                React.DOM.li({
                    className: cx({
                        completed: this.props.todo.completed,
                        editing: this.props.editing
                    })
                }, [
                    React.DOM.div({
                        className: "view"
                    }, [
                        React.DOM.input({
                            className: "toggle",
                            type: "checkbox",
                            checked: this.props.todo.completed ? 'checked' : null,
                            onChange: this.props.onToggle
                        }, null),
                        React.DOM.label({
                            onDoubleClick: this.onEdit.bind(this)
                        }, this.props.todo.title),
                        React.DOM.button({
                            className: "destroy",
                            onClick: this.props.onDestroy
                        }, null)
                    ]),
                    React.DOM.input({
                        ref: "editField",
                        className: "edit",
                        value: this.state.editValue,
                        onKeyUp: this.onKeyUp.bind(this)
                    }, null)
                ])
            );
        }
    });

    var TodoFooter = React.createClass({
        displayName: 'TodoFooter',
        render: function () {
            var activeTodoWord = Utils.pluralize(this.props.count, 'todo');
            var clearButton = null;

            if (this.props.completedCount > 0) {
                clearButton = (
                    React.DOM.button({
                        className: "clear-completed",
                        onClick: this.props.onClearCompleted
                    }, ["Clear completed (", this.props.completedCount, ")"])
                );
            }

            return (
                React.DOM.footer({
                    className: "footer"
                }, [
                    React.DOM.span({
                        className: "todo-count"
                    }, [React.DOM.strong(null, this.props.count), ' ', activeTodoWord, ' ', "left"]),
                    clearButton
                ])
            );
        }
    });

    var TodoApp = React.createClass({
        displayName: 'TodoApp',
        getInitialState: function () {
            return {
                todos: Utils.store('todos-react'),
                newTodoValue: '',
                editing: {}
            };
        },

        handleKeyUp: function (event) {
            this.setState({
                newTodoValue: event.target.value
            });
            var val = event.target.value.trim();
            if (event.nativeEvent.keyCode !== ENTER_KEY || !val) {
                return;
            }
            var todos = this.state.todos;
            todos.push({
                id: Utils.uuid(),
                title: val,
                completed: false
            });
            this.setState({
                todos: todos,
                newTodoValue: ''
            });
        },

        toggleAll: function (event) {
            var checked = event.nativeEvent.target.checked;
            this.state.todos.map(function (todo) {
                todo.completed = checked;
            });
            this.setState({
                todos: this.state.todos
            });
        },

        toggle: function (todo) {
            todo.completed = !todo.completed;
            this.setState({
                todos: this.state.todos
            });
        },

        destroy: function (todo) {
            var newTodos = this.state.todos.filter(function (candidate) {
                return candidate.id !== todo.id;
            });
            this.setState({
                todos: newTodos
            });
        },

        edit: function (todo) {
            this.state.todos.map(function (todo) {
                this.state.editing[todo.id] = false;
            }.bind(this));
            this.state.editing[todo.id] = true;
            this.setState({
                editing: this.state.editing
            });
        },

        save: function (todo, text) {
            todo.title = text;
            this.state.editing[todo.id] = false;
            this.setState({
                todos: this.state.todos,
                editing: this.state.editing
            });
        },

        clearCompleted: function () {
            var newTodos = this.state.todos.filter(function (todo) {
                return !todo.completed;
            });
            this.setState({
                todos: newTodos
            });
        },

        render: function () {
            Utils.store(this.props.localStorageKey || 'todos-react', this.state.todos);
            var footer = null;
            var main = null;
            var todoItems = this.state.todos.map(function (todo) {
                return (
                    TodoItem({
                        todo: todo,
                        onToggle: this.toggle.bind(this, todo),
                        onDestroy: this.destroy.bind(this, todo),
                        onEdit: this.edit.bind(this, todo),
                        editing: this.state.editing[todo.id],
                        onSave: this.save.bind(this, todo)
                    }, null)
                );
            }.bind(this));

            var activeTodoCount = this.state.todos.filter(function (todo) {
                return !todo.completed;
            }).length;
            var completedCount = todoItems.length - activeTodoCount;
            if (activeTodoCount || completedCount) {
                footer =
                    TodoFooter({
                        count: activeTodoCount,
                        completedCount: completedCount,
                        onClearCompleted: this.clearCompleted.bind(this)
                    }, null);
            }

            if (todoItems.length) {
                main = (
                    React.DOM.section({
                        className: "main"
                    }, [
                        React.DOM.input({
                            className: "toggle-all",
                            type: "checkbox",
                            onChange: this.toggleAll.bind(this)
                        }, null),
                        React.DOM.label({
                            className: "toggle-all-label"
                        }, "Mark all as complete"),
                        React.DOM.ul({
                                className: "todo-list"
                            },
                            todoItems
                        )
                    ])
                );
            }

            return (
                React.DOM.div(null, [
                    React.DOM.section({
                        className: "todoapp"
                    }, [
                        React.DOM.header({
                            className: "header"
                        }, [
                            React.DOM.h1(null, "todos"),
                            React.DOM.input({
                                className: "new-todo",
                                placeholder: "What needs to be done?",
                                autofocus: "autofocus",
                                onKeyUp: this.handleKeyUp.bind(this),
                                value: this.state.newTodoValue
                            }, null)
                        ]),
                        main,
                        footer
                    ]),
                    React.DOM.footer({
                        className: "info"
                    }, [
                        React.DOM.p(null, "Double-click to edit a todo"),
                        React.DOM.p(null, ["Created by", ' ', React.DOM.a({
                            href: "http://github.com/petehunt/"
                        }, "petehunt")]),
                        React.DOM.p(null, ["Part of", ' ', React.DOM.a({
                            href: "http://todomvc.com"
                        }, "TodoMVC")])
                    ])
                ])
            );
        }
    });

    React.renderComponent(TodoApp(null, null), document.getElementById('todoapp'));

    // Some benchmarking that requires either a custom build of React or more
    // modules exposed from React.*
    // var initTime = ReactMount.totalInstantiationTime + ReactMount.totalInjectionTime;
    // var benchmark = document.getElementById('benchmark');
    // setInterval(function() {
    //   benchmark.innerHTML = (
    //     'Init render time = ' + initTime + 'ms' +
    //     '<br />' +
    //     'Post-init render time = ' + (ReactMount.totalInstantiationTime + ReactMount.totalInjectionTime - initTime) + 'ms'
    //   );
    // }, 1000);
}