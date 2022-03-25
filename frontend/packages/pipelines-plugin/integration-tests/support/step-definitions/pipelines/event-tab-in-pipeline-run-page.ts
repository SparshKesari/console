import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import * as yamlEditor from '@console/cypress-integration-tests/views/yaml-editor';
import { switchPerspective } from '@console/dev-console/integration-tests/support/constants/global';
import { app, perspective } from '@console/dev-console/integration-tests/support/pages/app';
import { pipelineDetailsPO, pipelineBuilderPO } from '../../page-objects/pipelines-po';
import { actionsDropdownMenu } from '../../pages/functions/common';
import { pipelineRunDetailsPage } from '../../pages/pipelines/pipelineRun-details-page';
import { pipelinesPage, startPipelineInPipelinesPage } from '../../pages/pipelines/pipelines-page';
import { tasksPage } from '../../pages/pipelines/task-page';

When('user clicks on pipeline {string}', (pipelineName: string) => {
  pipelinesPage.selectPipeline(pipelineName);
});

When('user navigates to Pipeline Runs tab', () => {
  cy.get(pipelineDetailsPO.pipelineRunsTab).click();
});

Given('user is at administrator perspective', () => {
  perspective.switchTo(switchPerspective.Administrator);
});

When('pipeline named {string} is available with pipeline run', (pipelineName: string) => {
  tasksPage.openPipelineSidebar();
  tasksPage.openPipelinePage();
  tasksPage.openPipelineSidebar();
  cy.get('[data-test-id="dropdown-button"]').click();
  cy.get('[data-test-dropdown-menu="pipeline"]').click();
  cy.get('#form-radiobutton-editorType-form-field').click();
  cy.get('#form-input-formData-name-field')
    .clear()
    .type(pipelineName);
  cy.get('[data-test="task-list"]').click();
  cy.get('[data-test="quick-search-bar"]').type('kn');
  cy.get('[data-test="task-cta"]').click();
  cy.get('[data-test-id="submit-button"]').click();
  actionsDropdownMenu.selectAction('Start');
});

When('user clicks on pipeline tab in navigation menu', () => {
  tasksPage.openPipelineSidebar();
});

When('user clicks on Pipelines', () => {
  tasksPage.openPipelinePage();
});

When('user goes to Pipeline Runs tab', () => {
  cy.get('[data-test-id="horizontal-link-PipelineRuns"]').click();
});

When('user clicks on pipeline run for pipeline {string}', (pipelineName: string) => {
  cy.get(`[data-test-id^="${pipelineName}-"]`).click();
});

When('user clicks on Events tab', () => {
  cy.get(`[data-test-id="horizontal-link-public~Events"]`).click();
});

When('user clicks on Events tab in pipeline Runs page', () => {
  pipelineRunDetailsPage.selectTab('Events');
});

Then(
  'user can see events streaming for pipeline runs and all the associated task runs and pods',
  () => {
    app.waitForLoad();
    cy.get('[role="rowgroup"]').should('be.visible');
  },
);

When('task named {string} is available with task run', () => {
  tasksPage.openTasksInPipelinesSidebar();
  tasksPage.clickOnCreateTask();
  tasksPage.clearYAMLEditor();
  tasksPage.setEditorContent('testData/task-creation-with-yaml/new-task.yaml');
  tasksPage.submitTaskYAML();
  tasksPage.openPipelinePage();
  cy.get('[data-test-id="dropdown-button"]').click();
  cy.get('[data-test-dropdown-menu="pipeline"]').click();
  startPipelineInPipelinesPage.selectView('YAML View');
  yamlEditor.isLoaded();
  pipelinesPage.clearYAMLEditor();
  pipelinesPage.setEditorContent('testData/task-creation-with-yaml/create-pipeline-with-task.yaml');
  cy.get(pipelineBuilderPO.create).click();
  actionsDropdownMenu.selectAction('Start');
  tasksPage.openPipelineSidebar();
});

When('user clicks on Tasks', () => {
  cy.get('[data-test=nav]')
    .contains('Tasks')
    .click();
});

When('user goes to Task Runs tab', () => {
  cy.get('[data-test-id="horizontal-link-TaskRuns"]').click();
});

When('user opens task run for pipeline {string}', (pipelineName: string) => {
  cy.get(`[data-test-id^="${pipelineName}-"]`)
    .eq(0)
    .click();
});

When('user can see events streaming for task runs and all associated pods', () => {
  app.waitForLoad();
  cy.get('[role="rowgroup"]').should('be.visible');
});

When('task named {string} is available with task run for pipeline', () => {
  app.waitForLoad();
});

When('user clicks on available pipeline {string}', (pipelineName: string) => {
  cy.get(`[data-test-id^="${pipelineName}"]`)
    .eq(0)
    .click();
});

When('user opens pipeline run {string}', (pipelineName: string) => {
  cy.get(`[data-test-id^="${pipelineName}-"]`).click();
});

When('user opens task run {string}', (pipelineName: string) => {
  cy.get(`[data-test-id^="${pipelineName}-"]`)
    .eq(0)
    .click();
});
