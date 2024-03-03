const { getJestProjects, addPropertyToJestConfig } = require('@nrwl/jest');

addPropertyToJestConfig({
  setupFilesAfterEnv: ['./jest.setup.js'],
});
module.exports = {
  projects: getJestProjects(),
};
