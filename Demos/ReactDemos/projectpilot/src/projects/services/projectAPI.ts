import { Project } from "../models/Project";
const url = 'http://localhost:9090/projects';

function translateStatusToErrorMessage(status: number){
    switch(status){
        case 401: return 'Invalid login.';
        case 403: return 'You do not have permission to view the project(s).';
        default: return 'There was an error retrieving the project(s). Please try again.';
    };
};

function checkStatus(response: Response){
    if(response.ok){
        return response;
    }
    else {
        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url
        };
        console.log(`Log server http error: ${JSON.stringify(httpErrorInfo)}`);
        const errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
        throw new Error(errorMessage);
    };
};

function parseJSON(response: Response){
    return response.json();
}

function delay(ms: number){
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function(x: any): Promise<any>{
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertToModel(item: any): Project{
    return new Project(item);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertToModels(res: {data: unknown[]}): Project[] {
    const projects: Project[] = (res.data as unknown[]).map(convertToModel)
    return projects;
};

const projectAPI ={
    get(page = 1, limit = 9){
        return fetch(`${url}?_page=${page}&_per_page=${limit}`)
            .then(delay(5000))
            .then(checkStatus)
            .then(parseJSON)
            .then(convertToModels)
            .catch((error: TypeError)=>{
                console.error(`Log client error: ${error}`);
                throw new Error('There was an error retrieving the projects. Please try again.');
            });
    },

};

export { projectAPI };