// cypress\e2e\spec.cy.js
// Created by: Parita
// Last Updated by: Parita on Aug 02

describe('Registration', function() {
  beforeEach(()=> {
    cy.visit('https://hire-quiz.auth.us-east-1.amazoncognito.com/signup?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fjobform&response_type=code&client_id=5geij0ere3a8qgqkqho28khd0c&identity_provider=COGNITO&scope=email%20profile%20openid&state=OKoS2Ug9zwSGLJGldzvdQjUQMgdoQNv7&code_challenge=LtnAySmwe5ASdMf5Z-nHqt-C96l4mWFvrIh33Q7rI0o&code_challenge_method=S256');
  })
  describe('first visit', () => {
    it ('should display login component with sign in button visible', () => {
      cy.get('button').contains('Sign up').click();
    })

    it('should allow registration and prompt for email validation', ()=> {
      cy.get('input').eq(1).type('testuser1@email.com', { force: true });
      cy.get('input').eq(2).type('testuser1', { force: true });
      cy.get('input').eq(3).type('Password122!', { force: true }); 
      cy.get('button').contains('Sign up').click();
    })
  })
})

describe('Login', function() {
  beforeEach(()=> {
    cy.visit('https://hire-quiz.auth.us-east-1.amazoncognito.com/login?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fjobform&response_type=code&client_id=5geij0ere3a8qgqkqho28khd0c&identity_provider=COGNITO&scope=email%20profile%20openid&state=OKoS2Ug9zwSGLJGldzvdQjUQMgdoQNv7&code_challenge=LtnAySmwe5ASdMf5Z-nHqt-C96l4mWFvrIh33Q7rI0o&code_challenge_method=S256');
  })
  describe('login test', () => {
    it ('should display login component with sign in button visible', () => {
      cy.get('input').eq(1).type('testuser1@email.com', { force: true });
      cy.get('input').eq(2).type('Password122!', { force: true });
      cy.get('button').contains('Sign in').click();
    })
  })
})

describe('Forgot Your Password', function() {
  beforeEach(()=> {
    cy.visit('https://hire-quiz.auth.us-east-1.amazoncognito.com/forgotPassword?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fjobform&response_type=code&client_id=5geij0ere3a8qgqkqho28khd0c&identity_provider=COGNITO&scope=email%20profile%20openid&state=ByajhDD3CFuihaoJUWvB1vcSC15KL6dN&code_challenge=OIyJbdJjbvdYoPqHUbIVGQPIRs990ulQtOTgBBIlZU8&code_challenge_method=S256');
  })
  describe('user forgot their password', () => {
    it ('should send email to reset forgotten password', () => {
      cy.get('input').eq(1).type('testuser1@email.com', { force: true });
      cy.get('button').contains('Reset my password').click();
    })
  })
})

describe('Job Application Form', function() {
  beforeEach(()=> {
    cy.visit('http://localhost:3000/userform');
  })
  describe('user fills out a job application form', () => {
    it ('should submit a complete application form', () => {
      cy.get('input').eq(0).type('test1', { force: true });
      cy.get('input').eq(1).type('test1lastname', { force: true });
      cy.get('input').eq(2).type('test1@email.com', { force: true });
      cy.get('input').eq(3).type('(999)-999-9999', { force: true });
      
      const resumeFilePath = 'testResume.pdf';
      cy.fixture(resumeFilePath, 'base64').then((fileContent) => {
        cy.get('input').eq(4).then((input) => {
          const blob = Cypress.Blob.base64StringToBlob(fileContent, 'application/pdf');
          const testFile = new File([blob], 'testResume.pdf', { type: 'application/pdf' });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(testFile);   
          input[0].files = dataTransfer.files;
          cy.wrap(input).trigger('change', { force: true });
        });
    });
      
      const coverLetterFilePath = 'testCoverLetter.docx';
      cy.fixture(coverLetterFilePath, 'base64').then((fileContent) => {
        cy.get('input').eq(5).then((input) => {
          const blob = Cypress.Blob.base64StringToBlob(fileContent, 'application/docx');
          const testFile = new File([blob], 'testCoverLetter.docx', { type: 'application/docx' });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(testFile);   
          input[0].files = dataTransfer.files;
          cy.wrap(input).trigger('change', { force: true });
        });
    });
    
      cy.get('button').contains('Submit Application').click();
    })
  })
})


