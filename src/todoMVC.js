import { g, r, t, initState } from './App'
const cx = (...classArr) => classArr.filter(i => !!i).join(' ')
const body = document.body
const FILTERS = {
  All: {
    fn: arr => arr,
    href: '#/'
  },
  Active: {
    fn: arr => arr.filter(i => !i.completed),
    href: '#/active'
  },
  Completed: {
    fn: arr => arr.filter(i => i.completed),
    href: '#/completed'
  }
}
const data = {
  allTodos: [],
  filter: 'All'
}
initState(data)
const setTodo = (id, key, val) => {
  data.allTodos = data.allTodos.map(i => {
    if (i.id === id) i[key] = val
    return i
  })
}
body.appendChild(g('section.todoapp')(
  g('header.header')(
    g('h1')('todos'),
    g('input.new-todo', {
      placeholder: 'What needs to be done?',
      autofocus: true,
      _keyup: e => {
        if (e.key === 'Enter' && e.target.value.length) {
          data.allTodos.push({
            id: +new Date(),
            title: e.target.value,
            completed: false,
            editing: false
          })
          e.target.value = ''
          r('ul.todo-list')
          r('span.todo-count')
        }
      }
    })()
  ),
  g('section.main')(
    g('input#toggle-all.toggle-all', {
      type: 'checkbox',
      _click: () => {
        const allDone = data.allTodos.every(i => i.completed)
        data.allTodos = data.allTodos.map(i => {
          i.completed = !allDone
          return i
        })
        data.allTodos.forEach(todo =>
          setTodo(todo.id, 'completed', !allDone)
        )
        r('ul.todo-list')
        r('span.todo-count')
      }
    })(),
    g('label', {
      for: 'toggle-all'
    })('Mark all as complete'),
    t('ul.todo-list')(s => FILTERS[s.filter].fn(s.allTodos).map(todo =>
      g('li#_' + todo.id, {
        class: cx(todo.completed && 'completed', todo.editing && 'editing')
      })(
        g('.view')(
          g('input.toggle', {
            type: 'checkbox',
            checked: todo.completed,
            _click: () => {
              setTodo(todo.id, 'completed', !todo.completed)
              r('ul.todo-list')
              r('span.todo-count')
            }
          })(),
          g('label', {
            _dblclick: () => {
              data.allTodos.forEach(t =>
                setTodo(t.id, 'editing', t.id === todo.id)
              )
              r('ul.todo-list')
            }
          })(todo.title),
          g('button.destroy', () => {
            s.allTodos = s.allTodos.filter(i => i.id !== todo.id)
            r('ul.todo-list')
            r('span.todo-count')
          })()
        ),
        todo.editing && g('input.edit', {
          type: 'text',
          _keyup: e => {
            if (e.key === 'Enter' && e.target.value.length) {
              setTodo(todo.id, 'title', e.target.value)
              setTodo(todo.id, 'editing', false)
              r('ul.todo-list')
            }
          }
        })(todo.title)
      )
    ))
  ),
  g('footer.footer')(
    t('span.todo-count')(s => {
      const len = s.allTodos.filter(i => !i.completed).length
      return `${len} item${len > 1 ? 's' : ''} left`
    }),
    t('ul.filters')(s => Object.entries(FILTERS)
      .map(([text, { href }]) =>
        g('li')(
          g('a', {
            class: text === s.filter && 'selected',
            href,
            _click: () => {
              s.filter = text
              r('ul.todo-list')
              r('ul.filters')
            }
          })(text)
        )
      )),
    g('button.clear-completed', () => {
      data.allTodos = data.allTodos.filter(i => !i.completed)
      r('ul.todo-list')
      r('span.todo-count')
    })('Clear completed')
  )
))
body.appendChild(g('footer.info')(
  g('p')('Double-click to edit a todo'),
  g('p')(
    'Created by ',
    g('a', { href: 'http://gaoryrt.com' })('gaoryrt')
  ),
  g('p')(
    'Part of ',
    g('a', { href: 'http://todomvc.com' })('TodoMVC')
  )
))
