import { Request, Response } from 'express';

const todos = [
  { id: 1, text: 'Buy milk', completedAt: new Date() },
  { id: 2, text: 'Buy bread', completedAt: null },
  { id: 3, text: 'Buy butter', completedAt: new Date() },
];

export class TodosController {
  //*Dependency Inyections
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  public getTodosById = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      res.status(400).json({ error: 'ID argument is not a number' });

    const todo = todos.find((todo) => todo.id === id);

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `TODO with id ${id} not found` });
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) res.status(400).json({ error: 'Text property is required' });

    const newTodo = {
      id: todos.length + 1,
      text: text,
      completedAt: null,
    };

    todos.push(newTodo);

    res.json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID argument is not a number' });
      return;
    }

    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      res.status(404).json({ error: `TODO with id ${id} not found` });
      return;
    }

    const { text, completedAt } = req.body;

    todo.text = text ?? todo.text;
    todo.completedAt =
      completedAt === 'null' ? null : new Date(completedAt ?? todo.completedAt);

    res.json(todo);
  };

  public deleteTodo = (req:Request, res:Response)=>{
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID argument is not a number' });
      return;
    }
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      res.status(404).json({ error: `TODO with id ${id} not found` });
      return;
    }

    todos.splice(todos.indexOf(todo), 1)
    res.json(todo)

  }
}
