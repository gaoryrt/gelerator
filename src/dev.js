import { g, state } from './App'

const data = state({
  newTodo: '',
  editedTodo: null,
  todos: [],
  completed: false,
  remaining: 1,
  visibility: 'all',
  beforeEditCache: ''
})

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.completed),
  completed: todos => todos.filter(todo => todo.completed)
}
const pluralize = (word, count) => {
  return word + (count < 2 ? '' : 's')
}

const element = g('section.todoapp')(
  g('header.header')(
    g('h1')('todos'),
    g('input.new-todo', {
      autofocus: true,
      autocomplete: 'off',
      placeholder: 'What needs to be done',
      _keyup: e => {
        if (e.key === 'Enter') {
          data.newTodo = e.target.value
          var value = data.newTodo && data.newTodo.trim();
          if (!value) return
          data.todos = [...data.todos, { id: data.todos.length + 1, title: value, completed: false }]
          data.newTodo = ''
        }
      }
    })(data.newTodo)
  ),
  g('section.main')(
    g('input#toggle-all.toggle-all', {
      type: 'checkbox'
    })(() => filters.active(data.todos).length === 0),
    g('label', {
      for: 'toggle-all'
    })('Mark all as complete'),
    g('ul.todo-list')(
      () => filters[data.visibility](data.todos)
        .map((todo, index) =>
          g(`li.todo.todo${index}`)(
            g('.view')(
              g('input.toggle', {
                type: 'checkbox',
                _click: () => {
                  const newTodo = [...data.todos]
                  newTodo[index].completed = !newTodo[index].completed
                  data.todos = newTodo
                }
              })(todo.completed),
              g('label.completed')(todo.title),
              g('button.destroy', () => { console.log('remove') })()
            ),
            g('input.edit', {
              type: 'text',
              _keyup: e => {
                if (e.key === 'Enter') {
                  if (!data.editedTodo) {
                    return
                  }
                  data.editedTodo = null
                  todo.title = todo.title.trim()
                }
              }
            })(todo.title)
          )
        )
    )
  ),
  g('footer.footer')(
    g('span.todo-count')(
      () => {
        const len = filters.active(data.todos).length
        return !!len && (len + pluralize(' item', len) + ' left')
      }
    ),
    g('ul.filters')(
      g('li')(
        g('a')('All'),
        g('a')('Active'),
        g('a')('Completed'),
      )
    ),
    g('button.clear-completed')('Clear completed')
  )
)


document.body.appendChild(element)
document.body.appendChild(g('footer.info')(
  g('p')('Double-click to edit a todo'),
  g('p')(
    'Written by ',
    g('a')('Gaoryrt')
  ),
  g('p')(
    'Part of ',
    g('a')('TodoMVC')
  )
))
