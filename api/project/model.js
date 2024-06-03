const db = require('../../data/dbConfig');

function getProjects() {
  return db('projects').then(projects =>
    projects.map(project => ({
      ...project,
      project_completed: !!project.project_completed
    }))
  );
}

function addProject(project) {
  return db('projects').insert(project)
    .then(([project_id]) => {
      return db('projects').where({ project_id }).first()
        .then(project => ({
          ...project,
          project_completed: !!project.project_completed
        }));
    });
}

module.exports = {
  getProjects,
  addProject,
};
