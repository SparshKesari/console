import * as yamlEditor from '@console/cypress-integration-tests/views/yaml-editor';
import { pipelineBuilderPO } from '../../page-objects/pipelines-po';

export const tasksPage = {
  clickOnCreateTask: () => {
    cy.get('[data-test-id="dropdown-button"]').click();
    cy.get('[data-test-dropdown-menu="tasks"]').click();
    cy.get("[class='mtk26']").should('exist');
  },
  clearYAMLEditor: () => {
    cy.get(pipelineBuilderPO.yamlView.yamlEditor)
      .click()
      .focused()
      .type('{ctrl}a')
      .clear();
  },
  setEditorContent: (yamlLocation: string) => {
    cy.readFile(yamlLocation).then((str) => {
      yamlEditor.setEditorContent(str);
    });
  },
  openTasksInPipelinesSidebar: () => {
    cy.get('[data-test=nav]')
      .contains('Pipelines')
      .click();
    cy.get('[data-test=nav]')
      .contains('Tasks')
      .click();
  },
  submitTaskYAML: () => {
    cy.get('[data-test=save-changes]').click();
  },
  openPipelineSidebar: () => {
    cy.get('[data-test=nav]')
      .contains('Pipelines')
      .click();
  },
  openPipelinePage: () => {
    cy.get('[data-quickstart-id="qs-nav-pipelines"]')
      .eq(1)
      .click();
  },
  search: (name: string) => {
    cy.get('[data-test="name-filter-input"]')
      .should('be.visible')
      .clear()
      .type(name);
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
  },
};
