import { v4 as uuidv4 } from 'uuid';

import {
    AnswersEntity,
    CarQuestionnaireEntity,
    CarQuestionnaireHandler,
    CarQuestionnaireRepositoryInterface, CarQuestionnaireResponse,
    UserEntity
} from "./domain";

// [SI] This is the first class in our applications slice that receives the user data
// it's being called by a framework that we use and that framework expects a View class in return
// userInput is double validated and data is correct

class Controller {
    public submitCarQuestionnaire(userInput: any) {
        const user = new UserEntity(uuidv4(), userInput.name, userInput.age)
        const answers = new AnswersEntity(uuidv4(), userInput.car, userInput.engine)
        const carQuestionnaire = new CarQuestionnaireEntity(uuidv4(), user, answers)

        const handler = new CarQuestionnaireHandler(new CarQuestionnaireRepository())
        const response = handler.submit(carQuestionnaire)

        Logger.logSomeAdditionalParams([userInput.userDevice, userInput.submissionDate])

        return new View(response)
    }
}

class CarQuestionnaireRepository implements CarQuestionnaireRepositoryInterface {
    get(id: string): CarQuestionnaireEntity {
        // [SI] Imagine that here we are fetching the data from a Postgres database
        console.log('Get data by id:' + id)

        // [SI] Imagine that here we building this object with the data from the db instead of the *_stubs
        return new CarQuestionnaireEntity(
            'id_stub',
            new UserEntity('id_stub','stub', 0),
            new AnswersEntity('id_stub','stub', 0)
        );
    }

    save(entity: CarQuestionnaireEntity): void {
        // [SI] Imagine that here we are storing the data to a Postgres database
        console.log('Save questionnaire of: ' + entity.user.name)
    }

    getMySqlDBConnectionParams(): string[] {
        return ["I don't connect to MYSQL"];
    }
}

class View {
    response: CarQuestionnaireResponse

    constructor(response: CarQuestionnaireResponse) {
        this.response = response
    }

    // [SI] This method is expected by the http framework that we use
    formatHTMLOutput() {
        return '' +
            '<div>' +
            '<p>Questionnaire summary:</p>' +
            '<li>' + this.response.car + '</li>' +
            '<li>' + this.response.engine + '</li>' +
            '</div>'
    }
}

class Logger {
    static logSomeAdditionalParams(paramsToLog: string[]) {
        console.log('Logging some params' + paramsToLog)
    }
}

// [SI]
// THIS IS THE END OF THE IMPLEMENTATION
// The const userInput represents the submitted data

const userInput = {
    // [SI] User form data
    name: 'Tomek',
    age: 18,
    car: 'Dacia Sandero',
    engine: 1.0,
    // [SI] Additional data appended by the application
    userDevice: 'Android',
    submissionDate: '2200-02-02'
}

// [SI] This is how some other call would call the controller as part of the running application
new Controller().submitCarQuestionnaire(userInput)