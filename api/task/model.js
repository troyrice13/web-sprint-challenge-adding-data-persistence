const db = require('../../data/dbConfig');

function getTasks() {
  return db('tasks as t')
    .join('projects as p', 't.project_id', 'p.project_id')
    .select('t.*', 'p.project_name', 'p.project_description')
    .then(tasks =>
      tasks.map(task => ({
        ...task,
        task_completed: !!task.task_completed
      }))
    );
}

function addTask(task) {
  return db('tasks').insert(task)
    .then(([task_id]) => {
      return db('tasks').where({ task_id }).first()
        .then(task => ({
          ...task,
          task_completed: !!task.task_completed
        }));
    });
}

module.exports = {
  getTasks,
  addTask,
};
