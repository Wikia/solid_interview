# SOLID Interview

Welcome to the SOLID interview!

## The Purpose

The purpose of this repository is to create a discussion ground for the topic of SOLID principles.

## The content

In the src/ folder you can find a handful of classes split into two files. The files represent layers of code.

- main.ts - the concrete implementation of the application
- domain.ts - the abstract definition of the applications business rules

Our application is far from complete but for the purpose of the SOLID interview we distilled the minimum amount of code needed to be able to discuss the SOLID principles.

## The context

The business purpose of our hypothetical application is to collect information about its users and their cars. The information we are collecting directly from the user are as follows:
- about the user
  - name
  - age
- about users car
  - brand
  - engine size

We are also appending some information for debugging purposes, these are however not required by the stakeholders of the project, only for the dev team needs:
- submission timestamp
- the device used to submit information

## The application flow

Imagine that the user submits the data through an HTML form. **The data is validated** and ends up in a form of an object that looks like this: 

```typescript
const userInput = {
    // User form data
    name: 'Tomek',
    age: 18,
    car: 'Dacia Sandero',
    engine: 1.0,
    // User form data
    userDevice: 'Android',
    submissionDate: '2200-02-02'
}
```

The framework that we use passes this object to the `class Controller` in the `main.ts` file. This is the entry point to our slice of the application. The Controllers task is to push the request through the process, specifically to the domain layer and forward the response to the `class View`. The entry point to the domain layer is the `class CarQuestionnaireHandler`. Once the handler deals with the submitted data according to the business requirements, the response is forwarded to the `class View` to be appropriately formatted and from there the framework takes over again.

## Comments
There are two types of comments in this code. Comments prefixed with the [SI] tag are part of the explanation of this exercise slice of code for the benefit of the discussion. Other comments are something that the devs left during the development.

## The good, the bad and the ugly
What do you like about the code? Which of the SOLID principles are being abide and which are being broken? 

**HINT 1: Find all SOLID letters in code!**

**HINT 2: Pay attention to the devs comments!**
