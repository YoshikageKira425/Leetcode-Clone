import axios from "axios";
import { languages_version } from "./language";

const api = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

const getExtension = (lang) => {
  switch (lang) {
    case "python": return "py";
    case "java": return "java";
    case "csharp": return "cs";
    default: return "txt";
  }
};

export const runCode = async (language, method, executeCode) => 
{
    let code = "";
    switch (language) 
    {
        case "python":
            code = `${method} \n \n${executeCode}`;
            break;
        case "java":
            code = `import java.util.*;\n\n\npublic class Main {\n    public static void main(String[] args) {\n        ${executeCode}\n    }\n \n ${method}\n}`;
            break;
        case "csharp":
            code = `using System;\n using System.Collections.Generic;\nusing System.Linq;\n\nclass Program {\n    static void Main() {\n        ${executeCode}\n    }\n \n ${method}\n }`;
            break;
        default:
            throw new Error("Unsupported language");
    }

    console.log(code);

    const response = await api.post("/execute", 
    {
        language: language,
        version: languages_version[language],
        files: [{
            name: "Main." + getExtension(language),
            content: code
        }]
    });

    return response.data;
}